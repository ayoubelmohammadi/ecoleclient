import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
    textAlign: "center"
  },
  placeholderAppLogo: {
    height: "80px",
    width: "auto"
  },
  link: {
    color: theme.palette.primary["300"],
    "&:visited": {
      color: theme.palette.primary["300"]
    }
  },
  whiteLink: {
    color: "white",
    "&:visited": {
      color: "white"
    }
  },
  placeholderCyberSecurityLogo: {
    marginBottom: theme.spacing.unit * 2,
    height: "60px",
    width: "60px"
  }
});

class CyberSecurityBadge extends React.Component {
  render() {
    const { classes } = this.props;
    const linkColor =
      this.props.linkColor === "white" ? classes.whiteLink : classes.link;
    return (
      <div className={classes.wrapper} style={this.props.style}>
        {/* PLACEHOLDER IMAGE: please use the correct cybersecurity certification logo here */}
        <img
          className={classes.placeholderCyberSecurityLogo}
          src="https://www.gvsu.edu/cms4/asset/8C31E4D7-AD5F-8F01-B5DF51CD89E0BA46/module/75BCD32D-AB8B-315D-1D25AB4203DE98CC/7DFC40B5-B448-F75F-ECCA1B1877D5E6A7[1537809817].png"
          alt="Cybersecurity Badge"
          border="0"
        />
        <Typography variant="body2" color={"inherit"}>
          {this.props.legalText}
          <br />
          <a className={linkColor} href="#">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a className={linkColor} href="">
            Privacy Policy
          </a>
        </Typography>
      </div>
    );
  }
}

CyberSecurityBadge.propTypes = {
  legalText: PropTypes.string,
  style: PropTypes.object,
  linkColor: PropTypes.oneOf(["theme", "white"])
};
CyberSecurityBadge.defaultProps = {
  legalText: "By logging in, you agree to our ",
  linkColor: "theme"
};

export default withStyles(styles)(CyberSecurityBadge);
