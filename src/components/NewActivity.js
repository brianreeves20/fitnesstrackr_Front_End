import { useState } from "react";
import BASE_URL from "../util";

const NewActivity = (props) => {
  const token = props.token;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleNewActivity = async (e) => {
    e.preventDefault();

    const resp = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    const info = await resp.json();

    props.setActivities([info, ...props.activities]);
  };
  return (
    <>
      <form onSubmit={handleNewActivity}>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <button>Add Activity</button>
      </form>
    </>
  );
};

export default NewActivity;
