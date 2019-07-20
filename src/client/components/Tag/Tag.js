import React, { Component } from "react";
import "./Tag.scss";
import ContentEditable from "../ContentEditable/ContentEditable";
import { colors } from "../../reducers/tags";

export default class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = { pickingColor: false };
    this.pickerDivRef = React.createRef();
  }

  componentDidMount() {
    if (typeof document !== "undefined") document.addEventListener("mousedown", this.onDocumentClick, false);
  }

  componentWillUnmount() {
    if (typeof document !== "undefined") document.removeEventListener("mousedown", this.onDocumentClick, false);
  }

  onDocumentClick = e => {
    if (this.pickerDivRef.current && this.pickerDivRef.current.contains(e.target)) {
      return;
    }

    this.onCancel();
  };

  rightClicked = e => {
    e.preventDefault();
    this.setState({ pickingColor: true });
  };

  onCancel() {
    this.setState({ pickingColor: false });
  }

  pickColor(color) {
    this.props.onChangeColor(color);
  }

  render() {
    return (
      <div key={this.props.name} className={["tag", this.props.color].join(" ")} onContextMenu={this.rightClicked}>
        <ContentEditable text={this.props.name} placeholder={"Tag name"} onChange={value => this.props.onChange(value)} />
        {this.state.pickingColor && (
          <div className="color-picker" ref={this.pickerDivRef}>
            {colors.map(color => (
              <div key={color} className={["item", color, this.props.color === color ? "active" : ""].join(" ")} onClick={() => this.pickColor(color)} />
            ))}
          </div>
        )}
      </div>
    );
  }
}
