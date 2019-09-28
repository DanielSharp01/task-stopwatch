import React from "react";
import { connect } from "react-redux";
import { formatTime, getDurationParts } from "../../../../utils/timeFormat";

class TagTimeModule extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.stopped);
    if (!this.props.stopped) {
      this.handle = requestAnimationFrame(this.rerender);
    }
  }

  rerender = () => {
    this.forceUpdate();
    requestAnimationFrame(this.rerender);
  };

  componentDidUpdate(nextProps, nextState) {
    if (this.handle && nextProps.stopped) {
      cancelAnimationFrame(this.handle);
    }
  }

  componentWillUnmount() {
    if (this.handle) {
      cancelAnimationFrame(this.handle);
    }
  }

  render() {
    const now = Date.now();
    const { tag, taskTimes } = this.props;
    let time = taskTimes.reduce((acc, task) => {
      return acc + ((task.stop || now) - task.start);
    }, 0);
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
}

const mapStateToProps = ({ days, tasks, tags }, { tag, dateString }) => {
  const now = Date.now();
  return {
    tag: tags[tag],
    taskTimes: days[dateString].loaded
      ? days[dateString].tasks
          .filter(id => !tasks[id].disabled && tasks[id].tags.find(t => t === tag))
          .map(id => ({ start: tasks[id].start, stop: tasks[id].stop }))
      : [],
    stopped: days[dateString].loaded ? days[dateString].tasks.filter(id => !tasks[id].stop).length === 0 : true
  };
};

export default connect(
  mapStateToProps,
  null
)(TagTimeModule);
