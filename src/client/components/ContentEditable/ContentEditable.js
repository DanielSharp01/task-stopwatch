import React, { Component } from "react";
import "./ContentEditable.scss";

export default class ContentEditable extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: this.props.startEditing ? true : false, editedText: this.props.text, requestedFocus: true };
    this.divRef = React.createRef();
    this.inputRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.inputRef.current && this.state.requestedFocus) {
      this.setState({ requestedFocus: false });
      this.inputRef.current.focus();
      this.inputRef.current.select();
    }
  }

  componentDidMount() {
    if (typeof document !== "undefined") document.addEventListener("mousedown", this.onDocumentClick, false);

    if (this.inputRef.current && this.state.requestedFocus) {
      this.setState({ requestedFocus: false });
      this.inputRef.current.focus();
      this.inputRef.current.select();
    }
  }

  componentWillUnmount() {
    if (typeof document !== "undefined") document.removeEventListener("mousedown", this.onDocumentClick, false);
  }

  onDocumentClick = e => {
    if (this.divRef.current.contains(e.target)) {
      return;
    }

    this.onCancel();
  };

  onStartEditing = () => {
    this.setState({ editing: true, editedText: this.props.text, requestedFocus: true });
  };

  onInputChanged = e => {
    this.setState({ editedText: e.target.value });
  };

  onApply = () => {
    this.setState({ editing: false });
    this.props.onChange && this.props.onChange(this.state.editedText);
  };

  onCancel = () => {
    this.setState({ editing: false });
    if (this.props.onCancel) this.props.onCancel();
  };

  onKeyboard = e => {
    if (e.key === "Enter") {
      this.onApply();
    } else if (e.key === "Escape") {
      this.onCancel();
    }
  };

  render() {
    return (
      <div className="content-editable" onKeyDown={this.onKeyboard} ref={this.divRef}>
        {!this.state.editing ? (
          <div onDoubleClick={this.onStartEditing}>{this.props.text}</div>
        ) : (
          <React.Fragment>
            <input
              ref={this.inputRef}
              size={this.state.editedText.length || (this.props.placeholder && this.props.placeholder.length)}
              type="text"
              onChange={this.onInputChanged}
              value={this.state.editedText}
              placeholder={this.props.placeholder}
            />
            <button onClick={this.onApply} className="slick green">
              <i className="fas fa-check" />
            </button>
            <button onClick={this.onCancel} className="slick red">
              <i className="fas fa-times" />
            </button>
          </React.Fragment>
        )}
      </div>
    );
  }
}
