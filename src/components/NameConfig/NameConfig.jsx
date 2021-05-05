import "../../styles.css";
import { GamePiece } from "../";
import React, { useReducer, useState } from "react";

const score = {
  0: 1,
  1: null,
  2: 2,
  3: 2,
  4: 1,
  5: 2,
  6: null,
  7: 2,
  8: 1
};

export const NameConfig = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const formReducer = (state, event) => {
    if (event.reset) {
      return {
        name1: "Player 1",
        name2: "Player 2"
      };
    }
    return {
      ...state,
      [event.name]: event.value
    };
  };
  const [formData, setFormData] = useReducer(formReducer, {
    name1: "Player 1",
    name2: "Player 2"
  });
  const [names, setNames] = useState(formData);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setNames(formData);
      setFormData({
        reset: true
      });
      setSubmitting(false);
    }, 3000);
  };

  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value
    });
  };
  return (
    <div className="wrapper">
      <div>
        Player 1 "{names.name1}"
        <GamePiece player={1} />
        <p>vs.</p>
        Player 2 "{names.name2}"
        <GamePiece player={2} />
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={submitting}>
          <label>
            <p>Rename Player 1</p>
            <input
              name="name1"
              placeholder="Player 1"
              onChange={handleChange}
              value={formData.name1 || ""}
            />
          </label>
          <label>
            <p>Rename Player 2</p>
            <input
              name="name2"
              placeholder="Player 2"
              onChange={handleChange}
              value={formData.name2 || ""}
            />
          </label>
        </fieldset>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </form>
      {submitting && (
        <div>
          You are submitting the following:
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}>
                <strong>{name}</strong>:{value.toString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
