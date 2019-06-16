import React from "react";
import { connect } from "react-redux";
import "./Header.scss";

function Header({ username }) {
  return (
    <header>
      <h1>Task stopwatch</h1>
      <div className="right-header">
        <div className="accounts">
          Welcome {username}! <a href="/logout">Logout</a>
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = ({ username }) => ({
  username
});

export default connect(
  mapStateToProps,
  () => ({})
)(Header);
