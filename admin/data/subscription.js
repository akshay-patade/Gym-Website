const mongoCollections = require("../config/mongoCollections");
const subscriptionPlan = mongoCollections.subscription_plan;
const { ObjectId } = require("mongodb");
const users = require("./user");
const blogCategory = require("./blogCategory");
const moment = require("moment")


const createSubscriptionPlan = async ({ duration, name, membership_amount, description }) => {
    if (typeof name != "string"|| !name.trim().length) {
        throw "Error: name of the subscription was not given or different type."
    }
    if (typeof membership_amount != "number") {
        throw "Error: membership amount of the subscription was not given"
    }
    if (typeof duration != "string") {
        throw "Error: duration of the subscription was not given"
    }
    if (typeof description != "string" || !description.trim().length) {
        throw "Error: description of the subscription was not given"
    }


    //Code to check all the parameters of the blog

    //Retriving blog collections from the database
    const subscriptionPlanCollection = await subscriptionPlan();
    //Storing the date when the blog was created in the database
    let date = moment().format("MM/DD/YYYY");

    //Creating a new blog object
    const new_plan = {
        name: name,
        membership_amount: membership_amount,
        description: description,
        duration: duration,
        status:true,
        created_date: date,
        updated_date: date
    };

    //Inserting the new object created  in the blog collection
    const insertInfo = await subscriptionPlanCollection.insertOne(new_plan);

    //Checking if the blog is successfully inserted or not
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw `Could not add the subscription Plan`

    // Retriving inserted blog id
    const newId = insertInfo.insertedId.toString();

    //Retriving the product from the id and returning it
    const Plan = await gesubscriptionPlanId(newId);
    return Plan;
}
const updateSubscriptionPlan = async ({ duration, name, membership_amount, description ,plan_id}) => {
    let planData, parseId;
    if (typeof plan_id != "string") {
        throw "Error: subscription Plan id was not given or wrong type"
    }
    try {
        parseId = ObjectId(plan_id);
    } catch (e) {
        throw "Error: subscription Plan id could not be converted into object id."
    }
    try {
        planData = await gesubscriptionPlanId(plan_id);
    } catch (e) {
        throw "Error: subscription Plan does not exist while adding blog"
    }
    if (typeof name != "string"|| !name.trim().length) {
        throw "Error: name of the subscription was not given or different type."
    }
    if (typeof membership_amount != "number") {
        throw "Error: membership amount of the subscription was not given"
    }
    if (typeof duration != "string") {
        throw "Error: duration of the subscription was not given"
    }
    if (typeof description != "string" || !description.trim().length) {
        throw "Error: description of the subscription was not given"
    }


    //Code to check all the parameters of the blog

    //Retriving blog collections from the database
    const subscriptionPlanCollection = await subscriptionPlan();

    //Storing the date when the blog was created in the database
    let date = moment().format("MM/DD/YYYY");

    //Creating a new blog object
    const obj = {
        name: name,
        membership_amount: membership_amount,
        description: description,
        duration: duration,
        status:planData.status,
        created_date: planData.created_date,
        updated_date: date
    };

    //Inserting the new object created  in the blog collection
    let result = await subscriptionPlanCollection.updateOne({ _id: parseId }, { $set: obj })
    //Checking if the blog is successfully inserted or not
    if (!result.acknowledged || !result.modifiedCount)
        throw `Could not update the subscription Plan`;

    // Retriving inserted blog id

    //Retriving the product from the id and returning it
    const Plan = await gesubscriptionPlanId(plan_id);
    return Plan;
}

const updatesubscriptionPlanStatus = async (status, plan_id) => {
    let parseId;
    if (typeof plan_id != "string") {
        throw "Error: subscription Plan id was not given or wrong type"
    }
    try {
        parseId = ObjectId(plan_id);
    } catch (e) {
        throw "Error: subscription Plan id could not be converted into object id."
    }
    try {
        await gesubscriptionPlanId(plan_id);
    } catch (e) {
        throw "Error: subscription Plan not exist while updating subscription Plan"
    }
    if (typeof status != "string") {
        throw "Error: status was not given or wrong type"
    }


    //Code to check all the parameters of the blog

    //Retriving blog collections from the database
    const subscriptionPlanCollection = await subscriptionPlan();

    //Storing the date when the blog was created in the database
    let date = moment().format("MM/DD/YYYY");
    var isTrueSet = (status === 'true');
    //Creating a new blog object

    //Inserting the new object created  in the blog collection
    let result = await subscriptionPlanCollection.updateOne({ _id: parseId }, { $set: { status: isTrueSet, updated_date: date } })
    //Checking if the blog is successfully inserted or not
    // if (!result.acknowledged || !result.modifiedCount)
    //     throw `Could not update the blog` };

    // Retriving inserted blog id

    //Retriving the product from the id and returning it
    const Plan = await gesubscriptionPlanId(plan_id);
    return Plan;
}

//Get the blog by Id
const gesubscriptionPlanId = async (plan_id) => {
    //Code to validate the id
    let parseId;
    if (typeof plan_id != "string") {
        throw "Error: subscription Plan id was not given or wrong type"
    }
    try {
        parseId = ObjectId(plan_id);
    } catch (e) {
        throw "Error: subscription Plan id could not be converted into object id."
    }
    //Retriving product collections from the database
    const subscriptionPlanCollection = await subscriptionPlan();
    //Retriving a blog by Id
    const Plan = await subscriptionPlanCollection.findOne({ _id: parseId });

    //Checing if the blog is retrived from the database. If not throw an error
    if (Plan === null) throw `subscription Plan not found`;


    return Plan;
}

const getallsubscriptionPlan= async () => {

    //Code to validate the id
    //Retriving product collections from the database
    const subscriptionPlanCollection = await subscriptionPlan();
    //Retriving a blog by Id
    const plan = await subscriptionPlanCollection.find().toArray();

    //Checing if the blog is retrived from the database. If not throw an error
    if (plan === null) throw `subscription Plan not found`;

    return plan;
}


module.exports = {
    createSubscriptionPlan,
    updateSubscriptionPlan,
    gesubscriptionPlanId,
    updatesubscriptionPlanStatus,
    getallsubscriptionPlan
};
