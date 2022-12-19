const mongoCollections = require("../config/mongoCollections");
const blog = mongoCollections.blog;
const { ObjectId } = require("mongodb");
const users = require("./user");
const blogCategory = require("./blogCategory");
const moment = require("moment")


const createBlog = async (user_id, blog_name, blog_category_id, description) => {
    if (typeof user_id != "string") {
        throw "userId was not given or different type."
    }
    try {
        await users.getSingleUser(user_id);
    } catch (e) {
        throw "user does not exist while adding blog"
    }
    if (typeof blog_category_id != "string") {
        throw "blog categoryId  was not given or different type."
    }
    try {
        await blogCategory.getBlogCategoryById(blog_category_id);
    } catch (e) {
        throw "blog Category does not exist while adding blog"
    }
    if (typeof blog_name != "string" || !blog_name.trim().length) {
        throw "blog name was not given or wrong type";
    }
    if (typeof description != "string" || !description.trim().length) {
        throw "description of the blog was not given"
    }


    //Code to check all the parameters of the blog

    //Retriving blog collections from the database
    const blogCollection = await blog();
    console.log(blogCollection)
    //Storing the date when the blog was created in the database
    let date = moment().format("MM/DD/YYYY");

    //Creating a new blog object
    const new_blog = {
        user_id: ObjectId(user_id),
        blog_name: blog_name,
        blog_category_id: ObjectId(blog_category_id),
        description: description,
        show_on_website: true,
        created_date: date,
        updated_date: date
    };

    //Inserting the new object created  in the blog collection
    const insertInfo = await blogCollection.insertOne(new_blog);

    //Checking if the blog is successfully inserted or not
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw { code: 500, message: `Could not add the blog` };

    // Retriving inserted blog id
    const newId = insertInfo.insertedId.toString();

    //Retriving the product from the id and returning it
    const blogs = await getBlogById(newId);
    return blogs;
}
const updateBlog = async (user_id, blog_name, blog_category_id, description, blog_Id) => {
    let blogData, parseId;
    if (typeof blog_Id != "string") {
        throw "  blog id was not given or wrong type";
    }
    try {
        parseId = ObjectId(blog_Id);
    } catch (e) {
        throw "blog id could not be converted into object id."
    }
    try {
        blogData = await getBlogById(blog_Id);
    } catch (e) {
        throw "blog does not exist while adding blog"
    }
    if (typeof user_id != "string") {
        throw "userId was not given or different type."
    }
    try {
        await users.getSingleUser(user_id);
    } catch (e) {
        throw "user does not exist while adding blog"
    }
    if (typeof blog_category_id != "string") {
        throw "blog categoryId  was not given or different type."
    }
    try {
        await blogCategory.getBlogCategoryById(blog_category_id);
    } catch (e) {
        throw "blog Category does not exist while adding blog"
    }
    if (typeof blog_name != "string" || !blog_name.trim().length) {
        throw "  blog name was not given or wrong type";
    }
    if (typeof description != "string" || !description.trim().length) {
        throw "Status of the item was not given"
    }


    //Code to check all the parameters of the blog

    //Retriving blog collections from the database
    const blogCollection = await blog();

    //Storing the date when the blog was created in the database
    let date = moment().format("MM/DD/YYYY");

    //Creating a new blog object
    const obj = {
        user_id: ObjectId(user_id),
        blog_name: blog_name,
        blog_category_id: ObjectId(blog_category_id),
        description: description,
        show_on_website: blogData.show_on_website,
        created_date: blogData.created_date,
        updated_date: date
    };

    //Inserting the new object created  in the blog collection
    let result = await blogCollection.updateOne({ _id: parseId }, { $set: obj })
    //Checking if the blog is successfully inserted or not
    // if (!result.acknowledged || !result.modifiedCount)
    //     throw { code: 500, message: `Could not update the blog` };

    // Retriving inserted blog id

    //Retriving the product from the id and returning it
    const blogs = await getBlogById(blog_Id);
    return blogs;
}

