import React, { Component } from "react";
import { connect } from "react-redux";
import { userInfo } from "../redux/actions/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "aa",
      password: "b",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleInput = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    this.props.loginDispacth(this.state);
  };

  render() {
    return (
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full space-y-8 text-xl bg-zinc-600 outline ">
          <div className="mt-10">
            <h2>Sign In Your Account</h2>
          </div>
          <form>
            <div className="mt-6 ">
              <label className="block" id="Email">
                Email
              </label>
              <input
                className="outline focus:ring focus:ring-blue-300 hover:outline-none rounded-md"
                htmlFor="Email"
                name="email"
                placeholder="Write your email"
                onChange={this.handleChange}
              ></input>
            </div>
            {this.state.email}
            {this.state.password}
            <div className="mt-6">
              <label className="block" id="Password">
                Password
              </label>

              <input
                className="outline focus:ring focus:ring-pink-500 hover:outline-none rounded-md"
                htmlFor="Password"
                name="password"
                placeholder="Write your password"
                onChange={this.handleChange}
              ></input>
            </div>
            <button
              type="submit"
              className="outline mt-6 rounded-xl"
              onClick={this.handleInput}
            >
              Login
            </button>
          </form>
        </div>
        {this.props.ad1.name}
        {this.props.ad1.password}
      </div>
    );
  }
}

export default connect(
  (state) => {
    return { ad1: state.user };
  },
  (dispatch) => {
    return { loginDispacth: (value) => dispatch(userInfo(value)) };
  }
)(Login);
