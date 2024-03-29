import { Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <>
      <Grid component="div" sx={{display: 'flex', gap: 2}}>
        <Button component={NavLink} to="/register" color="inherit">
          Sign up
        </Button>
        <Button component={NavLink} to="/login" color="inherit">
          Sign In
        </Button>
      </Grid>
    </>
  );
};

export default AnonymousMenu;