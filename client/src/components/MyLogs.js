import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyLogs = () => {
  const { userId } = useSelector((state) => state.user);
  const [userLogs, setUserLogs] = useState([]);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  // set active user
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/" + userId)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get all logs and filter by user_id
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/logs")
      .then((res) => {
        const array = res.data.Logs;
        const userArray = array.filter((log) => log.user_id === userId);
        setUserLogs(userArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // delete log
  const handleDelete = (logId) => {
    axios.delete(`http://localhost:8000/api/logs/${logId}`)
    .then((res) => {
        const updatedLogs = userLogs.filter((logs) => {
            return logs._id !== logId;
        })
        setUserLogs(updatedLogs);
})
.catch((err) => {
    console.log(err.response.data.errors)
})
  };


  return (
    <div className="container">
      <h3 className="text-start">{user.userName}'s Logs:</h3>
      <br />
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="column">Date</th>
            <th scope="column">Recipes</th>
            <th scope="column">Calories</th>
            <th scope="column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userLogs.map((log, index) => {
            return (
              <tr key={index}>
                <td>{new Date(log.logDate).toLocaleDateString()}</td>
                <td>
                  {log.recipesEaten.join(', ')}
                </td>
                <td>{log.caloriesEaten}</td>
                <td>
                  <button className="btn btn-sm btn-outline-dark m-2">
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-dark m-2" onClick={() => handleDelete(log._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyLogs;
