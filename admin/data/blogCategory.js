const mongoCollections = require("../config/mongoCollections");
const blogCategorys = mongoCollections.blog_category;
const blog = mongoCollections.blog;
const { ObjectId } = require("mongodb");
const users = require("./user");
const moment = require("moment")

//Get the blog by Id
const createBlogCategory = async (name, description) => {
    if (typeof name != "string" || !name.trim().length) {
        throw "Blog Category name was not given or wrong type";
    }
    if (typeof description != "string" || !description.trim().length) {
        throw "description of the blog Category was not given"
    }

    //Code to check all the parameters of the blog

    //Retriving blog collections from the database
    const blogCategory = await blogCategorys();
    //Storing the date when the blog was created in the database
    let date = moment().format("MM/DD/YYYY");

    //Creating a new blog object
    const new_blog_Category = {
        name: name,
        description: description,
        created_date: date,
        updated_date: date
    };

    //Inserting the new object created  in the blog collection
    const insertInfo = await blogCategory.insertOne(new_blog_Category);

    //Checking if the blog is successfully inserted or not
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw { code: 500, message: `Could not add the blog Category` };


    return insertInfo;
}
const updateBlogCategory = async (name, description, blog_Category_Id) => {
    let blogCategoryData, parseId;
    if (typeof blog_Category_Id != "string") {
        throw "blog Category id was not given or wrong type";
    }
    try {
        parseId = ObjectId(blog_Category_Id);
    } catch (e) {
        throw "blog Category id could not be converted into object id."
    }
    try {
        blogCategoryData = await getBlogCategoryById(blog_Category_Id);
    } catch (e) {
        throw "blog does not exist while adding blog"
    }
    if (typeof name != "string" || !name.trim().length) {
        throw "Blog Category name was not given or wrong type"
    }
    if (typeof description != "string" || !description.trim().length) {
        throw "description of the blog Category was not given"
    }


    //Code to check all the parameters of the blog

    //Retriving blog collections from the database
    const blogCategory = await blogCategorys();

    //Storing the date when the blog was created in the database
    let date = moment().format("MM/DD/YYYY");

    //Creating a new blog object
    const obj = {
        name: name,
        description: description,
        created_date: blogCategoryData.created_date,
        updated_date: date
    };

    //Inserting the new object created  in the blog collection
    let result = await blogCategory.updateOne({ _id: parseId }, { $set: obj })
    //Checking if the blog is successfully inserted or not
    if (!result.acknowledged || !result.modifiedCount)
        throw `Could not update the blog`;

    // Retriving inserted blog id

    //Retriving the product from the id and returning it
    return result;
}
const deleteBlogCategory = async (blog_Category_Id) => {
    let blogCategoryData, parseId;
    if (typeof blog_Category_Id != "string") {
        throw "blog Category id was not given or wrong type";
    }
    try {
        parseId = ObjectId(blog_Category_Id);
    } catch (e) {
        throw "blog Category id could not be converted into object id."
    }
    try {
        blogCategoryData = await getBlogCategoryById(blog_Category_Id);
    } catch (e) {
        throw "blog does not exist while adding blog"
    }


    //Code to check all the parameters of the blog

    //Retriving blog collections from the database
    const blogCategory = await blogCategorys();
    const blogCollection = await blog();

    //Storing the date when the blog was created in the database
    //Inserting the new object created  in the blog collection
    let result = await blogCategory.deleteOne({ _id: parseId })
    let blog_result = await blogCollection.deleteMany({ blog_category_id: parseId })
    //Checking if the blog is successfully inserted or not
    if (!result.acknowledged || !blog_result.acknowledged)
        throw `Could not delete the blog category`;

    // Retriving inserted blog id

    //Retriving the product from the id and returning it
    return "successfully deleted";
}
const getBlogCategoryById = async (blog_category_id) => {

    //Code to validate the id
    if (typeof blog_category_id != "string") {
        throw "blog categoryId  was not given or different type."
    }
    //Retriving product collections from the database
    const blogCategoryCollection = await blogCategorys();
    //Retriving a blog by Id
    const blogCategory = await blogCategoryCollection.findOne({ _id: ObjectId(blog_category_id) });
    //Checing if the blog is retrived from the database. If not throw an error
    if (!blogCategory) {
        throw "blog category not found"
    }

    return blogCategory;
}

const getAllBlogCategory = async () => {

    //Retriving product collections from the database
    const blogCategoryCollection = await blogCategorys();
    //Retriving a blog by Id
    const blogCategory = await blogCategoryCollection.find({}).toArray();
    //Checing if the blog is retrived from the database. If not throw an error
    if (!blogCategory) {
        throw "blog category not found"
    }

    return blogCategory;
}
//Get the blog by Category (either dieting or muscle growth)



module.exports = {
    createBlogCategory,
    getBlogCategoryById,
    updateBlogCategory,
    getAllBlogCategory,
    deleteBlogCategory
};
