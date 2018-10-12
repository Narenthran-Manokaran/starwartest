import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { connect } from 'react-redux';
import { getPeoples } from './../../actions'


import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.userName.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    const { userName, password } = this.state
    this.props.getPeoples(userName, password);
  }

  render() {
    const { error, errorMessage, isFetching } = this.props
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="userName" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.userName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          {error && <ControlLabel style={{ color: 'red' }}>{errorMessage}</ControlLabel>}
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm() || isFetching}
            type="submit"
          >
            {isFetching ? 'Login...' : 'Login' }
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.loginReducer,
})

const mapDispatchToProps = dispatch => ({
  getPeoples: (userName, password) => dispatch(getPeoples(userName, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
