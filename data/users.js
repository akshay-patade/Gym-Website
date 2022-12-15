const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.user;
const { ObjectId } = require("mongodb");
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

  //Retriving blog Category collections Category from the database
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
module.exports = {
  createUser,
  getUserByEmail,
};
