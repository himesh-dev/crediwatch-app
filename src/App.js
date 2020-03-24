import React, { useEffect } from "react";
import Loader from "./components/Loader";
import "./App.css";
import * as actions from "./utils/actions";
import View from "./view";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    props.fetchData();
  }, []);
  if (props.state) {
    return <Loader loading={true} />;
  } else {
    return (
      <div className="App">
        <View />
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    state: state.reducer.loading
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchData: () => dispatch(actions.fetchData())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
