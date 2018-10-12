import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, ListGroup, ListGroupItem } from "react-bootstrap";
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { getPlanet } from './../../actions'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount = () => {
      const { isAuthenticated } = this.props

      if (!isAuthenticated) {
        hashHistory.push('/')
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    if (event.target.value.length > 1 && this.state.search.length === 1) {
        this.props.getPlanet(event.target.value);
    }
  }

  render() {
    const { planetList, isFetching, error, errorMessage, user } = this.props
    const { search } = this.state
    return (
      <div className="Login">
        <form>
            {user && <ControlLabel>Welcome {user.name} !</ControlLabel>}
            <FormGroup controlId="search" bsSize="large">
            <ControlLabel>Search Planet</ControlLabel>
            <FormControl
                autoFocus
                type="text"
                value={this.state.search}
                onChange={this.handleChange}
            />
            </FormGroup>
            {isFetching ?
                <ControlLabel>Please wait...</ControlLabel>
            :
                <div>
                    {error ? 
                        <ControlLabel>{errorMessage}</ControlLabel>
                    :
                        <ListGroup>
                            {planetList && planetList.map((planet, i) => {
                                const planetPopulation = isNaN(planet.population) ? '0' : planet.population
                                if (planet.name.toLowerCase().match(search) && search.length > 1 ) {
                                    return <ListGroupItem key={i} style={{ fontSize: `${24 + planetPopulation.length}px`}}>{planet.name}</ListGroupItem>;
                                }
                            })}
                        </ListGroup>
                    }
                </div>
            }
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    ...state.loginReducer,
    ...state.searchReducer,
})

const mapDispatchToProps = dispatch => ({
    getPlanet: search => dispatch(getPlanet(search)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
