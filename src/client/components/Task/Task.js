import React, { Component } from "react";
import { connect } from "react-redux";
import "./Task.scss";
import ContentEditable from "../ContentEditable/ContentEditable";
import { getTimeParts, getDurationParts, formatTime } from "../../../utils/timeFormat";
import { randomColor } from "../../reducers/tags";
import Tag from "../Tag/Tag";
import { changeTagColor } from "../../actions/tags";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = { newTag: false };
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

  componentDidUpdate(nextProps, nextState) {
    if (this.handle && nextProps.stop) {
      cancelAnimationFrame(this.handle);
    }
  }

  componentWillUnmount() {
    if (this.handle) {
      cancelAnimationFrame(this.handle);
    }
  }

  onClickAddTag = () => {
    this.setState({ newTag: true, newTagColor: randomColor() });
  };

  onNewTagApply = value => {
    this.setState({ newTag: false });
    if (value.trim().length === 0) return;
    this.props.onAddTag(value, this.state.newTagColor);
  };

  onNewTagCancel = value => {
    this.setState({ newTag: false });
  };

  render() {
    let { tags, name, start, stop, saved, onStop, onContinue, onChange, readOnly } = this.props;
    stop = stop || Date.now();
    return (
      <div className="task-container">
        <div className="task">
          <ContentEditable text={name} disabled={!saved} validate={str => str.trim().length > 0} onChange={onChange} placeholder="Task name" />
          <div className="times">
            <span>{formatTime(getTimeParts(start), "HH:mm:ss")}</span>
            <i className="vertical-line fas fa-arrows-alt-h" />
            <span>{formatTime(getTimeParts(stop), "HH:mm:ss")}</span>
          </div>
          <span className="stopwatch">{formatTime(getDurationParts(stop - start), "[HH:]mm:ss")}</span>
          {!readOnly && !this.props.stop ? (
            <button className="slick red" disabled={!saved} onClick={onStop}>
              <i className="fas fa-stop" />
            </button>
          ) : (
            <button className="slick yellow" disabled={!saved || readOnly} onClick={onContinue}>
              <i className="fas fa-redo" />
            </button>
          )}
        </div>
        {tags.map(tag => (
          <Tag
            key={tag.name}
            {...tag}
            onChange={value => this.props.onChangeTag(tag.name, value)}
            onChangeColor={color => this.props.changeTagColor(tag.name, color)}
          />
        ))}
        {this.state.newTag && (
          <div className={["tag", this.state.newTagColor].join(" ")}>
            <ContentEditable text={""} placeholder="Tag name" startEditing={true} onChange={this.onNewTagApply} onCancel={this.onNewTagCancel} />
          </div>
        )}
        <button className="slick add-tag" disabled={!saved} onClick={this.onClickAddTag}>
          <i className="fas fa-plus-circle" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ tags }, ownProps) => ({
  tags: ownProps.tags.map(tag => ({ name: tag, color: tags[tag].color }))
});

const mapDispatchToProps = dispatch => ({
  changeTagColor: (name, color) => dispatch(changeTagColor(name, color))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
