import React from "react";
import { useEffect, useState } from "react";
import EditStocks from "./editStock";

const ListStocks = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    getStocks();
  }, []);

  const getStocks = async () => {
    try {
      const jsonData = await (
        await fetch("http://localhost:4000/stocks")
      ).json();
      setStocks(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteStock = async (id) => {
    try {
      await fetch(`http://localhost:4000/stocks/${id}`, {
        method: "DELETE",
      });

      setStocks(stocks.filter((stock) => stock.stock_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div class="row justify-content-center">
        {stocks.map((stock) => (
          <div className="card w-25 mt-3 ml-3 mr-3" id={stock.stock_id}>
            <div className="card-body">
              <h5 className="card-title">{stock.stock_label}</h5>
              <p className="card-text">{stock.stock_buy_price}</p>
              <p className="card-text">{stock.stock_quantity}</p>
              <p className="card-text">{stock.stock_buy_date}</p>
              <EditStocks stock={stock} />
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteStock(stock.stock_id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListStocks;
