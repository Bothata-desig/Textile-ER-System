import React, { useState } from "react";

const UserInputForm: React.FC = () => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitted: ${input}`);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <label>
        Enter something:
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
      </label>
      <button type="submit" style={{ marginLeft: "10px" }}>Submit</button>
    </form>
  );
};

export default UserInputForm;