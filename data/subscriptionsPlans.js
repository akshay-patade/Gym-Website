const mongoCollections = require("../config/mongoCollections");
const subscriptionsPlans = mongoCollections.subscription_plan;
const { ObjectId } = require("mongodb");


const createNewSubscriptionPlan = async (name, description, membership_amount, duration) => {

    //Condtion to check all the parameters

    //Importing the  subscriptionsPlans collection
    const subscriptionsPlanCollection = await subscriptionsPlans();

    //Inserting a new subscription in the mongodb
    let subscriptionPlan = {

        name: name,
        description: description,
        membership_amount: membership_amount,
        duration: duration,
        status: true
    }

    const insertInfo = await subscriptionsPlanCollection.insertOne(newUserGroup);

    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw { code: 500, message: `Could not insert the user group at this time` };
    }

    const newId = insertInfo.insertedId.toString();

    let newSubscriptionPlan = await getSubscriptionPlanById(newId);
    return newSubscriptionPlan
}

const getSubscriptionPlanById = async (subscriptionPlanId) => {

    //Code to validate the subscription plan Id

    //Importing the  subscriptionsPlans collection
    const subscriptionsPlanCollection = await subscriptionsPlans();

    const result = await subscriptionsPlanCollection.findOne({ _id: subscriptionPlanId });

    if (!result) {
        throw {
            code: 404,
            message: `Subscription Plans not Found`
        }
    }

    result._id = result._id.toString();
    return result;
}

const getAllSubscriptionPlans = async () => {

    //Code to validate the subscription plan Id

    //Importing the  subscriptionsPlans collection
    const subscriptionsPlanCollection = await subscriptionsPlans();

    const result = await subscriptionsPlanCollection.find({}).toArray();

    if (!result) {
        throw {
            code: 404,
            message: `Subscription Plans not Found`
        }
    }

    for (let i = 0; i < result.length; i++)
        result[i]._id = result[i]._id.toString();
    return result;
}

module.exports = {
    createNewSubscriptionPlan,
    getSubscriptionPlanById,
    getAllSubscriptionPlans
}