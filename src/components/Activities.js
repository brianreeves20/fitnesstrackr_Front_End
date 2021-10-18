import { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";

import BASE_URL from "../util";

import NewActivity from "./NewActivity";
import "./Activities.css";

const Activities = (props) => {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    await fetch(`${BASE_URL}/activities`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setActivities(result);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="activities">
      {props.user && (
        <>
          <Link to="/activities/new">Add Activity</Link>
          <Route path="/activities/new">
            <NewActivity
              token={props.user.token}
              setActivities={setActivities}
              activities={activities}
            />
          </Route>
        </>
      )}
      {activities.map((activity, i) => {
        console.log(activity);
        return (
          <>
            <div className="activity" key={activity.id}>
              {" "}
              Activity
              <p key={activity.id + i}>ID: {activity.id}</p>
              <h3 key={activity.id + (i + 1)}>Name: {activity.name}</h3>
              <p key={activity.id + (i + 2)}>
                Description: {activity.description}
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Activities;
