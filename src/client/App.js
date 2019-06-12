import React, { Component } from "react";
import "./App.scss";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  onClick = e => {
    this.setState({ clicked: true });
  };

  render() {
    return <h1 onClick={this.onClick}>{this.state.clicked ? "Clicked ohhaha" : "Server side rendering test"}</h1>;
  }
}
