import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
function toCamelCase(str) {
  str = str.replace("-", " ");
  return str
    .replace(/\s(.)/g, function ($1) {
      return $1.toUpperCase();
    })
    .replace(/\s/g, "")
    .replace(/^(.)/, function ($1) {
      return $1.toLowerCase();
    });
}
function toTitleCase(str) {
  return str
    .replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
    .replace(" ", "");
}
function recursion(obj) {
  let return_str = "<";
  return_str += toTitleCase(obj.name) + " ";
  if (obj.style !== undefined && Object.keys(obj.style).length > 0) {
    var sTypeKeys = Object.keys(obj.style);
    return_str += "style={{";
    for (var i = 0; i < sTypeKeys.length; i++) {
      return_str +=
        toCamelCase(sTypeKeys[i]) + ':"' + obj.style[sTypeKeys[i]] + '",';
    }
    return_str = return_str.substr(0, return_str.length - 1) + "}}";
  }

  if (obj.children !== undefined && obj.children.length > 0) {
    return_str += ">\n";
    for (var i = 0; i < obj.children.length; i++) {
      return_str += recursion(obj.children[i]);
    }
    return_str += "</" + toTitleCase(obj.name) + ">";
  } else {
    return_str += "/>";
  }
  return return_str;
}

function generateCodeFromObject(obj) {
  //return a code generated string
  return recursion(obj);
}

module.exports = generateCodeFromObject;

// ReactDOM.render(<App />, document.getElementById("root"));
