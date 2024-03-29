import React, { useState } from 'react';
import { Avatar, Button, Menu, MenuItem} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUser } from '../../Features/users/usersSlice';
import { logOutUser } from '../../Features/users/usersThunks';
import { apiURL } from '../../constants';
import { User } from '../../types';
import LogOutModal from '../../Modals/LogOutModal';

const UserMenu = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectUser);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = async () => {
    await dispatch(logOutUser(user.token));
    return navigate('/');
  };

  const profileImage = user.googleID ? user.avatar : apiURL + '/' + user.avatar;

  return (
    <>
      <LogOutModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onLogout={logOutHandler}
      />
      <Button color="inherit" onClick={handleClick}>
        <Avatar src={profileImage} sx={{marginX: 2}}/>
        {user.displayName}
      </Button>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={() => setOpenModal(true)}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;