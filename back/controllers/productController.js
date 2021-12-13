"use strict";
const { validationResult } = require("express-validator");
// productController
const {
  getAllProducts,
  getProduct,
  addProduct,
  deleteProduct,
  modifyProduct,
} = require("../models/productModel");
const { httpError } = require("../utils/errors");
const { makeThumbnail } = require("../utils/resize");

const product_list_get = async (req, res, next) => {
  try {
    const products = await getAllProducts(next);
    if (products.length > 0) {
      res.json(products);
    } else {
      next("No users found", 404);
    }
  } catch (e) {
    console.log("product_list_get error", e.message);
    next(httpError("internal server error", 500));
  }
};

const product_get = async (req, res, next) => {
  try {
    const answer = await getProduct(req.params.id, next);
    if (answer.length > 0) {
      res.json(answer.pop());
    } else {
      next(httpError("No user found", 404));
    }
  } catch (e) {
    console.log("product_get error", e.message);
    next(httpError("internal server error", 500));
  }
};

const product_post = async (req, res, next) => {
  console.log("user_post", req.body, req.file, req.user);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("product_post validation", errors.array());
    next(httpError("invalid data", 400));
    return;
  }

  if (!req.file) {
    const err = httpError("file not valid", 400);
    next(err);
    return;
  }

  try {
    const thumb = await makeThumbnail(
        req.file.path,
        "./uploads/thumbnails" + req.file.ProductId
    );

    const { Caption, ImageLocation, Price, CategoryName } = req.body;

    const result = await addProduct(
        Caption,
        ImageLocation,
        req.user.UserName,
        req.file.ProductId,
        CategoryName,
        Price,
        next
    );
    if (thumb) {
      if (result.affectedRows > 0) {
        res.json({
          message: "product added",
          ProductId: result.insertId,
        });
      } else {
        next(httpError("No product inserted", 400));
      }
    }
  } catch (e) {
    console.log("product_post error", e.message);
    next(httpError("internal server error", 500));
  }
};

const product_put = async (req, res, next) => {
  console.log("product_put", req.body, req.params);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("product_put validation", errors.array());
    next(httpError("invalid data", 400));
    return;
  }
  // pvm VVVV-KK-PP esim 2010-05-28
  try {
    const { Caption, } = req.body;
    /*let owner = req.user.user_id;
    if (req.user.Role === 0) {
      owner = req.body.owner;
    }*/

    const ProductOwner = req.user.Role === 0 ? req.body.owner : req.user.UserName;

    const result = await modifyProduct(
        Caption,
        ProductOwner,
        req.params.Imagelocation,
        req.user.Role,
        next
    );
    if (result.affectedRows > 0) {
      res.json({
        message: "product modified",
        ProductId: result.insertId,
      });
    } else {
      next(httpError("No products modified", 400));
    }
  } catch (e) {
    console.log("product_put error", e.message);
    next(httpError("internal server error", 500));
  }
};

const product_delete = async (req, res, next) => {
  console.log(req.user);
  try {
    const answer = await deleteProduct(
        req.params.id,
        req.user.UserName,
        req.user.Role,
        next
    );
    if (answer.affectedRows > 0) {
      res.json({
        message: "product deleted",
        ProductId: answer.insertId,
      });
    } else {
      next(httpError("No product found", 404));
    }
  } catch (e) {
    console.log("product_delete error", e.message);
    next(httpError("internal server error", 500));
  }
};

module.exports = {
  product_list_get,
  product_get,
  product_post,
  product_delete,
  product_put
};