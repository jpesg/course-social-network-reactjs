import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";

import { connect } from "react-redux";
import { getUserData } from "../../redux/actions/dataActions";

import Scream from "../components/scream/scream";
import StaticProfile from "../components/profile/StaticProfile";

import { Grid } from "@material-ui/core";

const styles = (theme) => ({
  ...theme,
});

class user extends Component {
  state = {
    profile: null,
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    this.props.getUserData(handle);

    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({ profile: res.data.user });
      })
      .catch((e) => console.log(e));
  }
  render() {
    const { screams, loading } = this.props.data;

    const screamsMarkup = loading ? (
      <p>loading data</p>
    ) : screams === null ? (
      <p>no screams from this user</p>
    ) : (
      screams.map((s) => <Scream key={s.screamId} scream={s} />)
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <p>loading profile ...</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  data: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { getUserData })(
  withStyles(styles)(user)
);
