import React, { Component } from "react";
import { connect } from "react-redux";
import "./Task.scss";
import ContentEditable from "../ContentEditable/ContentEditable";
import { newTagsAddTag, newTagsChangeTagName, changeTagColor } from "../../actions/tags";
import { randomColor } from "../../reducers/tags";
import Tag from "../Tag/Tag";

class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = { newTask: "", newTag: false };
  }

  onKeyboard = e => {
    if (e.key === "Enter" && this.state.newTask.trim().length > 0) {
      this.onStart();
    } else if (e.key === "Escape") {
      this.setState({ newTask: "" });
    }
  };

  onStart = () => {
    this.props.onStart(this.state.newTask, this.props.tags.map(tag => tag.name));
    this.setState({ newTask: "" });
  };

  onInputChange = e => {
    this.setState({ newTask: e.target.value });
  };

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
    return (
      <div className="task-container">
        <div className="task new-task">
          <input onKeyDown={this.onKeyboard} onChange={this.onInputChange} value={this.state.newTask} type="text" placeholder="New task" />
          <button className="slick green" onClick={this.onStart} disabled={this.state.newTask.trim().length === 0}>
            <i className="fas fa-play" />
          </button>
        </div>

        {this.props.tags.map(tag => (
          <Tag
            key={tag.name}
            {...tag}
            onChange={value => this.props.onChangeTag(tag.name, value)}
            onChangeColor={color => this.props.onChangeTagColor(tag.name, color)}
          />
        ))}
        {this.state.newTag && (
          <div className={["tag", this.state.newTagColor].join(" ")}>
            <ContentEditable
              text={""}
              placeholder="Tag name"
              startEditing={true}
              onChange={this.onNewTagApply}
              onCancel={this.onNewTagCancel}
            />
          </div>
        )}
        <button className="slick add-tag" onClick={this.onClickAddTag}>
          <i className="fas fa-plus-circle" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ newTags, tags }) => ({
  tags: newTags.map(tag => ({ name: tag, color: tags[tag].color }))
});

const mapDispatchToProps = dispatch => ({
  onAddTag: (name, color, tags) => dispatch(newTagsAddTag(name, color)),
  onChangeTag: (name, nextName) => dispatch(newTagsChangeTagName(name, nextName)),
  onChangeTagColor: (name, color) => dispatch(changeTagColor(name, color))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTask);
