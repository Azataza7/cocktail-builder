import React from 'react';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogOutModal: React.FC<Props> = ({open, onClose, onLogout}) => {
  const style = {
    position: 'absolute', top: '38%', left: '50%',
    transform: 'translate(-50%, -50%)', width: 300, bgcolor: '#121212',
    border: '2px solid #000', boxShadow: 24, p: 4, color: '#FFF',
    borderRadius: '8px', textAlign: 'center'
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography>Are you sure?</Typography>
        <Grid component="div" sx={{ display: "flex", justifyContent: 'center', mt: 2 }}>
          <Button onClick={onClose} color="success">No</Button>
          <Button onClick={handleLogout} color="warning">Yes</Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default LogOutModal;