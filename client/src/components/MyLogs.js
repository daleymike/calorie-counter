import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyLogs = () => {
    const {userId} = useSelector(state => state.user);
    const [userLogs, setUserLogs] = useState([]);
    const [user, setUser] = useState("");
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/user/" + userId)
        .then((res) => {
            console.log("Success")
            console.log(res.data.userLogs)
            setUser(res.data);
            setUserLogs(res.data.userLogs);
        })
        .catch((err) => {
            console.log(err)
        })
    },[])


    return (
        <div className='container'>
            <h3>{user.userName}'s Logs</h3>
            <table className="table table-hover">
                <thead className="thead">
                    <tr>
                        <th scope='column'>Date</th>
                        <th scope='column'>Recipes</th>
                        <th scope='column'>Calories</th>
                        <th scope='column'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userLogs.map((log, index) => {
                        <tr key={index}>
                        <td>{log.date}</td>
                        <td>{log.recipes}</td>
                        <td>{log.calories}</td>
                        <td> <button className='btn btn-sm btn-outline-dark'>Edit</button> <button className='btn btn-sm btn-outline-dark'>Delete</button></td>
                    </tr>
                    })}
                   
                </tbody>
            </table>
        </div>
    )
}

export default MyLogs;