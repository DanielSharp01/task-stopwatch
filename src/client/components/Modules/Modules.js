import React from "react";
import { connect } from "react-redux";
import TagTimeModule from "./TagTimeModule/TagTimeModule";
import "./Modules.scss";

function Modules({ dateString, tags }) {
  return (
    <div className="modules">
      {tags.map(tag => (
        <TagTimeModule tag={tag} dateString={dateString} />
      ))}
    </div>
  );
}

const mapStateToProps = ({ tags }) => ({
  tags: Object.keys(tags)
});

export default connect(
  mapStateToProps,
  null
)(Modules);
