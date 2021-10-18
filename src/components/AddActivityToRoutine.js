import { useState } from "react";
import BASE_URL from "../util";

const AddActivityToRoutine = (props) => {
  const routineId = props.routineId;
  const token = props.token;
  const [activityId, setActivityId] = useState();
  const [count, setCount] = useState();
  const [duration, setDuration] = useState();

  const handleAddActivity = async (e) => {
    e.preventDefault();

    const resp = await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        activityId,
        count,
        duration,
      }),
    });

    const info = await resp.json();
    props.getMyRoutines(info);
  };
  return (
    <form onSubmit={handleAddActivity}>
      <input
        placeholder="Activity ID"
        value={activityId}
        onChange={(e) => {
          setActivityId(e.target.value);
        }}
      ></input>
      <input
        placeholder="Count"
        value={count}
        onChange={(e) => {
          setCount(e.target.value);
        }}
      ></input>
      <input
        placeholder="Duration"
        value={duration}
        onChange={(e) => {
          setDuration(e.target.value);
        }}
      ></input>
      <button>Add Activity</button>
    </form>
  );
};

export default AddActivityToRoutine;
