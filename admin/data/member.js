const mongoCollections = require("../config/mongoCollections");
const membership_detail = mongoCollections.membership_detail;
const member = mongoCollections.member;
const { ObjectId } = require("mongodb");

//Function to get all the Products
const getAllMemberShipDetail = async () => {
    //Retriving product collections from the database
    const membership_detailCollection = await membership_detail();

    //Getting the list of products and converting it to array
    const memberShipList = await membership_detailCollection.aggregate([
        {
            $lookup: {
                from: "member",
                localField: "member_id",
                foreignField: "_id",
                as: "member"
            }
        },
        {
            $unwind: {
                path: "$member",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "user",
                localField: "member.user_id",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true
            }
        }
    ]).toArray();

    console.log(memberShipList)

    //Checking if the movieList is null or not
    if (!memberShipList || memberShipList.length === 0)
        throw `Could not get all the products`;

    //Converting the member id to string

    //Returning products
    return memberShipList;
};

//Function to get a product By Id
const getmemberById = async (memberId) => {
    //Code to check the memberId parameters
    if (typeof memberId != "string") {
        throw "Error:   member id was not given or wrong type";
    }
    //Retriving member collections from the database
    const memberCollection = await member();

    //Retriving a member by Id
    const members = await memberCollection.findOne({ _id: ObjectId(memberId) });

    //Checing if the member is retrived from the database. If not throw an error
    if (members === null) throw `member not found`;

    members._id = members._id.toString();
    return members;
};

const updateMemberStatus = async (status, member_id) => {
    let parseId;
    if (typeof member_id != "string") {
        throw "member id was not given or wrong type";
    }
    try {
        parseId = ObjectId(member_id);
    } catch (e) {
        throw "member id could not be converted into object id."
    }
    try {
        await getmemberById(member_id);
    } catch (e) {
        throw "product does not exist while adding blog"
    }
    if (typeof status != "string") {
        throw "status was not given or wrong type";
    }


    //Code to check all the parameters of the blog

    //Retriving blog collections from the database
    const memberCollection = await member();

    //Storing the date when the blog was created in the database
    var isTrueSet = (status === 'true');
    //Creating a new blog object

    //Inserting the new object created  in the blog collection
    let result = await memberCollection.updateOne({ _id: parseId }, { $set: { status: isTrueSet} })
    //Checking if the blog is successfully inserted or not
    if (!result.acknowledged || !result.modifiedCount)
        throw `Could not update the product successfully`;

    // Retriving inserted blog id

    //Retriving the product from the id and returning it
    const members = await getmemberById(member_id);
    return members;
}

module.exports = {
    getAllMemberShipDetail,
    updateMemberStatus
};
