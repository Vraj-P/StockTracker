import React from "react";
import { useState } from "react";

const EditStocks = ({ stock }) => {
  const [stockLabel, setStockLabel] = useState(stock.stock_label);
  const [stockBuyPrice, setStockBuyPrice] = useState(stock.stock_buy_price);
  const [stockQuantity, setStockQuantity] = useState(stock.stock_quantity);

  const editStock = async (e, id) => {
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
      await fetch(`http://localhost:4000/stocks/${id}`, {
        method: "PUT",
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
      {/* Button to Open the Modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${stock.stock_id}`}
      >
        Edit
      </button>

      {/* The Modal */}
      <div className="modal" id={`id${stock.stock_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">Edit Stock</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* Modal body */}
            <div className="modal-body">
              <form className="d-flex mt-5">
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
              </form>
            </div>

            {/* Modal footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={(e) => {
                  editStock(e, stock.stock_id);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditStocks;
