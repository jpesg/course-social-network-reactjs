import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import axios from "axios";
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import Scream from "../components/scream";
import Profile from "../components/profile.js";

export class Home extends Component {
  /*state = {
    screams: null,
  };*/
  componentDidMount() {
    /*axios
      .get("/screams")
      .then((res) => {
        console.log(res.data);
        this.setState({
          screams: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });*/
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.data;

    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <p>Loading</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state.data,
});
Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { getScreams })(Home);
/*
 */
