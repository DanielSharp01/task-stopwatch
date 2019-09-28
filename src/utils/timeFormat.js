export function getTimeParts(timestamp) {
  let date = typeof timestamp === "object" ? timestamp : new Date(timestamp);
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    millisecond: date.getMilliseconds()
  };
}

export function getDateParts(timestamp) {
  let date = typeof timestamp === "object" ? timestamp : new Date(timestamp);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate()
  };
}

export function getDateTimeParts(timestamp) {
  let date = typeof timestamp === "object" ? timestamp : new Date(timestamp);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    millisecond: date.getMilliseconds()
  };
}

export function getDurationParts(millisecond) {
  let hour = Math.floor(millisecond / (1000 * 60 * 60));
  millisecond -= hour * (1000 * 60 * 60);
  let minute = Math.floor(millisecond / (1000 * 60));
  millisecond -= minute * (1000 * 60);
  let second = Math.floor(millisecond / 1000);
  millisecond -= second * 1000;

  return {
    hour,
    minute,
    second,
    millisecond
  };
}

function tokenizeFormatString(format) {
  let tokens = [];
  let currentToken = null;

  function pushCurrentToken() {
    if (!currentToken) return;
    tokens.push(currentToken);
    currentToken = null;
  }

  let tokenTypes = { Y: true, M: true, D: true, H: true, h: true, m: true, s: true, S: true, a: false };
  for (let i = 0; i < format.length; i++) {
    if (format[i] === "\\") {
      if (currentToken && currentToken.type === "escape") currentToken = { type: "text", text: "\\" };
      else {
        pushCurrentToken();
        currentToken = { type: "escape" };
      }
    } else if (format[i] === "[") {
      if (currentToken && currentToken.type === "escape") {
        currentToken = { type: "text", text: format[i] };
      } else {
        pushCurrentToken();
        let index = format.substring(i).search(/(?<!\\)\]/) + i;
        tokens.push({ type: "optional", children: tokenizeFormatString(format.substring(i + 1, index)) });
        i = index;
      }
    } else if (typeof tokenTypes[format[i]] !== "undefined") {
      if (currentToken && currentToken.type === "escape") {
        currentToken = { type: "text", text: format[i] };
      } else {
        if (currentToken && currentToken.type === format[i]) {
          currentToken.count++;
        } else {
          pushCurrentToken();
          if (tokenTypes[format[i]]) currentToken = { type: format[i], count: 1 };
          else tokens.push({ type: format[i] });
        }
      }
    } else {
      if (currentToken && currentToken.type === "text") {
        currentToken.text += format[i];
      } else {
        pushCurrentToken();
        currentToken = { type: "text", text: format[i] };
      }
    }
  }

  pushCurrentToken();
  return tokens;
}

export function formatTime({ year, month, date, hour, minute, second, millisecond }, format) {
  let tokens = tokenizeFormatString(format);

  function formatTimeTokens({ year, month, date, hour, minute, second, millisecond }, tokens) {
    let timeString = "";
    let nonZeroNonConstant = false;

    year = year || 0;
    month = month || 0;
    date = date || 0;
    hour = hour || 0;
    minute = minute || 0;
    second = second || 0;
    millisecond = millisecond || 0;

    let tokenTypes = {
      Y: { value: year, chopOff: true },
      M: month,
      D: date,
      H: hour,
      h: hour % 12 || 12,
      m: minute,
      s: second,
      S: { value: millisecond, chopOff: true },
      a: Math.floor(hour / 12) ? "PM" : "AM"
    };

    for (let token of tokens) {
      let type = tokenTypes[token.type];
      if (token.type === "optional") {
        let { timeString: str, nonZeroNonConstant } = formatTimeTokens({ year, month, date, hour, minute, second, millisecond }, token.children);
        if (nonZeroNonConstant) {
          timeString += str;
          nonZeroNonConstant = true;
        }
      } else if (typeof type !== "undefined") {
        let string = typeof type === "object" ? type.value.toString() : type.toString();

        if (token.count) {
          let chopOff = (typeof type === "object" && type.chopOff) || false;

          if (chopOff && string.length > token.count) {
            string = string.substring(0, token.count);
          }
          if (string.length < token.count) {
            string = string.padStart(token.count, "0");
          }

          if (/[^0]/.test(string)) {
            nonZeroNonConstant = true;
          }
        }
        timeString += string;
      } else {
        timeString += token.text;
      }
    }
    return { timeString, nonZeroNonConstant };
  }

  return formatTimeTokens({ year, month, date, hour, minute, second, millisecond }, tokens).timeString;
}

export function yyyymmdd(string) {
  const spl = string.split("-");
  let year, month, date;
  if (spl.length > 0) year = parseInt(spl[0]);
  if (spl.length > 1) month = parseInt(spl[1]);
  if (spl.length > 2) date = parseInt(spl[2]);
  return { year, month, date };
}

export function packDate(dateParts) {
  const { year, month, date, hour, minute, second, millisecond } = dateParts;
  return new Date(year || 1900, month ? month - 1 : 0, date || 1, hour || 0, minute || 0, second || 0, millisecond || 0);
}
