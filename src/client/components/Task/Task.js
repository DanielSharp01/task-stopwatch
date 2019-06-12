import React from "react";
import { connect } from "react-redux";
import "./Task.scss";
import ContentEditable from "../ContentEditable/ContentEditable";

function Task({ name, start, stop, running, time, onStop, onContinue, onChange }) {
  stop = stop || time;
  return (
    <div className="task">
      <ContentEditable text={name} onChange={onChange} />
      <span className="stopwatch">{stop - start}</span>
      {running && (
        <button className="slick red" onClick={onStop}>
          <i className="fas fa-stop" />
        </button>
      )}
      {!running && (
        <button className="slick yellow" onClick={onContinue}>
          <i className="fas fa-redo" />
        </button>
      )}
    </div>
  );
}

const mapStateToProps = ({ time }) => ({
  time
});

export default connect(
  mapStateToProps,
  () => ({})
)(Task);
