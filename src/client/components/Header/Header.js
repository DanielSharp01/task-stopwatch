import React from "react";
import "./Header.scss";

export default function Header({ clientName }) {
  return (
    <header>
      <h1>Task stopwatch</h1>
      <div className="right-header">
        <div className="accounts">
          Welcome {clientName}! <a href="/logout">Logout</a>
        </div>
      </div>
    </header>
  );
}
