import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import CssBaseline from "@mui/material/CssBaseline";
import SideNav from "./Components/Navigation/SideNav";
import ApplicationBar from "./Components/Navigation/ApplicationBar";
import { ReactElement } from "react";
import StartupList from "./Components/Startup/StartupList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    toolbar: {
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      margin: theme.spacing(2),
    },
  })
);

export default function App(): ReactElement {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <ApplicationBar
          activeItem={activeItem}
          handleDrawerOpen={handleDrawerOpen}
          open={open}
        />
        <SideNav
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          setActiveItem={setActiveItem}
          activeItem={activeItem}
          open={open}
          setOpen={setOpen}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/" />;
              }}
            />
            <Route exact path="/startups" component={StartupList} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
