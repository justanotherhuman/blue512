import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button
} from "@material-ui/core/";
import SearchIcon from "@material-ui/icons/Search";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  button: {
    margin: theme.spacing(1),
    color: "white",
    fontSize: 13
  },
  Signupbutton: {
    margin: theme.spacing(1),
    color: "white",
    fontSize: 18
  },
  input: {
    display: "none"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();

  const getData = function(id_token, calendar_items) {
    console.log(calendar_items);
    axios
      .post("http://localhost:8000/api/events", {
        token: id_token,
        calendar_items,
        limit: null,
        day: null
      })
      .then(res => props.loadEvents(res.data))
      .catch(console.log);
  };

  const signOut = function() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      console.log("User signed out.");
    });
  };

  window.getCalData = id_token => {
    window.gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime"
      })
      .then(data => {
        getData(id_token, data.result.items);
      });
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            GoDo
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Button component={RouterLink} to="/" className={classes.button}>
            Some Events
          </Button>
          <Button
            component={RouterLink}
            to="/detailed"
            className={classes.button}
          >
            More Events
          </Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <Button className={classes.Signupbutton} variant="h6" noWrap>
              Sign up
          </Button> */}
            <div id="my-signin2" data-onsuccess="onSignIn" />
            <div onClick={signOut}>Sign out</div>
          </div>
          <div className={classes.sectionMobile} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
