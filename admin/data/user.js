const mongoCollections = require('../config/mongoCollections');
const user = mongoCollections.user;
const blog = mongoCollections.blog;
const product = mongoCollections.product;
let { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 1; //////////////////////////////Change back to 16 later on

/*
Error trying to find itemData so could not test the following:
1. Error checking if the item exist in addCartitem
2.cannot test showCart item part where if it checks if status is open.
3. cannot test addpurchase item because it changes item to "sold"
4. Can't test prev sold or prev purhcase because apppurchase didnt work
5. add check so i can delete sold item in a wish item
*/
//to create a new user
//sign-up functionality
async function createUser(first_name, last_name, email, address, gender, zipcode, profile_image, dob, cell_no, password, user_group_id, cm_password) {
    if (!first_name || !last_name || !email || !address || !gender || !zipcode || !profile_image || !password || !dob || !cell_no || !user_group_id)
        throw ("One or more user details are missing. Enter again");

    if (typeof zipcode != 'number')
        throw ("zipcode should be a number");

    if (typeof first_name != 'string' || typeof last_name != 'string' || typeof email != 'string' || typeof address != 'string' || typeof gender != 'string'
        || typeof dob != 'string' || typeof profile_image != 'string' || typeof password != 'string' || typeof cell_no != 'string')
        throw ("One or more user information is of wrong type. Enter again.");

    if (!first_name.trim().length || !last_name.trim().length || !email.trim().length || !address.trim().length || !gender.trim().length || !cell_no.trim().length
        || !profile_image.trim().length || !password.trim().length)
        throw ("One of more user information is only empty spaces. Enter again.");


    //should we be validating email address by sending a verification email
    //or just the format validation is enough
    //adding a simple regex email format validation for now

    var format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!format.test(email))
        throw ("Invalid email format. Enter again");

    //check if email already exists
    const userCollection = await user();
    const found = await userCollection.findOne({ email: email.toLowerCase() });
    if (found != null)
        throw ("Email already exists.Log in");

    if (password.length < 6)
        throw ("password should be at-least 6 characters long");
    if (cm_password != accountPassword) throw ("password should be match");
    if (!accountPassword.trim().length || accountPassword.trim().length < accountPassword.length)
        throw ("password should not contain empty spaces");

    //error checks for pincode
    //should atleast be length 6, no characters/special characters (only numbers)

    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if (!isValidZip.test(zipcode))
        throw ("Pincode if invalid.Enter again");

    const hash = await bcrypt.hash(accountPassword, saltRounds);
    const doc = {
        first_name: first_name,
        last_name: last_name,
        email: email.toLowerCase(),
        address: address,
        gender: gender,
        zipcode: zipcode,
        profile_image: profile_image,
        accountPassword: hash,
        age: age,
        avgRating: 0,
        prevPurchase: new Array(),
        prevSold: new Array(),
        commentSeller: new Array(),
        cart: new Array(),
        wishlist: new Array()
    }
    await userCollection.insertOne(doc);
    const newUser = await userCollection.findOne(doc);
    newUser._id = newUser._id.toString();
    return newUser;
}

//searching a user with their email and accountPassword
//log-in functionality

async function checkUser(email, password, role = 'admin') {
    if (!email || !password)
        throw ("Enter a username or password");

    if (typeof email != 'string' || !email.trim().length)
        throw ("username is not a valid string");

    if (email.trim().length < email.length)
        throw ("username cannot contain empty spaces");

    var format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!format.test(email))
        throw ("Invalid email format. Enter again");

    if (password.length < 6)
        throw ("password should be at-least 6 characters long");

    if (!password.trim().length || password.trim().length < password.length)
        throw ("password should not contain empty spaces");

    const userCollection = await user();
    const found = await userCollection.findOne({ email: email.toLowerCase(), role: role, status: true });

    if (!found)
        throw ("user not found");
    else {
        //let authenticate=new Object();
        const hash = await bcrypt.hash(found.password, saltRounds);
        console.log(hash)
        const hashPassword = found.password;
        let comparePassword = false;
        comparePassword = await bcrypt.compare(password, hashPassword);
        if (comparePassword == false)
            throw ("password is invalid");
        else {
            return found;
        }
    }
}

async function getDashboardCount() {
    const userCollection = await user();
    const blogCollection = await blog();
    const productCollection = await product();
    const userCount = await userCollection.find({}).toArray();
    const productCount = await productCollection.find({}).toArray();
    const blogCount = await blogCollection.find({}).toArray();
    const response = {
        user: userCount.length,
        product: productCount.length,
        blog: blogCount.length
    }
    return response;
}

async function getSingleUser(userId) {
    if (typeof userId !== "string") {
        throw "Error: The user id given is not a valid user id."
    }
    try {
        parseId = ObjectId(userId);
    } catch (e) {
        throw "Error: user id could not be converted into object id."
    }
    const userCollection = await user();
    const found = await userCollection.findOne({ _id: parseId });
    if (!found) {
        throw { code: 204, message: `user not found` }
    }
    return found
}

async function getAllUser() {
    const userCollection = await user();
    const alluser = await userCollection.find({ role: "user" }).toArray();
    if (alluser === null) throw { code: 204, message: `user not found` };
    return alluser
}
async function changeAdminPassword(userId, password, role = "admin") {
    if (typeof userId !== "string" || typeof password !== "string") {
        throw "Error: The user id given is not a valid user id."
    }
    try {
        parseId = ObjectId(userId);
    } catch (e) {
        throw "Error: user id could not be converted into object id."
    }

    const userCollection = await user();
    const found = await userCollection.findOne({ _id: parseId, role: role, status: true });
    if (!found) {
        throw "Error: The user cannot be found."
    }
    else {
        const hashPassword = await bcrypt.hash(password, saltRounds);
        found.password = hashPassword;
        result = await userCollection.updateOne({ _id: parseId }, { $set: { password: hashPassword } })
        return found;
    }
}



const updateUserStatus = async (status, userId) => {
    let parseId;
    if (typeof userId != "string") {
        throw "user id was not given or wrong type";
    }
    try {
        parseId = ObjectId(userId);
    } catch (e) {
        throw "user id could not be converted into object id."
    }
    try {
        await getSingleUser(userId);
    } catch (e) {
        throw "user does not exist while adding blog"
    }
    if (typeof status != "string") {
        throw "status was not given or wrong type";
    }

    const userCollection = await user();

    var isTrueSet = (status === 'true');
    console.log('test', isTrueSet)

    //Inserting the new object created  in the blog collection
    let result = await userCollection.updateOne({ _id: parseId }, { $set: { status: isTrueSet } })
    //Checking if the blog is successfully inserted or not
    if (!result.acknowledged || !result.modifiedCount)
        throw `Could not update the product successfully`;

    return result;
}

module.exports = {
    createUser,
    checkUser,
    changeAdminPassword,
    getAllUser,
    getSingleUser,
    updateUserStatus,
    getDashboardCount
};