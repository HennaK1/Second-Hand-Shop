"use strict";
const pool = require("../../tietokanta/kirppis");
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
	JOIN Category ON 
	wop_product.owner = wop_user.user_id`);
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
	  SELECT 
	  ProductId, 
	  wop_product.name, 
	  Gps, 
	  owner, 
	  ImageLocation,
	  Price, 
	  LikeCount,
	  wop_user.name as ownername 
	  FROM wop_product 
	  JOIN wop_user ON 
	  wop_product.owner = wop_user.user_id
	  WHERE product_id = ?`,
        [id]
    );
    return rows;
  } catch (e) {
    console.error("getProduct error", e.message);
    next(httpError("Database error", 500));
  }
};

const addProduct = async (
    ProductLocation,
    Caption,
    UserName,
    CategoryName,
    next
) => {
  try {
    const [rows] = await promisePool.execute(
        "INSERT INTO tiedosto (ProductLocation, Caption, UserName) VALUES (?, ?, ?, ?, ?)",
        [ProductLocation, Caption, UserName],
        "INSERT INTO relationship (CategoryName, Tiedostonumero)VALUES (?, LAST_INSERT_ID()",
        [CategoryName]
    );
    return rows;
  } catch (e) {
    console.error("addProduct error", e.message);
    next(httpError("Database error", 500));
  }
};

const modifyProduct = async (
    ProductId,
    Caption,
    owner,
    Gps,
    Price,
    role,
    next
) => {
  let sql =
      "UPDATE wop_product SET ProductId = ?, Caption = ?, Gps = ? WHERE Price = ? AND owner = ?;";
  let params = [ProductId, Caption, Gps, Price, owner];
  if (role === 0) {
    sql =
        "UPDATE wop_product SET ProductId = ?, Caption = ?, Gps = ?, owner = ? WHERE Price = ?;";
    params = [ProductId, Caption, Gps, owner, Price];
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

const deleteProduct = async (id, owner_id, role, next) => {
  let sql = "DELETE FROM wop_product WHERE product_id = ? AND owner = ?";
  let params = [id, owner_id];
  if (role === 0) {
    sql = "DELETE FROM wop_product WHERE product_id = ?";
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