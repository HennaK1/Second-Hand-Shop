"use strict";
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getAllProducts = async (next) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.execute(`
	SELECT 
	Caption,
	CategoryId,
	Gps,
	ImageLocation,
	LikeCount,
	Price,
	ProductId,
	UserName,
  FROM Product
  JOIN UserName ON
  ProductOwner.UserName
	FROM User`);
    return rows;
  } catch (e) {
    console.error("getAllProducts error", e.message);
    next(httpError("Database error", 500));
  }
};

const getProductsByKeyword = async (next) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.execute(`
	SELECT 
  CategoryId,
	CategoryName, 
	FROM Category`);
    return rows;
  } catch (e) {
    console.error("getProductsByKeyword error", e.message);
    next(httpError("Database error", 500));
  }
};

const getProduct = async (id, next) => {
  try {
    const [rows] = await promisePool.execute(
        `
	  SELECT *
	  FROM ImageLocation, 
	  JOIN Category ON 
	  ImageLocation.CategoryName = Category.CategoryName
	  WHERE ImageLocation.CategoryId = ?`,
        [id]
    );
    return rows;
  } catch (e) {
    console.error("getProduct error", e.message);
    next(httpError("Database error", 500));
  }
};

const addProduct = async (
    ImageLocation,
    Caption,
    UserName,
    CategoryName,
    ProductLocation,
    next
) => {
  try {
    const [rows] = await promisePool.execute(
        "INSERT INTO ImageLocation (Caption, UserName, CategoryName, ProductLocation,) VALUES (?, ?, ?, ?, ?)",
        [Caption, UserName, CategoryName, ProductLocation],
    );
    return rows;
  } catch (e) {
    console.error("addProduct error", e.message);
    next(httpError("Database error", 500));
  }
};

const modifyProduct = async (
    CategoryName,
    CategoryId,
    ProductOwner,
    Caption,
    owner,
    Gps,
    Price,
    Role,
    next
) => {
  let sql =
      "UPDATE Product SET CategoryName = ?, Caption = ?, Gps = ?, Price = ? WHERE ProductId = ? AND owner = ?;";
  let params = [CategoryName, Caption, Gps, Price, owner];
  if (Role === 0) {
    sql =
        "UPDATE Product SET CategoryId = ?, Caption = ?, Gps = ?, ProductOwner = ? WHERE ProductId = ?;";
    params = [CategoryId, Caption, Gps, Price];
  }
  console.log("sql", sql);
  try {
    const [rows] = await promisePool.execute(sql, params);
    return rows;
  } catch (e) {
    console.error("addProduct error", e.message);
    next(httpError("Database error", 500));
  }
};

const deleteProduct = async (id, UserName, Role, next) => {
  let sql = "DELETE FROM Product WHERE ImageLocation = ? AND UserName = ?";
  let params = [id, UserName];
  if (Role === 0) {
    sql = "DELETE FROM Product WHERE ImageLocation = ?";
    params = [id];
  }
  try {
    const [rows] = await promisePool.execute(sql, params);
    return rows;
  } catch (e) {
    console.error("getProduct error", e.message);
    next(httpError("Database error", 500));
  }
};

module.exports = {
  getAllProducts,
  getProductsByKeyword,
  getProduct,
  addProduct,
  modifyProduct,
  deleteProduct,
};