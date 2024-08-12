import React from "react";
import ChartComponent from "./ChartComponent"; 
import ChartComponentPro from "./ChartComponentPro";
import './Overview.css'
const Overview = () => {
 

  return (
    <div>
     <div className="container"></div>
     
      <div className="card">
                <h2>Top Selling Product</h2>
                <div> <ChartComponent /></div>
            </div>
            <div className="card">
                <ChartComponentPro/>
            </div>
    </div>
  );
};

export default Overview;