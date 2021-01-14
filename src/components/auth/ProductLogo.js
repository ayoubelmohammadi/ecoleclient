import React from "react";

import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  placeholderProductLogo: {
    height: "80px",
    width: "auto"
  }
});

class ProductLogo extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      /* PLACEHOLDER IMAGE: please use the correct company or product logo here */
      <img
        className={classes.placeholderProductLogo}
        src="https://incvt.ma/wp-content/uploads/2016/10/logo-incvt-site-origin-mobole.png"
        alt="Company or Product Logo"
        border="0"
      />
    );
  }
}

export default withStyles(styles)(ProductLogo);
