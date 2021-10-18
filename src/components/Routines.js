import { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import BASE_URL from "../util";
import NewRoutine from "./NewRoutine";
import "./Routines.css";

const Routines = (props) => {
  const [routines, setRoutines] = useState([]);

  const fetchRoutines = async () => {
    await fetch(`${BASE_URL}/routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setRoutines(result);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  return (
    <div className="routines">
      {props.user && (
        <>
          <Link to="/routines/new">Add Routine</Link>
          <Route path="/routines/new">
            <NewRoutine
              token={props.user.token}
              setRoutines={setRoutines}
              routines={routines}
            />
          </Route>
        </>
      )}
      {routines.map((routine, i) => {
        console.log(routine);
        return (
          <>
            <div className="routine" key={routine.id}>
              <h3 key={routine.id + i}>Routine: {routine.name}</h3>
              <p key={routine.id + (i + 1)}>Goal: {routine.goal}</p>
              <p key={routine.id + (i + 2)}>Creator: {routine.creatorName}</p>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Routines;
