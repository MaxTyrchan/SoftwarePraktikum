import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import TaskIcon from '@mui/icons-material/Task';
import PeopleIcon from "@mui/icons-material/People";
import { signOut } from "firebase/auth";
import { auth, PUBLIC_URL } from "../FirebaseConfig";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import { colors } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import GitHubIcon from '@mui/icons-material/GitHub';


//sets the Width of the Drawer
const drawerWidth = 280;

//configures the AppBar
//Source: https://material-ui.com/components/app-bar/#app-bar-with-drawer
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//configures the Drawer
//Source: https://material-ui.com/components/app-bar/#app-bar-with-drawer
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

//handels the LogOut when the LogOut Button is clicked
const handleLogOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
};

//Titles of the Pages, which are displayed in the Drawer
const pageTitles = {
  "/dashboard": "My Dashboard",
  "/members": "Employees",
  "/projects": "Projects",
  "/tasks": "Tasks",
  "/reporting-person": "Reporting for employee related info",
  "/reporting-project": "Reporting for project related info",
};

//renders the Header
export default function Header(props) {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [nestOpen, setNestOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNestedDrawerClick = () => {
    setNestOpen(!nestOpen);
  };

  //handels the switching of the displayed Page Title
  const location = useLocation();
  const [title, setTitle] = useState(pageTitles["/"]);

  useEffect(() => {
    setTitle(pageTitles[location.pathname]);
  }, [location.pathname]);

  //If the user is not logged in, the Drawer will not be displayed
  if (!props.currentUser) {
    return null;
  } else {
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ mr: 2 }}>
              {props.currentUser.displayName}
            </Typography>
            <Avatar src={props.currentUser.photoURL} alt="profilePicture" />
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="temporary"
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
        >
          <Box>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ListItem disablePadding component={Link} to={PUBLIC_URL + '/dashboard'}>
                <ListItemButton >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" sx={{ color: colors.blueGrey[800] }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding component={Link} to={PUBLIC_URL + '/projects'}>
                <ListItemButton >
                  <ListItemIcon>
                    <DashboardCustomizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Projects" sx={{ color: colors.blueGrey[800] }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding component={Link} to={PUBLIC_URL + '/tasks'}>
                <ListItemButton >
                  <ListItemIcon>
                    <TaskIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tasks" sx={{ color: colors.blueGrey[800] }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding component={Link} to={PUBLIC_URL + '/members'}>
                <ListItemButton >
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Employees" sx={{ color: colors.blueGrey[800] }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleNestedDrawerClick}>
                  <ListItemIcon>
                    <AssessmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Reporting" sx={{ color: colors.blueGrey[800] }} />
                  {nestOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={nestOpen} timeout="auto" unmountOnExit>
                <ListItem disablePadding component={Link} to={PUBLIC_URL + '/reporting-person'}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <AssessmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Employee Related" sx={{ color: colors.blueGrey[800] }} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding component={Link} to={PUBLIC_URL + '/reporting-project'}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <AssessmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Project Related" sx={{ color: colors.blueGrey[800] }} />
                  </ListItemButton>
                </ListItem>
              </Collapse>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding onClick={handleLogOut}>
                <ListItemButton >
                  <ListItemIcon sx={{ color: 'red' }} >
                    <LogoutIcon />
                  </ListItemIcon >
                  <ListItemText primary={"Log Out"} sx={{ color: 'red' }} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer >
      </Box >
    );
  }
}