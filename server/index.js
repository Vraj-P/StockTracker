const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Make middleware
app.use(cors());
app.use(express.json()); // req.body

// Routes Start //

// Create a stock purchase
app.post("/stocks", async (req, res) => {
  try {
    const { stock_label, stock_buy_price, stock_quantity, stock_buy_date } =
      req.body;

    const new_stock_purchase = await pool.query(
      "INSERT INTO stocklist (stock_label, stock_buy_price, stock_quantity, stock_buy_date) VALUES($1, $2, $3, $4) RETURNING *",
      [stock_label, stock_buy_price, stock_quantity, stock_buy_date]
    );

    console.log(req.body);
    res.json(new_stock_purchase.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all stock purchases
app.get("/stocks", async (reg, res) => {
  try {
    const all_stocks = await pool.query("SELECT * FROM stocklist");
    res.json(all_stocks.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get a stock purchase
app.get("/stocks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await pool.query(
      "SELECT * FROM stocklist WHERE stock_id = ($1)",
      [id]
    );
    res.json(stock.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Edit a stock purchase
app.put("/stocks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { stock_label, stock_buy_price, stock_quantity, stock_buy_date } =
      req.body;

    const updated_stock = await pool.query(
      "UPDATE stocklist SET stock_label = $1, stock_buy_price = $2,stock_quantity = $3, stock_buy_date = $4 WHERE stock_id = $5 RETURNING *",
      [stock_label, stock_buy_price, stock_quantity, stock_buy_date, id]
    );

    console.log(req.body);
    res.json(updated_stock.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a stock purchase
app.delete("/stocks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_stock = await pool.query(
      "DELETE FROM stocklist WHERE stock_id = $1",
      [id]
    );
    console.log("stock deleted");
    res.json("stock deleted");
  } catch (error) {
    console.error(error.message);
  }
});

// Routes End //

// Have server listen on port 4000
app.listen("4000", () => {
  console.log("server started on port 4000");
});
