import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
export default function AddUser({
  open = false,
  handleClose = () => undefined,
  addUser,
  currUser,
  editUser,
  cleanForm
}) {

  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [userName, setUserName] = useState('');
  const [place, setPlace] = useState('');
  //console.log("Current user :"+currUser);
  const handleGender = (event) => {
    setGender(event.target.value);
  };
  const handleAge = (event) => {
    setAge(event.target.value);
  };
  const handleuserName = (event) => {
    setUserName(event.target.value);
  };
  const handlePlace= (event) => {
    setPlace(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {};

    Array.from(event.target.elements).forEach((element) => {
      //console.log("Element :"+element.type);
      if ((element.type === 'text') || element.type === 'number') {
          data[element.name] = element.value;
        }
    });
    //console.log("Event :"+event.target.onClick);
    console.log(currUser);
    if (userName === undefined) {
      // passing data from child to parent with help of callback function
      addUser(data);
    } else {
      editUser(userName, data);
    }
    handleClose();
  }
  // Following useEffect sysntax will run when the compoenent is Mounted
  // some actions during only mouting 
  useEffect(() => {
    // clean form values -- unmount
    return () => {
      // unmount stage
      console.log('Un Mount for Dialog Component')
      cleanForm();
    }
  }); // only on mouting 

  // Actions on Mounting & Updating( props / state inside array changes ) Stage
  useEffect(() => {
    if (currUser !== undefined) {
      setGender(currUser.gender);
      setAge(currUser.age);
      setUserName(currUser.userName);
      setPlace(currUser.place);
    }
  }, // dependency array ( props / state ) props value or state value changes
    [currUser]);


  return (
    <div className="userList" >
      {console.log("current user :"+userName)}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'sm'}
        fullWidth={true}
      >
        <DialogTitle>{userName.length < 1 ? 'Add user' : 'Edit user'}</DialogTitle>
        <form onSubmit={handleSubmit} >
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="userName"
              name="userName"
              label="userName"
              type="text"
              fullWidth
              variant="standard"
              color='secondary'
              required
              size='small'
              value={userName}
              onChange={handleuserName}
              // defaultValue={currUser?.title || ''}
              defaultValue={currUser !== undefined ? currUser.name : ''}
              disabled={currUser !== undefined}
            />
            <TextField
              id="age"
              name="age"
              label="age"
              type="Number"
              value={age}
              onChange={handleAge}
              fullWidth
              variant="standard"
              color='secondary'
              required
              size='small'
              defaultValue={currUser !== undefined ? currUser.Age : ''}
            />
            <FormControl
              variant="standard"
              fullWidth
              color="secondary"
              sx={{
                mt: 1
              }}
            >
              <InputLabel id="gender">gender</InputLabel>
              <Select
                labelId="gender"
                id="gender"
                value={gender}
                onChange={handleGender}
                label="gender"
                name='gender'
                required
                fullWidth
              >
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
                <MenuItem value={'Other'}>Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="place"
              name="place"
              label="place"
              type="text"
              fullWidth
              variant="standard"
              color='secondary'
              required
              value={place}
              onChange={handlePlace}
              size='small'
              // defaultValue={currUser?.title || ''}
              defaultValue={currUser !== undefined ? currUser.place : ''}
              disabled={currUser !== undefined}
            />
          </DialogContent>
          <DialogActions>
            <Button type='button' variant='contained' color="error" onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant='contained' color='primary'>{userName.length < 1 ? 'Add' : 'Edit'}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}