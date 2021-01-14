import React from "react";
import {connect} from "react-redux";

// Redux Actions
import {createAccount, sendVerificationEmail, sendVerificationPhone, verifyEmailAddress} from "../../redux/actions/actions.js";

// Material-UI components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import SidePanel from "../../components/auth/SidePanel";
import CyberSecurityBadge from "../../components/auth/CyberSecurityBadge.js";
import ProductLogo from "../../components/auth/ProductLogo.js";

const styles = theme => ({
  inputRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginTop: theme.spacing.unit * 3
  },
  formGroup: {
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.down("sm")]: {
      marginTop: 0
    }
  },
  formField: {
    marginLeft: theme.spacing.unit * 2,
    "&$noIcon": {
      marginLeft: theme.spacing.unit * 2 + 24,
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0
      }
    },
    [theme.breakpoints.down("sm")]: {
      flexBasis: "100%",
      marginLeft: 0,
      marginTop: theme.spacing.unit * 1
    }
  },
  icon: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  noIcon: {}
});

const mapDispatchToProps = dispatch => {
  return {
    createAccount: (firstName, lastName, email, role, phone, password) => {
      dispatch(
        createAccount(firstName, lastName, email, role, phone, password)
      );
    },
    sendVerificationEmail: email => {
      dispatch(sendVerificationEmail(email));
    },
    sendVerificationPhone: phone => {
      dispatch(sendVerificationPhone(phone));
    },
    verifyEmailAddress: code => {
      dispatch(verifyEmailAddress(code));
    }
  };
};
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_REGEX = /^[0-9]*$/;
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      verificationCode: "",
      role: "",
      phone: "",
      password: "",
      confirmPassword: "",
      currentPage: 0
    };
  }
  passwordsMatch() {
    return !(
      this.state.password.length > 0 &&
      this.state.confirmPassword.length > 0 &&
      this.state.password !== this.state.confirmPassword
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

  validPhone(inptxt) {
    return inptxt && inptxt.length == 10 && inptxt.match(PHONE_REGEX);
  }
  sendVerificationPhone() {
    this.props.sendVerificationPhone(this.state.phone);
    this.next();
  }

  sendVerificationEmail() {
    this.props.sendVerificationEmail(this.state.email);
    this.next();
  }

  back() {
    this.setState({ currentPage: this.state.currentPage - 1 });
  }
  next() {
    this.setState({ currentPage: this.state.currentPage + 1 });
  }

  verifyEmail() {
    this.props.verifyEmailAddress(this.state.verificationCode);

    // HERE WE AUTOMATICALLY ROUTE TO THE NEXT PAGE. IN YOUR APPLICATION, YOU SHOULD ONLY DO
    // THIS AFTER THE CODE HAS BEEN VERIFIED.
    this.next();
    return true;
  }

  canSubmit() {
    return (
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
      this.state.phone.length > 0 &&
      this.state.password.length > 0 &&
      this.state.confirmPassword.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }
  createAccount() {
    if (!this.canSubmit()) {
      return;
    }
    const userObject = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      role: this.state.role,
      phone: this.state.phone,
      password: this.state.password
    };
    this.props.createAccount(userObject);
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
              title={"Register an Account"}
              info={
                "To register for an account, enter your email address below. We will send you an email with a confirmation code to verify your address."
              }
              backComponent={
                <Typography variant="body1" style={{ marginRight: "1rem" }}>
                  Already have an account?{" "}
                  <Link to="/login" className="links">
                    Log In
                  </Link>
                </Typography>
              }
              onNext={() => this.sendVerificationEmail()}
              nextLabel={"Next"}
              nextDisabled={!this.validEmail(this.state.email)}
            >
              <div className={classes.inputRow}>
                <EmailIcon className={classes.icon} />
                <TextField
                  className={classes.formField}
                  error={
                    !this.state.email || this.validEmail(this.state.email)
                      ? false
                      : true
                  }
                  label="Email Address"
                  value={this.state.email}
                  onChange={evt => this.setState({ email: evt.target.value })}
                  margin="none"
                  required
                  fullWidth={true}
                  inputProps={{ maxLength: 256 }}
                />
              </div>
            </SidePanel>
          )}
          {this.state.currentPage === 1 && (
            <SidePanel
              title={"Verify Email Address"}
              info={`An email has been sent to ${
                this.state.email
              }. Enter the verification code or follow the link provided to continue.`}
              onBack={() => this.back()}
              backLabel={"BACK"}
              onNext={() => this.verifyEmail()}
              nextLabel={"Next"}
              nextDisabled={this.state.verificationCode.length < 1}
            >
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
            </SidePanel>
          )}
          {this.state.currentPage === 2 && (
            <SidePanel
              title={"Create Account"}
              info={`To complete your account registration, enter your account details below.`}
              onBack={() => this.props.history.goBack()}
              backLabel={"CANCEL"}
              onNext={() => this.createAccount()}
              nextLabel={"FINISH"}
              nextDisabled={!this.canSubmit()}
            >
              <Grid
                container
                alignItems="flex-end"
                className={classes.formGroup}
              >
                <PersonIcon className={classes.icon} />
                <Grid item xs className={classes.formField}>
                  <TextField
                    label="First Name"
                    value={this.state.firstName}
                    onChange={evt =>
                      this.setState({ firstName: evt.target.value })
                    }
                    margin="none"
                    required
                    fullWidth={true}
                    inputProps={{ maxLength: 256 }}
                  />
                </Grid>
                <Grid item xs className={classes.formField}>
                  <TextField
                    label="Last Name"
                    value={this.state.lastName}
                    onChange={evt =>
                      this.setState({ lastName: evt.target.value })
                    }
                    margin="none"
                    required
                    fullWidth={true}
                    inputProps={{ maxLength: 256 }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="flex-end"
                className={classes.formGroup}
              >
                <Grid
                  item
                  sm={6}
                  className={classes.formField + " " + classes.noIcon}
                >
                  <TextField
                    label="Title/Role"
                    value={this.state.role}
                    onChange={evt => this.setState({ role: evt.target.value })}
                    margin="none"
                    fullWidth={true}
                    inputProps={{ maxLength: 256 }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="flex-end"
                className={classes.formGroup}
              >
                <PhoneIcon className={classes.icon} />
                <Grid item xs={6} className={classes.formField}>
                  <TextField
                    label="Phone"
                    error={
                      !this.state.phone || this.validPhone(this.state.phone)
                        ? false
                        : true
                    }
                    value={this.state.phone}
                    onChange={evt => this.setState({ phone: evt.target.value })}
                    margin="none"
                    required
                    fullWidth={true}
                    inputProps={{ maxLength: 10 }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="flex-end"
                className={classes.formGroup}
              >
                <VpnKeyIcon className={classes.icon} />
                {/* PASSWORD FIELD SHOULD ONLY BE SHOWN IF THE USER DOES NOT YET HAVE AN ACCOUNT IN ACTIVE DIRECTORY. THIS INFORMATION WILL COME FROM THE CALL TO VERIFY THE EMAIL ADDRESS */}
                <Grid item xs className={classes.formField}>
                  <TextField
                    label="Password"
                    value={this.state.password}
                    onChange={evt =>
                      this.setState({ password: evt.target.value })
                    }
                    margin="none"
                    required
                    type="password"
                    fullWidth={true}
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
                    type="password"
                    fullWidth={true}
                    inputProps={{ maxLength: 256 }}
                  />
                </Grid>
              </Grid>
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
)(withStyles(styles)(Register));
