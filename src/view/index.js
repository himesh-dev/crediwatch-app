import React from "react";
import Table from "./components/table";
import Chart from "./components/chart";
import "./view.css";
const View = () => {
  return (
    <div className="container">
      <Chart />
      <Table />
    </div>
  );
};

export default View;
