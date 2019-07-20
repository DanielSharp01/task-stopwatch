import React from "react";
import { connect } from "react-redux";
import { formatTime, getDurationParts } from "../../../../utils/timeFormat";

function TagTimeModule({ tag, time }) {
  return (
    time > 0 && (
      <div className="module">
        <div className={["tag", tag.color].join(" ")}>
          <div className="content-editable">
            <div>{tag.name}</div>
          </div>
        </div>
        {formatTime(getDurationParts(time), "HH:mm:ss")}
      </div>
    )
  );
}

const mapStateToProps = ({ days, tasks, tags }, { tag, dateString }) => {
  const now = Date.now();
  return {
    tag: tags[tag],
    time: days[dateString].loaded
      ? days[dateString].tasks
          .filter(id => !tasks[id].disabled && tasks[id].tags.find(t => t === tag))
          .reduce((acc, id) => {
            return acc + ((tasks[id].stop || now) - tasks[id].start);
          }, 0)
      : 0
  };
};

export default connect(
  mapStateToProps,
  null
)(TagTimeModule);
