import React from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

// Redux Actions
import {login as LoginAction} from "../../redux/actions/actions.js";

// Material-UI components
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import CyberSecurityBadge from "../../components/auth/CyberSecurityBadge";

import {withStyles} from "@material-ui/core/styles";
import ProductLogo from "../../components/auth/ProductLogo.js";

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const mapStateToProps = state => {
  return {
    token: state.authentication.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => {
      dispatch(LoginAction(email, password));
    }
  };
};

const styles = theme => ({
  card: {
    width: "600px",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "auto",
    padding: theme.spacing.unit * 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  form: {
    maxWidth: "70%",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%"
    }
  },
  formFields: {
    marginBottom: theme.spacing.unit * 2
  },
  flexrow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginBottom: theme.spacing.unit * 4
  },
  buttonRow: {
    marginBottom: theme.spacing.unit * 2,
    flexWrap: "nowrap",
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
      flexDirection: "column-reverse",
      justifyContent: "center"
    }
  },
  loginButton: {
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  link: {
    color: theme.palette.primary["300"],
    "&:visited": {
      color: theme.palette.primary["300"]
    }
  },
  first: {
    marginRight: theme.spacing.unit * 2
  },
  legalText: {
    textAlign: "center"
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      remember: true
    };
  }

  canLogIn() {
    return (
      this.validEmail(this.state.email) &&
      this.state.email.match(EMAIL_REGEX) &&
      this.state.password.length > 0
    );
  }
  validEmail(address) {
    return (
      address &&
      typeof address === "string" &&
      address.length > 0 &&
      address.match(EMAIL_REGEX)
    );
  }
  render() {
    const { from } =
      this.props.location && this.props.location.state
        ? this.props.location.state
        : {
            from: { pathname: "/" }
          };
    const { classes } = this.props;

    return this.props.token ? (
      <Redirect to={from} />
    ) : (
      <Grid
        container
        alignItems="center"
        justify="center"
        className={"branding-panel"}
      >
        <Paper className={classes.card}>
          <ProductLogo />
          <form
            className={classes.form}
            onSubmit={evt =>
              this.props.login(this.state.email, this.state.password)
            }
          >
            <Grid container direction="column" justify="space-between">
              <TextField
                error={
                  !this.state.email || this.validEmail(this.state.email)
                    ? false
                    : true
                }
                label="Email Address"
                className={classes.formFields}
                value={this.state.username}
                onChange={evt => this.setState({ email: evt.target.value })}
                margin="normal"
                required
                inputProps={{ maxLength: 256 }}
              />
              <TextField
                type="password"
                label="Password"
                className={classes.formFields}
                value={this.state.password}
                onChange={evt => this.setState({ password: evt.target.value })}
                margin="none"
                required
                inputProps={{ maxLength: 256 }}
              />
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="space-between"
                className={classes.buttonRow}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.remember}
                      onChange={evt =>
                        this.setState({ remember: evt.target.checked })
                      }
                    />
                  }
                  label="Remember me"
                />
                <Button
                  type="submit"
                  className={classes.loginButton}
                  variant={this.canLogIn() ? "contained" : "text"}
                  disabled={!this.canLogIn()}
                  color="primary"
                >
                  Log In
                </Button>
              </Grid>
              <Grid container className={classes.flexrow}>
                <Typography variant="body2">
                  <Link
                    to="/register"
                    className={classes.link + " " + classes.first}
                  >
                    Sign Up
                  </Link>
                </Typography>

                <Typography variant="body2">
                  <Link to="/forgot-password" className={classes.link}>
                    Forgot Password?
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
          <CyberSecurityBadge />
        </Paper>
      </Grid>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
