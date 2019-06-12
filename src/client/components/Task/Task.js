import React from "react";
import "./Task.scss";
import ContentEditable from "../ContentEditable/ContentEditable";

export default function Task({ text, stopped }) {
  return (
    <div className="task">
      <ContentEditable text={text} onChange={console.log} />
      {!stopped && (
        <button className="slick red">
          <i className="fas fa-stop" />
        </button>
      )}
      {stopped && (
        <button className="slick yellow">
          <i className="fas fa-redo" />
        </button>
      )}
    </div>
  );
}
