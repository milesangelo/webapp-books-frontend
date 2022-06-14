import React, { useState } from "react";
import { AppBar, Box, Button, Drawer, IconButton, Modal, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RouterBreadcrumbs from "./RouterBreadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "./Auth/AuthContext";

const NavBar = () => {
  const [drawerState, setDrawerState] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const auth = useUserContext();
  console.log('navbar auth', auth);

  const handleLogout = () => {
    auth?.setUser(null);
    handleClose();
    navigate('login');
  }

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerState(open);
    };

  const style = {
      position: 'absolute' as 'absolute',
      top: '20%',
      left: '80%',
      transform: 'translate(-50%, -50%)',
      width: 200,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 2,
      color: 'blue',
      typography: {
        fontSize: '14'
      }
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerState}
            onClose={toggleDrawer(false)}
          >
            <RouterBreadcrumbs />
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Books
          </Typography>

          {auth?.user && <Button onClick={handleOpen} color="inherit">Logout</Button> ||
            <Button component={Link} to={'/login'} color="inherit">Login</Button> 
            }
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to logout?
              </Typography>
              <Button id="modal-modal-description" onClick={handleLogout} sx={{ mt: 2 }}>
                Yes
              </Button>
              <Button id="modal-modal-description" onClick={handleClose} sx={{ mt: 2 }}>
                No
              </Button>
            </Box></Modal>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
