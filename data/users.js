const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.user;
const { ObjectId } = require("mongodb");
let moment = require("moment");
const bcrypt = require("bcrypt");
const saltRounds = 16;

//Register User
const createUser = async (
  firstname,
  lastname,
  gender,
  dob,
  address,
  zipcode,
  cell,
  email,
  password
) => {
  let insertStatus = {};
  email = email.toLowerCase();
  const userCollection = await user();
  const FoundUser = await userCollection.findOne({
    email: email,
  });
  dob = new moment(dob).format("MM/DD/YYYY");
  if (FoundUser !== null) throw "Username Already Exist!";
  //     insertStatus.insertedUser = false;
  //     insertStatus.alreadyExist = true;
  //     return insertStatus;
  //   }

  const hashPassword = await bcrypt.hash(password, saltRounds);

  let new_user = {
    firstname: firstname,
    lastname: lastname,
    gender: gender,
    dob: dob,
    address: address,
    zipcode: zipcode,
    cell: cell,
    email: email,
    password: hashPassword,
    profile_image: "",
    status: true,
  };
  const insertInfo = await userCollection.insertOne(new_user);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    // insertStatus.insertedUser = false;
    // insertStatus.alreadyExist = false;
    // insertStatus.otherErr = true;
    // return insertStatus;
    throw "Could not insert";
  }

  insertStatus.insertedUser = true;
  //   insertStatus.alreadyExist = false;

  return insertStatus;
};

//Get the User by Email Id
const getUserByEmail = async (emailID) => {
  //Code to check the parameters of the emailID
  if (!emailID) throw "Please Provide email ID";
  emailID = emailID.trim();
  emailID = emailID.toLowerCase();

  //Retriving User collections  from the database
  const UserCollection = await user();

  //Retriving a User by Email Id
  const userbyemail = await UserCollection.findOne({
    email: emailID,
  });

  //Checing if the User is retrived from the database. If not throw an error
  if (userbyemail !== null) userbyemail._id = userbyemail._id.toString();

  // throw { code: 404, message: `User not found` };
  return userbyemail;
};

const getAllUsersByName = async () => {

  //Retriving User collections  from the database
  const UserCollection = await user();

  const getAllUsersByName = await UserCollection.find({}).project({ first_name: 1, last_name: 1 }).toArray();

  if (!getAllUsersByName) {

    for (let i = 0; i < getAllUsersByName.length; i++) {
      getAllUsersByName._id = getAllUsersByName._id.toString();
    }
  }

  return getAllUsersByName;
}

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsersByName
};
