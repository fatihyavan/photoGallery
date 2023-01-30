import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userInfo } from "../redux/actions/actions";
import axios from "axios";
import GoogleLogin from "react-google-login";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repassword: "",
      emailError: "",
      passwordError: "",
      message: "",
      token: "",
      errorCheck: "register",
    };
  }
  handleRegisterGoogle = (tokenId) => {
    console.log("deneme");
    axios
      .post("/auth/google", { idToken: tokenId })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  responseFromGoogle = (response) => {
    console.log(response);
    this.handleRegisterGoogle(response.tokenId);
  };
  failure = (res) => {
    console.log(res);
    console.log("yanlis hocam");
  };
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
  validate = () => {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!this.state.email || !regex.test(this.state.email)) {
      this.setState({ emailError: "Email is not valid" });
    }
    if (!this.state.password || this.state.password !== this.state.repassword) {
      this.setState({ passwordError: "Repassword is not same" });
    }
    return (
      !this.state.email ||
      !regex.test(this.state.email) ||
      !this.state.password ||
      this.state.password !== this.state.repassword
    );
  };
  register = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    this.props.register(this.state);
    const result = this.validate();
    if (!result) {
      await axios
        .post("/register", { email, password })
        .then((res) => {
          console.log(res.data);
          this.setState({ message: res.data });
          this.setState({ token: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (
      !this.state.emailError &&
      !this.state.passwordError &&
      !this.state.message
    ) {
      this.setState({ errorCheck: "login" });
    }
    setTimeout(() => {
      this.setState({ emailError: "", passwordError: "", message: "" });
    }, 1000);
  };
  render() {
    return (
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full space-y-8 text-xl bg-zinc-600 outline ">
          <div className="mt-10">
            <h2>Register</h2>
            {this.state.message}
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
              {this.state.emailError}
            </div>
            <div className="mt-6">
              <label className="block" id="Password">
                Password
              </label>
              <input
                className="outline focus:ring focus:ring-pink-500 hover:outline-none rounded-md"
                name="password"
                htmlFor="Password"
                placeholder="Write your password"
                onChange={this.handleChange}
              ></input>
              {this.state.passwordError}
              {this.state.email}
            </div>
            <div className="mt-6">
              <label className="block" id="Password">
                Re-Password
              </label>
              <input
                className="outline focus:ring focus:ring-pink-500 hover:outline-none rounded-md"
                name="repassword"
                htmlFor="Password"
                placeholder="Write your password again"
                onChange={this.handleChange}
              ></input>
              {this.state.repassword}
              {this.state.password}
            </div>
            <div>
              <button
                type="submit"
                className="outline mt-6 rounded-xl p-1"
                onClick={this.register}
              >
                <Link to={`/${this.state.errorCheck}`}>Register</Link>
              </button>
            </div>
            <div>
              <GoogleLogin
                clientId={
                  "781844016670-30qo0rpf9a6oesnpsqpeqir7ogr9d5l7.apps.googleusercontent.com"
                }
                buttonText="Log in with Google"
                onSuccess={this.responseFromGoogle}
                onFailure={this.failure}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => {
    console.log("INıtial state");
    console.log(state);
    return { ad: state.user };
  },
  (dispatch) => {
    return {
      register: (content) => dispatch(userInfo(content)),
    };
  }
)(Register);
