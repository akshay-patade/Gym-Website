const mongoCollections = require("../config/mongoCollections");
const product = mongoCollections.product;
const { ObjectId } = require("mongodb");

//Function to create a product
const createProduct = async (
  name,
  description,
  price,
  category,
  size,
  product_img,
  color
) => {
  //Code to check all the parameters

  //Retriving product collections from the database
  const productCollection = await product();

  //Creating a new product object
  const new_product = {
    name: name,
    description: description,
    price: price,
    category: category,
    size: size,
    overallrating: 0,
    ratings: [],
    comments: [],
    show_on_website: true,
    product_img: product_img,
    color: color,
  };

  //Inserting the new object created  in the product collection
  const insertInfo = await productCollection.insertOne(new_product);

  //Checking if the product is successfully inserted or not
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw { code: 500, message: `Could not add the product` };

  // Retriving inserted movie id
  const newId = insertInfo.insertedId.toString();

  //Retriving the movie from the id and returning it
  //   const movie = await getProductById(newId);
  //   return movie;
};

//Function to get a product By Id
const getProductById = async (productId) => {
  //Code to check all the parameters

  //Retriving product collections from the database
  const productCollection = await product();

  //Retriving a product by Id
  const product = await productCollection.findOne({ _id: ObjectId(productId) });

  //Checing if the product is retrived from the database. If not throw an error
  if (product === null) throw { code: 404, message: `movie not found` };

  product._id = movie._id.toString();
  return movie;
};

//Function to get all the Products
const getAllProducts = async () => {
  //Retriving product collections from the database
  const productCollection = await product();

  //Getting the list of products and converting it to array
  const productList = await productCollection.find({}).toArray();

  //Checking if the movieList is null or not
  if (!productList || productList.length === 0)
    throw { code: 404, message: `Could not get movies` };

  //Converting the produtct id to string
  for (let i = 0; i < productList.length; i++) {
    productList[i]._id = productList[i]._id.toString();
  }

  //Returning products
  return productList;
};

//Update the product
const updateProduct = async (
  productId,
  name,
  description,
  price,
  category,
  size,
  product_img,
  color
) => {
  //Code to check all the parameters

  //Retriving product collections from the database
  const productCollection = await product();

  //Creating a updated Product Object
  const updatedProduct = {
    name: name,
    description: description,
    price: price,
    category: category,
    size: size,
    product_img: product_img,
    color: color,
  };

  const updatedInfo = await productCollection.updateOne(
    { _id: ObjectId(productId) },
    { $set: updatedProduct }
  );

  if (updatedInfo.modifiedCount === 0) {
    throw { code: 400, message: "could not update product successfully" };
  }

  let new_product = await getMovieById(movieId);
  return new_product;
};

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
};
