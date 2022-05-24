import React, { useState } from "react";
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RouterBreadcrumbs from "./RouterBreadcrumbs";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [drawerState, setDrawerState] = useState(false);

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
          <Button component={Link} to={'/login'} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
