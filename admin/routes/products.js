const express = require("express");
const router = express.Router();
const path = require("path");
const data = require('../data');
const products = data.products;
const multer = require('multer');
// Creating a route for blogs

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/images/product');
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })

router.post("/", upload.array('uploaded_file'), async (req, res) => {
    try {
        let name = req.body.name;
        let price = Number(req.body.price);
        let category = req.body.category;
        let description = req.body.description;
        let size = req.body.size;
        let color = req.body.color;
        let overallrating = Number(req.body.overallrating);
        let fileName = req.files.map((f_name) => {
            return f_name.originalname
        })
        let product = await products.createProduct({ name: name, price: price, category: category, size: size, product_img: fileName, color: color, description: description, overallrating: overallrating });
        res.status(200).redirect('/admin/products');
    }
    catch (e) {
        res.status(500).render(`product/add`, { err: e });
    }
});

router.post("/update/:id", upload.array('uploaded_file'), async (req, res) => {
    try {
        let productId = req.params.id;
        let name = req.body.name;
        let price = Number(req.body.price);
        let category = req.body.category;
        let description = req.body.description;
        let size = req.body.size;
        let color = req.body.color;
        let overallrating = Number(req.body.overallrating);
        let fileName = []
        if (req?.files) {
            fileName = req.files.map((f_name) => {
                return f_name.originalname
            })
            console.log(fileName)
        }

        let product = await products.updateProduct({ productId: productId, name: name, price: price, category: category, size: size, product_img: fileName, color: color, description: description, overallrating: overallrating });

        // res.status(200).send(product);
        res.status(200).redirect('/admin/products');
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
});

router.route("/delete-comment/:id").get(async (req, res) => {
    try {
        let commentId = req.params.id;
        let product = await products.updateProductComment(commentId);

        // res.status(200).send(product);
        res.redirect('/admin/products/comment/get')
    }
    catch (e) {
        res.status(500).send(e);
    }
});
router.route("/change-status/:id").patch(async (req, res) => {
    try {
        let productId = req.params.id;
        let status = req.body.status;
        let product = await products.updateProductStatus(status, productId);

        res.status(200).send(product);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
router.route("/").get(async (req, res) => {
    try {
        let product = await products.getAllProducts();
        const response = {
            product: product,
        }
        res.render(`product/list`, response);
    }
    catch (e) {
        res.status(500).render(`product/list`, { err: e });
    }
})
router.route("/comment/get").get(async (req, res) => {
    try {
        let comment = await products.getProductAllComment();
        // res.status(200).send(comment)
        res.render(`comment/list`, { comment: comment });
    }
    catch (e) {
        // res.status(500).send(e);
        res.status(500).render(`comment/list`, { err: e });
    }


})
router.route("/add").get(async (req, res) => {
    res.render(`product/add`);
})




router.route("/:id").get(async (req, res) => {
    let product = await products.getProductById(req.params.id);
    const response = {
        product: product,
        color: [{ color: 'Red' }, { color: 'Blue' }, { color: 'Green' }, { color: 'Black' }].map(item => {
            return {
                ...item,
                status: product.color.includes(item.color)
            }
        }),
        size: [{ size: 'S' }, { size: 'M' }, { size: 'L' }, { size: 'XXl' }].map(item => {
            return {
                ...item,
                status: product.size.includes(item.size)
            }
        })
    }
    res.render(`product/edit`, response);
    // res.send(product);
})



module.exports = router;