const updateBlogStatus = async (status, blog_Id) => {
    let parseId;
    if (typeof blog_Id != "string") {
        throw "blog id was not given or wrong type";
    }
    try {
        parseId = ObjectId(blog_Id);
    } catch (e) {
        throw "blog id could not be converted into object id."
    }
    try {
        await getBlogById(blog_Id);
    } catch (e) {
        throw "blog does not exist while adding blog"
    }
    if (typeof status != "string") {
        throw "status was not given or wrong type";
    }


    //Code to check all the parameters of the blog

    //Retriving blog collections from the database
    const blogCollection = await blog();

    //Storing the date when the blog was created in the database
    let date = moment().format("MM/DD/YYYY");
    var isTrueSet = (status === 'true');
    //Creating a new blog object

    //Inserting the new object created  in the blog collection
    let result = await blogCollection.updateOne({ _id: parseId }, { $set: { show_on_website: isTrueSet, updated_date: date } })
    //Checking if the blog is successfully inserted or not
    // if (!result.acknowledged || !result.modifiedCount)
    //     throw { code: 500, message: `Could not update the blog` };

    // Retriving inserted blog id

    //Retriving the product from the id and returning it
    const blogs = await getBlogById(blog_Id);
    return blogs;
}

//Get the blog by Id
const getBlogById = async (blogId) => {
    //Code to validate the id
    if (typeof blogId != "string") {
        throw "  blog id was not given or wrong type"
    }
    //Retriving product collections from the database
    const blogCollection = await blog();
    //Retriving a blog by Id
    let blogs = await blogCollection.aggregate([
        {
            $match: { _id: ObjectId(blogId) }
        },
        {
            $lookup: {
                from: "blog_category",
                localField: "blog_category_id",
                foreignField: "_id",
                as: "blog_category"
            }
        },
        {
            $unwind: {
                path: "$blog_category",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "user",
                localField: "user_id",
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

    //Checing if the blog is retrived from the database. If not throw an error
    if (blogs === null) throw `blog not found`;

    // blogs?.[0]?._id = blogs?.[0]?._id?.toString();

    return blogs?.[0];
}

const getallBlog = async () => {

    //Code to validate the id
    //Retriving product collections from the database
    const blogCollection = await blog();
    //Retriving a blog by Id
    const blogs = await blogCollection.aggregate([
        {
            $lookup: {
                from: "blog_category",
                localField: "blog_category_id",
                foreignField: "_id",
                as: "blog_category"
            }
        },
        {
            $unwind: {
                path: "$blog_category",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "user",
                localField: "user_id",
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

    //Checing if the blog is retrived from the database. If not throw an error
    if (blogs === null) throw `blog not found`;

    return blogs;
}

//Get the blog by Category (either dieting or muscle growth)
const getBlogByCategoryId = async (categoryId) => {

    //Code to validate the categoryId
    if (typeof categoryId != "string") {
        throw "blog categoryId  was not given or different type."
    }
    //Retriving product collections from the database
    const blogCollection = await blog();

    //Retriving a blog by CategoryId
    const blogs = await blogCollection.aggregate([
        {
            $match: { blog_category_id: ObjectId(categoryId) }
        },
        {
            $lookup: {
                from: "blog_category",
                localField: "blog_category_id",
                foreignField: "_id",
                as: "blog_category"
            }
        },
        {
            $unwind: {
                path: "$blog_category",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "user",
                localField: "user_id",
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
    ]);

    //Checing if the blog is retrived from the database. If not throw an error
    if (blogs === null) throw `blog not found`;

    //Converting the blogs id to string
    for (let i = 0; i < blog.length; i++)
        blogs[i]._id = blogs[i]._id.toString();

    return blogs;

}





module.exports = {
    createBlog,
    updateBlog,
    getBlogById,
    getBlogByCategoryId,
    updateBlogStatus,
    getallBlog
};
