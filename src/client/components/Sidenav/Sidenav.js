import React from "react";
import { connect } from "react-redux";
import "./Sidenav.scss";
import { NavLink } from "react-router-dom";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function Sidenav(props) {
  const { days } = props;
  let months = days.reduce((acc, day) => {
    if (acc.length === 0 || acc[0].month !== day.month || acc[0].year !== day.year) {
      acc.unshift({ year: day.year, month: day.month, days: [{ number: day.day, str: day.str }] });
    } else {
      acc[0].days.unshift({ number: day.day, str: day.str });
    }
    return acc;
  }, []);
  let today = new Date();
  return (
    <div className="sidenav">
      <div className="scroll-area">
        {months.map((month, i) => (
          <React.Fragment key={month.year + "-" + month.month}>
            <h2 className="month">
              {month.year} {monthNames[month.month - 1]}
            </h2>
            <div className="days">
              {month.days.map(day => {
                let isToday = month.year === today.getFullYear() && month.month === today.getMonth() + 1 && day.number === today.getDate();
                return (
                  <p key={day.number}>
                    <NavLink activeClassName="active" to={`/${!isToday ? day.str : ""}`} exact={isToday}>
                      {day.number}
                      <sup>
                        {Math.floor(day.number / 10) === 1
                          ? "th"
                          : day.number % 10 === 1
                            ? "st"
                            : day.number % 10 === 2
                              ? "nd"
                              : day.number % 10 === 3
                                ? "rd"
                                : "th"}
                      </sup>{" "}
                      {isToday && " (Today)"}
                    </NavLink>
                  </p>
                );
              })}
            </div>
            {i < months.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = ({ days }) => ({
  days: Object.keys(days)
    .sort()
    .map(str => {
      let spl = str.split("-").map(spl => parseInt(spl));
      return { year: spl[0], month: spl[1], day: spl[2], str };
    })
});

export default connect(
  mapStateToProps,
  () => ({})
)(Sidenav);
