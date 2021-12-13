"use strict";
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getAllProducts = async (next) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.execute(`
        SELECT * FROM Product 
        JOIN Category ON CategoryName.CategoryId 
        JOIN User ON ImageLocation.UserName = User.UserName;`
    );
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
	  ImageLocation.CategoryId = Category.CategoryId
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
    Product,
    Caption,
    UserName,
    CategoryId,
    ImageLocation,
    next
) => {
  try {
    const [rows] = await promisePool.execute(
        "INSERT INTO Product (Caption, CategoryId, UserName, ImageLocation,) VALUES (?, ?, ?, ?)",
        [Caption, CategoryId, UserName, ImageLocation],
    );
    return rows;
  } catch (e) {
    console.error("addProduct error", e.message);
    next(httpError("Database error", 500));
  }
};

const modifyProduct = async (
    ProductOwner,
    Caption,
    Gps,
    Price,
    Role,
    next
) => {
  let sql =
      "UPDATE Product SET Caption = ?, Gps = ?, Price = ? WHERE ProductId = ? AND ProductOwner = ?;";
  let params = [ Caption, Gps, Price, ProductOwner];
  if (Role === 0) {
    sql =
        "UPDATE Product SET Caption = ?, Gps = ?, ProductOwner = ? WHERE ProductId = ?;";
    params = [Caption, Gps, Price];
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
  let sql = "DELETE FROM Product WHERE ImageLocation = ? AND UserName = ?;";
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
const getCategories = async (CategoryName, next) => {
  try {
    const [rows] = await promisePool.execute(
        "SELECT CategoryName FROM Category where CategoryId=?",
        [CategoryName]
    );
    return rows;
  } catch (e) {
    console.error("getCategory error", e.message);
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