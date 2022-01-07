import React, { useState } from "react";

export default function TextForm(props) {
  const HandleUpClick = () => {
    let newtext = text.toUpperCase();
    setText(newtext);
    props.showAlert("Converted to uppercase", "success");
  };

  const HandleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };
  const handleOnChange = (event) => {
    setText(event.target.value); // it will add new value with previous textarea value
  };
  const ClearText = () => {
    let newText = "";
    setText(newText);
  };
  const CopyText = () => {
    let text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    document.getSelection().removeAllRanges();
    props.showAlert("Copied to clipboard!", "success");
  };
  const RemoveExtraSpace = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
  };

  const [text, setText] = useState("");
  //text= "new text"; //wrong way to change the state
  //setText("new text"); // correct way to change the text
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1 style={{ fontSize: "35px" }}>{props.heading}</h1>
        <div>
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "#13466e" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={HandleUpClick}
        >
          Convert to uppercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={HandleLowClick}
        >
          convert to lowercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={ClearText}
        >
          Clear
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={CopyText}
        >
          CopyText
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary"
          onClick={RemoveExtraSpace}
        >
          Remove Extra Space
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>Your text summary</h1>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }
          {/* words and {text.length} characters*/}
          words and {text.length !== 0}character
        </p>
        <p>{0.008 * text.split(" ").length}minutes read</p>
        <h2>preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview"}</p>
      </div>
    </>
  );
}
