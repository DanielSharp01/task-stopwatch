import React, { Component } from "react";
import { connect } from "react-redux";
import "./Task.scss";
import ContentEditable from "../ContentEditable/ContentEditable";
import { getTimeParts, getDurationParts, formatTime } from "../../utils/timeFormat";

class Task extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.stop) {
      this.handle = requestAnimationFrame(this.rerender);
    }
  }

  rerender = () => {
    this.forceUpdate();
    requestAnimationFrame(this.rerender);
  };

  componentWillUpdate(nextProps, nextState) {
    if (this.handle && nextProps.stop) {
      cancelAnimationFrame(this.handle);
    }
  }

  componentWillMount() {
    if (this.handle) {
      cancelAnimationFrame(this.handle);
    }
  }

  render() {
    let { name, start, stop, onStop, onContinue, onChange } = this.props;
    stop = stop || Date.now();
    return (
      <div className="task">
        <ContentEditable text={name} onChange={onChange} />
        <div className="times">
          <span>{formatTime(getTimeParts(start), "HH:mm:ss")}</span>
          <i className="vertical-line fas fa-arrows-alt-h" />
          <span>{formatTime(getTimeParts(stop), "HH:mm:ss")}</span>
        </div>
        <span className="stopwatch">{formatTime(getDurationParts(stop - start), "[HH:]mm:ss")}</span>
        {!this.props.stop ? (
          <button className="slick red" onClick={onStop}>
            <i className="fas fa-stop" />
          </button>
        ) : (
          <button className="slick yellow" onClick={onContinue}>
            <i className="fas fa-redo" />
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ time }) => ({
  time
});

export default connect(
  mapStateToProps,
  () => ({})
)(Task);
