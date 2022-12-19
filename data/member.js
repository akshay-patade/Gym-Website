const mongoCollections = require("../config/mongoCollections");
const member = mongoCollections.member;
const { ObjectId } = require("mongodb");
const helper = require("../helpers");


const createMember = async (userId) => {

    userId = helper.checkObjectId(userId);

    const memberCollection = await member();

    const createMember = {
        user_id: ObjectId(userId),
        status: true
    };

    const insertInfo = await memberCollection.insertOne(createMember);

    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw {
            code: 500,
            message: `Could not insert the member at this time`,
        };
    }

    //Return the inserted User
    const newMember = await getMemberById(insertInfo.insertedId.toString());

    return newMember;
}

const getMemberById = async (memberId) => {

    memberId = helper.checkObjectId(memberId);

    const memberCollection = await member();


    const findMember = await memberCollection.findOne({
        _id: ObjectId(memberId),
    });

    if (!findMember)
        throw {
            code: 404,
            message: `Member not found`,
        };

    findMember._id = findMember._id.toString();
    return findMember;
}

const removeMemberById = async (id) => {


    const memberCollection = await member();


    const deleteInfo = await memberCollection.deleteOne({
        _id: ObjectId(id),
    });

    if (deleteInfo.deletedCount !== 1)
        throw {
            code: 404,
            message: `Could not delete member`,
        };
}


module.exports = {
    createMember,
    getMemberById,
    removeMemberById
}

