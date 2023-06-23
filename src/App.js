import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import UserList from './userList/UserList';
// import BasicTable from './TableMUI';
// import BasicTextFields from './TextField';
// import FullScreenDialog from './Dialog';
// import Types from './Typography';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#FFC20E',
    },
    secondary: {
      main: '#448aff',
    }
  },
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
          borderRadius: 0
        },
      },
    },
  },
});


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={customTheme} >
        <UserList />
      </ThemeProvider>
    </div>
  );
}

export default App;
