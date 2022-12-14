const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.user;
const { ObjectId } = require("mongodb");

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
  if (userbyemail === null) throw { code: 404, message: `User not found` };

  userbyemail._id = userbyemail._id.toString();

  return userbyemail;
};
