import React, { useState } from "react";

const AddStock = () => {
  const [stockLabel, setStockLabel] = useState("");
  const [stockBuyPrice, setStockBuyPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const today = new Date();
      const body = {
        stock_label: stockLabel,
        stock_buy_price: stockBuyPrice,
        stock_quantity: stockQuantity,
        stock_buy_date:
          today.getMonth() +
          1 +
          ":" +
          today.getDate() +
          ":" +
          today.getFullYear(),
      };
      console.log(body);

      await fetch("http://localhost:4000/stocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Stock List</h1>
      <form className="d-flex mt-5" onSubmit={handleOnSubmit}>
        <input
          className="form-control"
          type="text"
          placeholder="Stock Label"
          value={stockLabel}
          onChange={(e) => setStockLabel(e.target.value)}
        ></input>
        <input
          className="form-control"
          type="text"
          placeholder="Price"
          value={stockBuyPrice}
          onChange={(e) => setStockBuyPrice(e.target.value)}
        ></input>
        <input
          className="form-control"
          type="text"
          placeholder="Quantity"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
        ></input>
        <button className="btn btn-success">add</button>
      </form>
    </>
  );
};

export default AddStock;
