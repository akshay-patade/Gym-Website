const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.user;
const { ObjectId } = require("mongodb");

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
  getUserByEmail,
  getAllUsersByName
};
