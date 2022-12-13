const mongoCollections = require("../config/mongoCollections");
const blog = mongoCollections.blog;
const blogsCategory = mongoCollections.blog_category
const { ObjectId } = require("mongodb");
let moment = require("moment");

const createBlog = async (user_id, blog_name, blog_category_id, description) => {

    //Code to check all the parameters of the blog

    //Retriving blog collections from the database
    const blogCollection = await blog();

    //Storing the date when the blog was created in the database
    let date = moment().format("MM/DD/YYYY");

    //Creating a new blog object
    const new_blog = {
        user_id: ObjectId(user_id),
        blog_name: blog_name,
        blog_category_id: ObjectId(blog_category_id),
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
    const blogById = await blogCollection.findOne({ _id: ObjectId(blogId) });

    //Checing if the blog is retrived from the database. If not throw an error
    if (!blogById) throw { code: 404, message: `blog not found` };

    blogById._id = blogById._id.toString();
    return blogById;
}

//Get the blog by Category (either dieting or muscle growth)
const getBlogByCategoryId = async (categoryId) => {

    //Code to validate the categoryId

    //Retriving blog collections from the database
    const blogCollection = await blog();

    //Retriving a blog by CategoryId
    const blogs = await blogCollection.find({ blog_category_id: ObjectId(categoryId) }).toArray();

    //Checing if the blog is retrived from the database. If not throw an error
    if (!blogs) throw { code: 404, message: `blog not found` };

    //Converting the blogs id to string
    for (let i = 0; i < blog.length; i++)
        blogs[i]._id = blogs[i]._id.toString();

    return blogs;

}

//Get All the Blogs Category
const getBlogCategory = async () => {

    //Retriving blog Category collections from the database
    const blogCategoryCollection = await blogsCategory();

    //Retriving all the blog Collection from the database
    const blogCategorydata = await blogCategoryCollection.find({}).toArray();;

    if (!blogCategorydata) throw { code: '404', messsage: 'No blogs found' };

    //Converting the blogs Category id to string
    for (let i = 0; i < blogCategorydata.length; i++)
        blogCategorydata[i]._id = blogCategorydata[i]._id.toString();

    return blogCategorydata;
}




module.exports = {
    createBlog,
    getBlogById,
    getBlogByCategoryId,
    getBlogCategory
};
