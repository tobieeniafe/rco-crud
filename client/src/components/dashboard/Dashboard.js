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

    axios.get(`${apiEndpoint}/product/all`, { headers: { "access_token": token } })
      .then(response => {
          console.log(response.data);
          const products = response.data.products;
          this.setState({ products });
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
        <div className="row">
            { this.state.products.map((product, i) => 
              <div className="col s4 center-align"  key={i}>
                {product.name}
                <img src={product.image}/>
                {product.price}
              </div>)}
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
