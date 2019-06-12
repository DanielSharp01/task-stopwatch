import React, { Component } from "react";
import "./Task.scss";

export default class NewTask extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  onKeyboard = e => {
    if (e.key === "Enter") {
      this.onStart();
    } else if (e.key === "Escape") {
      this.inputRef.current.value = "";
    }
  };

  onStart = () => {
    this.props.onStart(this.inputRef.current.value);
    this.inputRef.current.value = "";
  };

  render() {
    return (
      <div className="task new-task">
        <input ref={this.inputRef} onKeyDown={this.onKeyboard} type="text" placeholder="New task" />
        <button className="slick green" onClick={this.onStart}>
          <i className="fas fa-play" />
        </button>
      </div>
    );
  }
}
