const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.user;
const userGroup = mongoCollections.user_group
const { ObjectId } = require("mongodb");
let moment = require("moment");
const bcrypt = require("bcrypt");
const saltRounds = 16;
const helper = require("../helpers");

//Create a UserGroup for User and Admin
const createUserGroup = async (name, description) => {

  //Code to check all the parameters
  name = helper.checkUserGroupName(name);
  description = helper.checkUserGroupDescription(description);

  //Getting the userGroupCOllection
  const userGroupCollection = await userGroup();

  let newUserGroup = {
    name: name,
    description: description,
    status: true
  }
  const insertInfo = await userGroupCollection.insertOne(newUserGroup);

  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw { code: 500, message: `Could not insert the user group at this time` };
  }

  const newId = insertInfo.insertedId.toString();
  return newId;
}

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

  //Code to check All the parameters
  firstname = helper.checkFirstName(firstname);
  lastname = helper.checkLastName(lastname);
  gender = helper.checkGender(gender);
  dob = helper.checkDob(dob);
  address = helper.checkAddress(address);
  zipcode = helper.checkZipCode(zipcode);
  cell = helper.checkNumber(cell);
  email = helper.checkEmail(email);
  password = helper.checkPassword(password);

  //Code to insert the data in the database
  let insertStatus = {};
  email = email.toLowerCase();
  const userCollection = await user();
  const FoundUser = await userCollection.findOne({
    email: email,
  });

  if (FoundUser) throw "Username Already Exist!";
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


const getUserNameWithComments = async (getProductById, getAllUsersName) => {

  let idNameMap = new Map();
  let result = [];

  //Stroring the userid as the key and firstname + lastName as the value;
  for (let i = 0; i < getAllUsersName.length; i++)
    idNameMap.set(getAllUsersName[i]._id, `${getAllUsersName[i].first_name}-${getAllUsersName[i].first_name}`);

  //Extracting the Array of Comment objects from the getProductById variable
  let commentObject = getProductById.comments;
  for (let i = 0; i < commentObject.length; i++) {

    let temp = {
      name: idNameMap.get(commentObject[i].user_id),
      comment: commentObject[i].comment
    }

    result.push(temp);
  }
  return result;
}

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsersByName,
  getUserNameWithComments,
  createUserGroup
};
