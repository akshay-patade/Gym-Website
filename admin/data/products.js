const mongoCollections = require("../config/mongoCollections");
const product = mongoCollections.product;
const { ObjectId } = require("mongodb");
const moment = require("moment");

//Function to create a product
const createProduct = async ({
    name,
    description,
    price,
    category,
    size,
    product_img,
    color,
    overallrating
}) => {
    //Code to check all the parameters
    if (typeof name != "string" || !name.trim().length) {
        throw "name of the product was not given"
    }
    if (typeof color != "object" || !color.length) {
        throw "color of the product was not given"
    }
    if (typeof product_img != "object" || !product_img.length) {
        throw "product image of the product was not given"
    }
    if (typeof size != "object" || !size.length) {
        throw "size of the product was not given"
    }

    if (typeof description != "string" || !description.trim().length) {
        throw "description of the product was not given"
    }
    if (typeof category != "string" || !category.trim().length) {
        throw "category of the product was not given"
    }
    if (typeof price != "number") {
        throw "price of the product was not given"
    }
    if (typeof overallrating != "number") {
        throw "overallrating of the product was not given"
    }
    //Retriving product collections from the database
    const productCollection = await product();
    let new_product_img = []
    //Storing the date when the product was created in the database
    let date = moment().format("MM/DD/YYYY");
    product_img.forEach(element => {
        new_product_img.push({
            _id: new ObjectId(),
            URL: element,
            status: true
        })
    });
    //Creating a new product object
    const new_product = {
        name: name,
        description: description,
        price: price,
        category: category,
        size: size,
        overallrating: overallrating,
        ratings: [],
        comments: [],
        show_on_website: true,
        product_img: new_product_img,
        color: color,
        created_date: date,
        updated_date: date
    };

    //Inserting the new object created  in the product collection
    const insertInfo = await productCollection.insertOne(new_product);

    //Checking if the product is successfully inserted or not
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw { code: 500, message: `Could not add the product` };

    // Retriving inserted product id
    const newId = insertInfo.insertedId.toString();

    //Retriving the product from the id and returning it
    const products = await getProductById(newId);
    return products;
};

//Function to get a product By Id
const getProductById = async (productId) => {
    //Code to check the productId parameters
    if (typeof productId != "string") {
        throw { code: 502, message: "Error:   product id was not given or wrong type" };
    }
    //Retriving product collections from the database
    const productCollection = await product();

    //Retriving a product by Id
    const products = await productCollection.findOne({ _id: ObjectId(productId) });

    //Checing if the product is retrived from the database. If not throw an error
    if (products === null) throw `product not found`;

    products._id = products._id.toString();
    return products;
};

//Function to get all the Products
const getAllProducts = async () => {
    //Retriving product collections from the database
    const productCollection = await product();

    //Getting the list of products and converting it to array
    const productList = await productCollection.find({}).toArray();

    //Checking if the movieList is null or not
    if (!productList || productList.length === 0)
        throw `Could not get all the products`;

    //Converting the product id to string

    //Returning products
    return productList;
};

