import React from "react";
import "./Task.scss";

export default function NewTask() {
  return (
    <div className="task new-task">
      <input type="text" placeholder="New task" />
      <button className="slick green">
        <i className="fas fa-play" />
      </button>
    </div>
  );
}
