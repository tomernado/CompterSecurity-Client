import React from 'react';
import { AppBar, Toolbar, Typography, Switch, FormControlLabel, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import { useSafeMode } from '../../contexts/SafeModeContext';

const useStyles = makeStyles({
  appBar: {
    backgroundColor: 'white !important',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: 0,
    color: 'inherit'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 24px'
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    fontFamily: "'Poppins', sans-serif",
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  safeLabel: {
    color: '#2e7d32',
    fontWeight: '600',
    fontSize: '1rem'
  },
  notSafeLabel: {
    color: '#d32f2f',
    fontWeight: '600',
    fontSize: '1rem'
  },
  icon: {
    fontSize: '28px'
  }
});

const Navbar = () => {
  const classes = useStyles();
  const { safeMode, setSafeMode } = useSafeMode();

  const handleModeChange = (event) => {
    const newValue = event.target.checked;
    setSafeMode(newValue);
  };

  return (
    <AppBar position="static" className={classes.appBar} color="inherit">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          <SecurityIcon className={classes.icon} style={{ color: '#08155a' }} />
          Security Client
        </Typography>

        <Box className={classes.switchContainer}>
          {safeMode ? (
            <SecurityIcon className={classes.icon} style={{ color: '#2e7d32' }} />
          ) : (
            <WarningIcon className={classes.icon} style={{ color: '#d32f2f' }} />
          )}
          <FormControlLabel
            control={
              <Switch
                checked={safeMode}
                onChange={handleModeChange}
                color="primary"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#2e7d32'
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#2e7d32'
                  }
                }}
              />
            }
            label={
              <Typography
                className={safeMode ? classes.safeLabel : classes.notSafeLabel}
              >
                {safeMode ? 'SAFE' : 'NOT SAFE'}
              </Typography>
            }
            labelPlacement="start"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
