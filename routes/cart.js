const express = require("express");
const { url } = require("inspector");
const router = express.Router();
const path = require("path");
const xss = require("xss");
const data = require("../data");
const helper = require("../helpers");
const blog_category = data.blogs;
const users = data.users;
const order = data.order;

router
  .route("/")
  .get(async (req, res) => {
    if (req.session.userdata) {
      try {
        const Result = await order.getCartItems(req.session.userdata.user_id);
        res.status(200).render("cart", {
          title: "Cart",
          user_header: true,
          user_footer: true,
          loggedIn: true,
          UserFullname: req.session.other.UserFullname,
          profileimage: req.session.other.profileimage,
          cartdata: Result,
        });
      } catch (e) {
        if (e.message === "Cart is Empty") {
          res.status(e.code).render("EmptyCart", {
            hasErrors: true,
            error: e.message,
            title: "Error",
            user_header: true,
            user_footer: true,
            loggedIn: true,
            UserFullname: req.session.other.UserFullname,
          });
        } else {
          res.status(e.code).render("Error", {
            hasErrors: true,
            error: e.message,
            title: "Error",
            user_header: true,
            user_footer: true,
            NotloggedIn: true,
          });
        }
        return;
      }
    } else {
      res.redirect("/login");
    }
    return;
  })
  .put(async (req, res) => {
    // console.log("in");
    if (req.session.userdata) {
      try {
        const data = {};
        data.cart_id = xss(req.body.cart_id);
        const UpdateCart = await order.RemoveFromCartByProductid(data.cart_id);
        if (UpdateCart) {
          // const Result = await order.getCartItems(req.session.userdata.user_id);
          // res.status(200).render("cart", {
          //   title: "Cart",
          //   user_header: true,
          //   user_footer: true,
          //   loggedIn: true,
          //   UserFullname: req.session.other.UserFullname,
          //   profileimage: req.session.other.profileimage,
          //   cartdata: Result,
          // });
          return res.status(200).json({ url: "/cart" });
        }
        // res.redirect("/cart");
      } catch (e) {
        res.status(e.code).render("Error", {
          hasErrors: true,
          error: e.message,
          title: "Error",
          user_header: true,
          user_footer: true,
          NotloggedIn: true,
        });
      }
    } else {
      res.redirect("/404");
    }
    return;
  });

module.exports = router;