//Update the product
const updateProduct = async ({
    productId,
    name,
    description,
    price,
    category,
    size,
    product_img,
    color,
    overallrating
}) => {
    //Code to check all the parameters
    let oldproduct, parseId;
    if (typeof productId != "string") {
        throw "roduct id was not given or wrong type";
    }
    try {
        parseId = ObjectId(productId);
    } catch (e) {
        throw "product id could not be converted into object id."
    }
    try {
        oldproduct = await getProductById(productId);
    } catch (e) {
        throw "product does not exist while adding blog"
    }
    if (typeof name != "string" || !name.trim().length) {
        throw "name of the product was not given"
    }
    if (typeof color != "object" || !color.length) {
        throw "color of the product was not given"
    }
    if (typeof product_img != "object") {
        throw "product image of the product was not given"
    }
    if (typeof size != "object" || !size.length) {
        throw "size of the product was not given"
    }

    if (typeof description != "string" || !description.trim().length) {
        throw "description of the product was not given"
    }
    if (typeof category != "string" || !category.trim().length) {
        throw "category of the product was not given"
    }
    if (typeof price != "number") {
        throw "price of the product was not given"
    }
    if (typeof overallrating != "number") {
        throw "overallrating of the product was not given"
    }

    //Retriving product collections from the database
    const productCollection = await product();
    let new_product_img = []
    //Storing the date when the product was created in the database
    let date = moment().format("MM/DD/YYYY");

    if (product_img.length == 0) {
        const productFind = await productCollection.findOne(
            { _id: parseId }
        );
        new_product_img = productFind.product_img
    } else {
        product_img.forEach(element => {
            new_product_img.push({
                _id: new ObjectId(),
                URL: element,
                status: true
            })
        });
    }

    //Creating a updated Product Object
    const updatedProduct = {
        name: name,
        description: description,
        price: price,
        category: category,
        size: size,
        overallrating: overallrating,
        ratings: [],
        comments: [],
        show_on_website: oldproduct.show_on_website,
        product_img: new_product_img,
        color: color,
        created_date: oldproduct.created_date,
        updated_date: date
    };

    const updatedInfo = await productCollection.updateOne(
        { _id: parseId },
        { $set: updatedProduct }
    );

    if (updatedInfo.modifiedCount === 0 && updatedInfo.matchedCount != 1) {
        throw { code: 400, message: "could not update product successfully" };
    }

    let new_product = await getProductById(productId);
    return new_product;
};
const updateProductStatus = async (status, productId) => {
    let parseId;
    if (typeof productId != "string") {
        throw "product id was not given or wrong type";
    }
    try {
        parseId = ObjectId(productId);
    } catch (e) {
        throw "product id could not be converted into object id."
    }
    try {
        await getProductById(productId);
    } catch (e) {
        throw "product does not exist while adding blog"
    }
    if (typeof status != "string") {
        throw "status was not given or wrong type";
    }


    //Code to check all the parameters of the blog

    //Retriving blog collections from the database
    const productCollection = await product();

    //Storing the date when the blog was created in the database
    let date = moment().format("MM/DD/YYYY");
    var isTrueSet = (status === 'true');
    //Creating a new blog object

    //Inserting the new object created  in the blog collection
    let result = await productCollection.updateOne({ _id: parseId }, { $set: { show_on_website: isTrueSet, updated_date: date } })
    //Checking if the blog is successfully inserted or not
    if (!result.acknowledged || !result.modifiedCount)
        throw `Could not update the product successfully`;

    // Retriving inserted blog id

    //Retriving the product from the id and returning it
    const Products = await getProductById(productId);
    return Products;
}

//Function to get a product By Name
const getProductByName = async (name) => {
    //Code to check all the parameters
    if (typeof name != "string" || !name.trim().length) {
        throw "name of the product was not given"
    }
    //Retriving product collections from the database
    const productCollection = await product();

    let regexp = new RegExp(name, "i");

    //Retriving a product by Name
    const product = await productCollection.find({ name: regexp });

    //Checing if the product is retrived from the database. If not throw an error
    if (product === null) throw `products not found`;

    return product;
};

const getProductAllComment = async () => {
    const productCollection = await product();
    let productComments = await productCollection.aggregate([
        {
            $addFields: {
                count: { $size: "$comments" }
            }
        },
        {
            $match: {
                count: {
                    $gt: 0
                }
            }
        },
        {
            $unwind: {
                path: "$comments",
                preserveNullAndEmptyArrays: true
            }
        },
    ]).toArray()
    return productComments
}
const updateProductComment = async (commentId) => {
    let parseId;
    if (typeof commentId != "string") {
        throw "commentId id was not given or wrong type";
    }
    try {
        parseId = ObjectId(commentId);
    } catch (e) {
        throw "commentId id could not be converted into object id."
    }
    const productCollection = await product();

    const products = await productCollection.findOne({ "comments._id": commentId });
    if (products === null) throw `product not found`;
    new_comment = []
    products.comments.forEach(element => {
        if (element._id != commentId) { new_comment.push(element) };
    });
    let date = moment().format("MM/DD/YYYY");

    //Creating a new blog object

    //Inserting the new object created  in the blog collection
    let result = await productCollection.updateOne({ _id: ObjectId(products._id) }, { $set: { comments: new_comment, updated_date: date } })
    if (!result.acknowledged || !result.modifiedCount)
        throw `Could not delete comment successfully`;
    return new_comment

}
module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    updateProductStatus,
    getProductByName,
    getProductAllComment,
    updateProductComment
};
