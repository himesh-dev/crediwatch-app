import React from "react";
import { Bubble } from "react-chartjs-2";
import { connect } from "react-redux";
import randomColor from "randomcolor";
import Color from "color";

import "./chart.css";

const Chart = props => {
  const { data } = props;
  const dataSets =
    data.length > 1
      ? data.map(item => {
          let color = randomColor();
          let bgColor = Color(color).alpha(0.6);

          let obj = {
            label: item.code,
            backgroundColor: `rgba(${bgColor.color[0]},${bgColor.color[1]},${bgColor.color[2]},${bgColor.valpha})`,
            borderColor: color,
            data: [
              {
                x: item.won,
                y: item.lost,
                r: item.totalGoalFor 
              }
            ]
          };
          return obj;
        })
      : null;

  return (
    <div className="chart-container">
      <Bubble
        width={700}
        height={500}
        data={{
          datasets: dataSets
        }}
        options={{
          title: {
            display: true,
            text: "English Premier League 2011/12",
            fontSize: 25
          },
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }}
        legend={{
          display: true,
          position: "right"
        }}
        layout={{
          padding: {
            right: 50
          }
        }}
      />
    </div>
  );
};
const mapStateToProps = (state, props) => {
  return {
    data: state.reducer.data
  };
};
export default connect(mapStateToProps)(Chart);
