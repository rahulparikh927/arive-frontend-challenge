import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addUser,
    addUserHobbies,
    delUserHobbie,
    selectUser,
    getUsersFromServer
} from './store/reducers/userSlice';
import './css/App.scss';

function App() {
    const users = useSelector(selectUser);
    const dispatch = useDispatch();
    const [selectedUserID, setSelectedUserID] = useState(0)
    const addUserInputRef = useRef(null)
    const addUserHobbiesFormRef = useRef(null)

    const AddUser = () => {
        const userName = addUserInputRef.current.value.trim()
        users.some(item => { return item.name === userName }) ? alert("User is already exist") :
            userName ?
                dispatch(addUser({ name: userName, hobbies: [] }))
                : alert("User name is required")
        addUserInputRef.current.value = ""
    }

    useEffect(() => {
        dispatch(getUsersFromServer())
    }, [dispatch])

    const AddUserHobbies = () => {
        const form = addUserHobbiesFormRef.current
        if (!form['title'].value.trim()) {
            alert("Title is required")
            return
        }
        if (!form['date'].value) {
            alert("Date is required")
            return
        }
        dispatch(addUserHobbies({ user_id: selectedUserID, hobbies: { passion: form['passion'].value, title: form['title'].value, date: form['date'].value } }))
        addUserHobbiesFormRef.current.reset()
    }

    const DelUserHobbie = (user_hobbie_id) => {
        const user = users[selectedUserID]
        const newHobbies = user.hobbies.filter(function (item, index) {
            return index !== user_hobbie_id;
        });
        dispatch(delUserHobbie({ user_id: selectedUserID, newHobbies }))
    }

    return (
        <div className="app">
            <div className="app-header">
                <h2>User Hobbies</h2>
            </div>
            <div className="app-userlist-wrapper">
                <div className="users-list">
                    <div className="user-add-wrapper">
                        <input type="text" className="add-user-input" ref={addUserInputRef} placeholder="Add user name" />
                        <button
                            className="add-user-button"
                            onClick={() => AddUser()}
                        >Add user</button>
                    </div>
                    <div className="userlist-wrapper">
                        <ul className="user-list">
                            {
                                users.length > 0 && users.map((item, index) => (<li key={index} className={"user " + (selectedUserID === index ? "active" : "")} onClick={() => { addUserHobbiesFormRef.current.reset(); setSelectedUserID(index) }}>{item.name}</li>))
                            }
                        </ul>
                    </div>
                </div>
                <div className="users-hobbies">
                    {
                        users.length > 0 ?
                            (<div className="add-user-hobbies">
                                <form
                                    className="add-user-hobbies-form"
                                    ref={addUserHobbiesFormRef}
                                >
                                    <select name="passion" className="col-4">
                                        <option value="Very-High">Very-High</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                    <input type="text" placeholder="Add Title" name="title" className="col-4" />
                                    <input type="date" placeholder="Select Date" name="date" className="col-4" />
                                    <input type="button" className="add-hobbies col-4" value="Add Hobbies" onClick={() => AddUserHobbies()} />
                                </form>
                                <div className="user-hobbies-wrapper">
                                    {
                                        users[selectedUserID].hobbies.length > 0 ?
                                            <ul>
                                                {users[selectedUserID].hobbies.map((item, index) => (
                                                    <li key={index}>
                                                        <span className="col-4">{item.passion}</span>
                                                        <span className="col-4">{item.title}</span>
                                                        <span className="col-4">{
                                                            "Since " + new Date(item.date).getFullYear()
                                                        }</span>
                                                        <span className="col-4"><button onClick={() => DelUserHobbie(index)}>Del</button></span>
                                                    </li>))}
                                            </ul>
                                            : "No Hobbies. Please add hobbies."
                                    }
                                </div>
                            </div>
                            )
                            : null
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
