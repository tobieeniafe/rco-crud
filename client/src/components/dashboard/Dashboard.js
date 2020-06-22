import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import apiEndpoint from '../../apiEndpoint';

const token = localStorage.getItem('jwtToken');

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  
  state = {
    products: [],
  };
  componentDidMount() {

    axios.get(`${apiEndpoint}/product/all`, { headers: { accessToken: token } })
      .then(response => {
          console.log(response.data);
      })
      .catch((error) => {
          console.log('error ' + error);
      });
  }

  render() {
    // const { user } = this.props.auth;
    // console.log(user);
    
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
