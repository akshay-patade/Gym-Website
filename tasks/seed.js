const dbConnection = require("../config/mongoConnection");
const data = require("../data");
const product = data.products;

const main = async () => {
  const db = await dbConnection.dbConnection();
  //await db.dropDatabase();

  //Creating a hoddie product
  const hoodies = await product.createProduct(
    "Relaxed Fit Hoodie for Gym",
    "Relaxed-fit sweatshirt hoodie in cotton-blend fabric with soft, brushed inside. Jersey-lined drawstring hood, kangaroo pocket, and long sleeves. Wide ribbing at cuffs and hem.",
    24.99,
    "Hoodies",
    ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    [
      "/public/images/product/hoodies-1.webp",
      "/public/images/product/hoodies-2.webp",
      "/public/images/product/hoodies-3.webp",
    ],
    ["Black", "White", "Brown"]
  );

  //Creating a joggers product
  const joggers = await product.createProduct(
    "Regular fit Joggers",
    "Regular-fit sweatpant joggers in cotton-blend fabric with soft, brushed inside. Drawstring and covered elastic at waistband, side-seam pockets, and ribbed hems.",
    19.99,
    "Joggers",
    ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    [
      "/public/images/product/joggers-1.webp",
      "/public/images/product/joggers-2.webp",
      "/public/images/product/joggers-3.webp",
    ],
    ["White", "Blue", "Dark Brown"]
  );

  //Creating a protien product
  const protien = await product.createProduct(
    "5lbs OPTIMUM NUTRITION GOLD STANDARD 100% WHEY PROTEIN",
    "Post-Workout Muscle Support & Recovery 24 Grams of Protein per Serving to Help Build and Maintain Muscle. 5.5 Grams of Naturally Occurring BCAAs per Serving to Support Endurance and Recovery.The World's Best-Selling Whey Protein Powder",
    85.55,
    "Protien Powder",
    [],
    [
      "/public/images/product/protien-1.webp",
      "/public/images/product/protien-2.webp",
    ],
    []
  );

  //Creating a shaker proudct
  const shaker = await product.createProduct(
    "5lbs OPTIMUM NUTRITION GOLD STANDARD 100% WHEY PROTEIN",
    "Post-Workout Muscle Support & Recovery 24 Grams of Protein per Serving to Help Build and Maintain Muscle. 5.5 Grams of Naturally Occurring BCAAs per Serving to Support Endurance and Recovery.The World's Best-Selling Whey Protein Powder",
    85.55,
    "Protien Powder",
    [],
    [
      "/public/images/product/protien-1.webp",
      "/public/images/product/protien-2.webp",
    ],
    []
  );

  //Creating a tank-top product
  const tank_top = await product.createProduct(
    "Fast-drying Sports Tank Top",
    "Relaxed-fit tank top in fast-drying, functional fabric to help keep you dry and cool while exercising. Trimmed crew neck and deep armholes.",
    17.99,
    "Tank top",
    ["XS", "S", "M", "L", "XL", "XXL"],
    [
      "/public/images/product/tank-top-1.webp",
      "/public/images/product/tank-top-2.webp",
    ],
    ["Red", "Orange", "Black", "White", "Violet"]
  );

  //Creating a crop-top product
  const crop_top = await product.createProduct(
    "Seamless Sports Top for Women",
    "Fitted crop top in fast-drying, functional fabric to help keep you dry and cool while exercising. Round, ribbed neckline, short sleeves with trim at cuffs, and a straight-cut hem with wide ribbing. Designed with a minimum number of seams for added comfort and increased freedom of movement.",
    17.99,
    "Crop top",
    ["XS", "S", "M", "L", "XL"],
    [
      "/public/images/product/crop-top-1.webp",
      "/public/images/product/crop-top-2.webp",
    ],
    ["Pink", "Dark Blue"]
  );

  console.log("Done seeding database");
  await dbConnection.closeConnection();
};

main().catch(console.log);
