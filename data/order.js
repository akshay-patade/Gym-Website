const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.user;
const cartdata = mongoCollections.cart;
const { ObjectId } = require("mongodb");
let moment = require("moment");
const helper = require("../helpers");
const productData = require("./products");

//Get all cart Items
const getCartItems = async (userID) => {
  //Code to check all the parameters
  userID = helper.checkObjectId(userID);

  const CartCollection = await cartdata();
  const CartDetails = await CartCollection.findOne({
    user_id: ObjectId(userID),
  });
  if (!CartDetails)
    throw {
      code: 404,
      message: `Data  not found`,
    };
  let result = {};
  let CartDetailsProducts = CartDetails.product_details;
  let AllProducts = [];
  let qty = [];
  if (Array.isArray(CartDetailsProducts) === true) {
    for (let i = 0; i < CartDetailsProducts.length; i++) {
      let temp = CartDetailsProducts[i];
      let product = await productData.getProductById(
        CartDetailsProducts[i].product_id
      );
      temp.name = product.name;
      temp.price = product.price;
      temp.product_img = product.product_img;
      AllProducts.push(temp);
    }
  }

  if (AllProducts.length === 0) {
    throw {
      code: 404,
      message: `Cart is Empty`,
    };
  }
  let total = 0;

  AllProducts.forEach((product) => {
    total = parseFloat(total + product.price);
  });

  result.currentProduct = AllProducts;
  result.totalPrice = total;

  return result;
};
//Remove product by cart id
const RemoveFromCartByProductid = async (cartProductID) => {
  //Code to check all the parameters
  cartProductID = helper.checkObjectId(cartProductID);

  const CartCollection = await cartdata();
  const CartDetails = await CartCollection.findOne({
    product_details: { $elemMatch: { _id: cartProductID } },
  });
  if (!CartDetails)
    throw {
      code: 404,
      message: `Cart Item not found`,
    };

  const deletedProduct = await CartCollection.updateMany(
    {},
    {
      $pull: {
        product_details: { _id: cartProductID },
      },
    }
  );

  let cart_id = CartDetails._id.toString();

  let UpdatedCart = await CartCollection.findOne({
    _id: ObjectId(cart_id),
  });

  return UpdatedCart;
};

module.exports = {
  getCartItems,
  RemoveFromCartByProductid,
};
