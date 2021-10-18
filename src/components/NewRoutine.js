import { useState } from "react";
import BASE_URL from "../util";

const NewRoutine = (props) => {
  const token = props.token;
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleNewRoutine = async (e) => {
    e.preventDefault();

    const resp = await fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const info = await resp.json();
    if (info.isPublic === true) {
      props.setRoutines([info, ...props.routines]);
    }
  };

  return (
    <>
      <form onSubmit={handleNewRoutine}>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          placeholder="goal"
          value={goal}
          onChange={(e) => {
            setGoal(e.target.value);
          }}
        ></input>
        <input
          type="checkbox"
          defaultChecked={isPublic}
          onChange={() => {
            setIsPublic(!isPublic);
          }}
        ></input>
        <button>Add Routine</button>
      </form>
    </>
  );
};

export default NewRoutine;
