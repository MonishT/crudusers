import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Typography } from '@mui/material';

const UserCard = ({
  userName = '',
  gender = 'Male',
  age = 20,
  place = '',
  removeUser,
  loadUser
}) => {
  return (
    <div style={{
      width: '230px',
      margin: 8,
      textAlign: 'center',
      border: '1px solid grey',
      position: 'relative'
    }} >

      <span
        style={{
          position: 'absolute',
          top: '40px',
          right: '10px',
          cursor: 'pointer'
        }}
        onClick={() => loadUser(userName)}
      >
        <EditIcon
          color="primary"
        />
      </span>
      <span
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer'
        }}
        onClick={() => removeUser(userName)}
      >
        <DeleteIcon
          color="primary"
        />
      </span>
      <Typography variant="h5" noWrap >{userName}</Typography>
      <Typography variant="h6" sx={{
        color: '#757575'
      }}>{place}</Typography>
    </div>
  )
}

export default UserCard;