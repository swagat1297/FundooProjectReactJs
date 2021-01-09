import React, { useEffect } from 'react';
import clsx from "clsx";
import { StylesProvider } from "@material-ui/core/styles";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Avatar from '@material-ui/core/Avatar';
import ArchiveNotes from '../Archive/Archive';
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import EmojiObjectsTwoToneIcon from "@material-ui/icons/EmojiObjectsTwoTone";
import displayPicture from '../../asset/image/logo.png';
import TrashNote from '../TrashNote/TrashNote'
import Note from '../NoteComponent/NoteComponent'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Link} from 'react-router-dom';
import "../fundoo keep/keep.scss";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [toggleValueNote, setToggleValueNote] = React.useState(false);
  const [toggleValueArched, setToggleValueArched] = React.useState(false);
  const [toggleValueTrash, setToggleValueTrash] = React.useState(false);
  const [toggleListView, setToggleListView] = React.useState(false);

  // useEffect(() => {
  //   console.log("notes in useEffect", notes);
  //   getAllNotes();
  //  }, [notes]);
   

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleColorChange = (value) =>{
    if(value === 'note'){
      props.history.push('/dashboard/notes');
      setToggleValueNote(true)
      setToggleValueArched(false) 
      setToggleValueTrash(false)
    }
    if(value === 'arched'){
      props.history.push('/dashboard/archive');
      setToggleValueArched(true)
      setToggleValueNote(false)  
      setToggleValueTrash(false)
    }  
    if(value === 'trash'){
      props.history.push('/dashboard/trash');
      setToggleValueArched(false)
      setToggleValueNote(false)  
      setToggleValueTrash(true)
    }  
  }
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logOut = () =>{
    localStorage.removeItem("token");
    props.history.push('/');
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar
         
        )}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" />
          <Typography variant="h6" noWrap>
            Notes
          </Typography>
          <div className="search-bar">
            <div className="search-icon">
              <SearchIcon />
            </div>
            <InputBase
              className={(classes.input, "searchbar")}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className="list-view" onClick={()=>setToggleListView(!toggleListView)}>
            <ViewStreamIcon />
          </div>
          <div className="profile">
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
               <Avatar alt="Remy Sharp" src={displayPicture} />
            </Button>
            <StylesProvider injectFirst> 
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}> */}
                  <div className="profile-image">
                    <img className="profilepic" src={displayPicture} />
                    {/* <AccountCircleOutlinedIcon /> */}
                  </div>
                {/* </MenuItem> */}
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </Menu>
            </StylesProvider>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />  
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button className={toggleValueNote ? "round-cornerClick" : "round-corner"} key="Notes" onClick={() => handleColorChange('note')}>
            <ListItemIcon>
              {" "}
              <EmojiObjectsTwoToneIcon />
            </ListItemIcon>
            <ListItemText className="Notes" primary="Notes" />
          </ListItem>
          <ListItem button className="round-cornerone" key="Reminder">
            <ListItemIcon>
              {" "}
              <NotificationsNoneRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Reminder" />
          </ListItem>
          <ListItem button className="round-cornertwo" key="Edit labels">
            <ListItemIcon>
              {" "}
              <CreateOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Edit labels" />
          </ListItem>
          <ListItem button  className={toggleValueArched ? "round-cornerthreeClick" : "round-cornerthree"}  onClick={() => handleColorChange('arched')} key="Archive">
            <ListItemIcon>
              {" "}
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Archive" />
          </ListItem>
          <ListItem button className={toggleValueTrash ? "round-cornerfourClick" : "round-cornerfour"}  onClick={() => handleColorChange('trash')} key="Trash">
            <ListItemIcon>
              {" "}
              <DeleteOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
        <Route path="/dashboard/notes"><Note isToggleView={toggleListView}/></Route>
        <Route path="/dashboard/archive"><ArchiveNotes isToggleView={toggleListView}/></Route>
        <Route path="/dashboard/trash" ><TrashNote isToggleView={toggleListView}/></Route>
        </Switch>
        {/* getAllNotes = {getAllNotes} */}
      </main>
    </div>
  );
}
 
