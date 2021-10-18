import { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import BASE_URL from "../util";
import AddActivityToRoutine from "./AddActivityToRoutine";
import "./MyRoutines.css";

const MyRoutines = (props) => {
  const token = props.user.token;
  const [myRoutines, setMyRoutines] = useState([]);

  const getMyRoutines = async () => {
    await fetch(`${BASE_URL}/users/${props.user.username}/routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setMyRoutines(result);
      })
      .catch(console.error);
  };
  useEffect(() => {
    getMyRoutines();
  }, [props.user]);

  const handleDeleteRoutine = async (routineId) => {
    const resp = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const info = resp.json();
    getMyRoutines(info);
  };

  const handleDeleteActivity = async (routineActivityId) => {
    const resp = await fetch(
      `${BASE_URL}/routine_activities/${routineActivityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const info = await resp.json();
    getMyRoutines(info);
  };

  return (
    <div className="MyRoutines">
      {myRoutines.map((routine, i) => {
        return (
          <>
            <div className="routine" key={routine.id}>
              {" "}
              Routine
              <p key={routine.id + i}>ID: {routine.id}</p>
              <h3 key={routine.id + (i + 1)}>Rotuine Name: {routine.name}</h3>
              <p key={routine.id + (i + 2)}>Goal: {routine.goal}</p>
              <div className="routine_activities">
                {routine.activities.map((activity, i) => {
                  console.log(activity);
                  return (
                    <>
                      <div className="activity" key={activity.id}>
                        {" "}
                        Routine Activities
                        <p key={activity.id + (i + 200)}>
                          Activity: {activity.name}
                        </p>
                        <p key={activity.id + (i + 201)}>
                          Description: {activity.description}
                        </p>
                        <p key={activity.id + (i + 202)}>
                          Count: {activity.count}
                        </p>
                        <p key={activity.id + (i + 203)}>
                          Duration: {activity.duration}
                        </p>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteActivity(activity.routineActivityId);
                          }}
                        >
                          Delete Activity
                        </button>
                      </div>
                    </>
                  );
                })}
              </div>
              <Link to="/my-routines/add-activity">Add Activity</Link>
              <Route path="/my-routines/add-activity">
                <AddActivityToRoutine
                  token={token}
                  routineId={routine.id}
                  getMyRoutines={getMyRoutines}
                />
              </Route>
              <button onClick={() => handleDeleteRoutine(routine.id)}>
                Delete Routine
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default MyRoutines;
