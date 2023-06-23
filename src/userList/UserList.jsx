import React, { useEffect, useState } from 'react';

// Package Imports
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

// Custom Module Import
import UserCard from './UserCard';
import AddUser from './AddUser';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [currUser, setCurrUser] = React.useState(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // callback for child
  const addUser = async (userObj) => {
    console.log(userObj);
    setUsers([...users, userObj]);
    fetch('https://64932bae428c3d2035d17303.mockapi.io/users/create', {
      method: 'POST',
      body: JSON.stringify(userObj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const removeUser = (name) => {
    const id = users.find(({userName}) => userName === name).id;
    //console.log("id :"+Name);
    setUsers(users.filter(({userName}) => userName !== name));
    fetch(`https://64932bae428c3d2035d17303.mockapi.io/users/create/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const loadUser = (Name) => {
    const user = users.find(({userName}) => userName === Name);
    //console.log("User : "+user);
    setCurrUser(user);
    setOpen(true);
  }

  const editUser = (Name, userObj) => {
    const editIndex = users.findIndex(({userName}) => Name === userName);
    console.log(editIndex, userObj);
    var newArr = [...users];
    newArr[editIndex] = userObj;
    console.log(newArr);
    setUsers(newArr);
  }

  const cleanForm = () => {
    console.log('Cleanform')
    setCurrUser(undefined);
  }

  useEffect(() => {
    fetch('https://64932bae428c3d2035d17303.mockapi.io/users/create')
      .then((response) => response.json())
      .then((data) => setUsers(data));
    console.log('Mounting Called')
  }, []);



  return (
    <>
      {/* {console.log('users List', users)} */}
      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px'
        }}
        onClick={handleClickOpen}
      >
        <AddIcon color="secondary"/>
      </Fab>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
      >
        {users.map(({ userName, age, gender, place }) => (
          <UserCard
            userName={userName}
            age={age}
            gender={gender}
            place={place}
            removeUser={removeUser}
            loadUser={loadUser}
          />
        ))}
      </div>

      {open && <AddUser
        // passing of data from parent to child
        open={open}
        handleClose={handleClose}
        addUser={addUser}
        currUser={currUser}
        editUser={editUser}
        cleanForm={cleanForm}
      />}
    </>
  )

}

export default UserList;