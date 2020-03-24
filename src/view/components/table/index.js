import React from "react";
import "./table.css";
import { connect } from "react-redux";

const tableHead = [
  "Teams",
  "Total Matches",
  "Won",
  "Lost",
  "Tie",
  "Total Goals Scored For",
  "Total Goals Scored Against"
];
const Table = props => {
  const { tableData } = props;
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {tableHead.map(item => {
              return <th key={item}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {tableData.length > 1
            ? tableData.map(row => {
                const {
                  code,
                  totalMatches,
                  won,
                  lost,
                  tie,
                  totalGoalFor,
                  totalGoalAgainst
                } = row;
                return (
                  <tr key={code}>
                    <td>{code}</td>
                    <td>{totalMatches}</td>
                    <td>{won}</td>
                    <td>{lost}</td>
                    <td>{tie}</td>
                    <td>{totalGoalFor}</td>
                    <td>{totalGoalAgainst}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};
const mapStateToProps = (state, props) => {
  return {
    tableData: state.reducer.data
  };
};
export default connect(mapStateToProps)(Table);
