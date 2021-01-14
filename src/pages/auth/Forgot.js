import React from "react";
import {connect} from "react-redux";

// Redux Actions
import {changePassword as ChangePasswordAction, sendResetEmail as SendResetAction} from "../../redux/actions/actions.js";

// Material-UI components
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import SidePanel from "../../components/auth/SidePanel";
import CyberSecurityBadge from "../../components/auth/CyberSecurityBadge.js";
import ProductLogo from "../../components/auth/ProductLogo.js";

const styles = theme => ({
  inputGroup: {
    marginTop: theme.spacing.unit * 3
  },
  inputRow: {
    display: "flex",
    alignItems: "flex-end"
  },
  formField: {
    marginLeft: theme.spacing.unit * 2,
    [theme.breakpoints.down("sm")]: {
      flexBasis: "100%",
      marginLeft: 0,
      marginTop: "10px",
      maxWidth: "100%"
    }
  },
  icon: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
});

const mapDispatchToProps = dispatch => {
  return {
    changePassword: (email, password) => {
      dispatch(ChangePasswordAction(email, password));
    },
    sendResetEmail: email => {
      dispatch(SendResetAction(email));
    }
  };
};
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      verificationCode: "",
      currentPage: 0
    };
  }

  validEmail(address) {
    return (
      address &&
      typeof address === "string" &&
      address.length > 0 &&
      address.match(EMAIL_REGEX)
    );
  }

  passwordsMatch() {
    return !(
      this.state.password.length > 0 &&
      this.state.confirmPassword.length > 0 &&
      this.state.password !== this.state.confirmPassword
    );
  }

  sendReset() {
    this.props.sendResetEmail(this.state.email);
    this.setState({ currentPage: this.state.currentPage + 1 });
  }

  canSubmit() {
    return (
      this.state.password.length > 0 &&
      this.state.confirmPassword.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  submit() {
    if (!this.canSubmit()) {
      return;
    }
    this.props.changePassword(this.state.email, this.state.password);
    this.gotoLogin();
  }

  gotoLogin() {
    this.props.history.push("/login");
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className="full">
        <Hidden xsDown>
          <Grid
            container
            item
            direction="column"
            alignItems="center"
            justify="center"
            xs={6}
            className="branding-panel text-center"
          >
            <ProductLogo />
            <CyberSecurityBadge
              style={{ color: "white", marginTop: "2rem" }}
              linkColor={"white"}
            />
          </Grid>
        </Hidden>

        <Grid item xs={12} sm={6}>
          {this.state.currentPage === 0 && (
            <SidePanel
              title={"Forgot Password"}
              info={`Enter your email address below and we will send you a verification code to authorize a password reset.`}
              onBack={() => this.props.history.goBack()}
              backLabel={"BACK"}
              onNext={() => this.sendReset()}
              nextLabel={"NEXT"}
              nextDisabled={!this.validEmail(this.state.email)}
            >
              <div className={classes.inputGroup}>
                <Grid container alignItems="flex-end">
                  <EmailIcon className={classes.icon} />
                  <Grid item xs className={classes.formField}>
                    <TextField
                      error={
                        !this.state.email || this.validEmail(this.state.email)
                          ? false
                          : true
                      }
                      label="Email Address"
                      value={this.state.email}
                      onChange={evt =>
                        this.setState({ email: evt.target.value })
                      }
                      margin="none"
                      required
                      fullWidth={true}
                      inputProps={{ maxLength: 256 }}
                    />
                  </Grid>
                </Grid>
              </div>
            </SidePanel>
          )}
          {this.state.currentPage === 1 && (
            <SidePanel
              title={"Create New Password"}
              info={`Enter your new password below.`}
              onBack={() => this.props.history.goBack()}
              backLabel={"CANCEL"}
              onNext={() => this.submit()}
              nextLabel={"FINISH"}
              nextDisabled={!this.canSubmit()}
            >
              <div className={classes.inputGroup}>
                <div className={classes.inputRow}>
                  <TextField
                    label="Verification Code"
                    value={this.state.verificationCode}
                    onChange={evt =>
                      this.setState({ verificationCode: evt.target.value })
                    }
                    margin="none"
                    required
                    fullWidth={true}
                    inputProps={{ maxLength: 256 }}
                  />
                  <Button color="primary">RESEND</Button>
                </div>
              </div>
              <div>
                <Grid container alignItems="flex-end">
                  <VpnKeyIcon className={classes.icon} />
                  <Grid item xs className={classes.formField}>
                    <TextField
                      label="Password"
                      value={this.state.password}
                      onChange={evt =>
                        this.setState({ password: evt.target.value })
                      }
                      margin="none"
                      required
                      fullWidth={true}
                      type="password"
                      inputProps={{ maxLength: 256 }}
                    />
                  </Grid>
                  <Grid item xs className={classes.formField}>
                    <TextField
                      label="Confirm Password"
                      value={this.state.confirmPassword}
                      error={!this.passwordsMatch()}
                      onChange={evt =>
                        this.setState({ confirmPassword: evt.target.value })
                      }
                      margin="none"
                      required
                      fullWidth={true}
                      type="password"
                      inputProps={{ maxLength: 256 }}
                    />
                  </Grid>
                </Grid>
              </div>
            </SidePanel>
          )}
        </Grid>
      </Grid>
    );
  }
}
export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ForgotPassword));
