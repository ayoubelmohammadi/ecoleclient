import React from "react";
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/Forgot";
import PrivateRoute from "./components/auth/PrivateRoute";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Eleve from "./pages/eleve/Eleve";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function App() {
    const token = useSelector(state => state.authentication.token)
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const hasAuth = () => {
        return token && token.length > 0;
    }
    const handleDrawerOpen = () => {
        setOpen( hasAuth());
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (<Router>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Gestion Groupe Scolaire
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <ListItem button component={Link} to="/">
                            <ListItemIcon> <BubbleChartIcon/></ListItemIcon>
                            <ListItemText primary={'Accueil'}/>
                        </ListItem>
                        <Divider/>
                        <ListItem button component={Link} to="/eleve" selected>
                            <ListItemIcon> <BubbleChartIcon/></ListItemIcon>
                            <ListItemText primary={'Eleve'}/>
                        </ListItem>
                    </List>
                    <Divider/>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader}/>

                    <Switch className="full">
                        <PrivateRoute
                            exact
                            path="/"
                            component={Home}
                            canActivate={() => hasAuth()}
                        />
                        <PrivateRoute
                            exact
                            path="/eleve"
                            component={Eleve}
                            canActivate={() => hasAuth()}
                        />
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/forgot-password" component={ForgotPassword}/>
                        <Redirect to="/"/>
                    </Switch>
                </main>
            </div>
        </Router>
    );

}

