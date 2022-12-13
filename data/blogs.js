const mongoCollections = require("../config/mongoCollections");
const blog = mongoCollections.blog;
const { ObjectId } = require("mongodb");

const createBlog = async (user_id, blog_name, blog_category_id, description) => {

    //Code to check all the parameters of the blog

    //Retriving blog collections from the database
    const blogCollection = await blog();

    //Storing the date when the blog was created in the database
    let date = moment().format("MM/DD/YYYY");

    //Creating a new blog object
    const new_blog = {
        user_id: user_id,
        blog_name: blog_name,
        blog_category_id: blog_category_id,
        description: description,
        created_date: date,
        updated_date: date,
        status: true
    };

    //Inserting the new object created  in the blog collection
    const insertInfo = await blogCollection.insertOne(new_blog);

    //Checking if the blog is successfully inserted or not
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw { code: 500, message: `Could not add the blog` };

    // Retriving inserted blog id
    const newId = insertInfo.insertedId.toString();

    //Retriving the product from the id and returning it
    //   const blog = await getBlogById(newId);
    //   return blog;
}

//Get the blog by Id
const getBlogById = async (blogId) => {

    //Code to validate the id

    //Retriving product collections from the database
    const blogCollection = await blog();

    //Retriving a blog by Id
    const blog = await blogCollection.findOne({ _id: ObjectId(blogId) });

    //Checing if the blog is retrived from the database. If not throw an error
    if (blog === null) throw { code: 404, message: `blog not found` };

    blog._id = blog._id.toString();
    return blog;
}

//Get the blog by Category (either dieting or muscle growth)
const getBlogByCategoryId = async (categoryId) => {

    //Code to validate the categoryId

    //Retriving product collections from the database
    const blogCollection = await blog();

    //Retriving a blog by CategoryId
    const blogs = await blogCollection.find({ blog_category_id: ObjectId(categoryId) });

    //Checing if the blog is retrived from the database. If not throw an error
    if (blogs === null) throw { code: 404, message: `blog not found` };

    //Converting the blogs id to string
    for (let i = 0; i < blog.length; i++)
        blogs[i]._id = blogs[i]._id.toString();

    return blogs;

}


module.exports = {
    createBlog,
    getBlogById,
    getBlogByCategoryId
};
