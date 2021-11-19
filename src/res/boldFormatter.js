import React from "react";

const boldRegex = /\*\*([\s\S]*?)\*\*/g;

const boldFormatter = (str) =>
  // Every pair element is a bold element.
  str
    .split(boldRegex)
    .map((part, index) =>
      index % 2 ? <strong key={part + index}>{part}</strong> : part
    );

export default boldFormatter;
