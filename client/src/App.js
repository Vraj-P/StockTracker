import React from "react";
import AddStock from "./components/addStock";
import ListStocks from "./components/listStocks";

function App() {
  return (
    <>
      <div className="container">
        <AddStock />
        <ListStocks />
      </div>
    </>
  );
}

export default App;
