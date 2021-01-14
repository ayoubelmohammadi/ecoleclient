import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import '../style.css';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  rightBlock: {
    padding: theme.spacing.unit * 3,
    maxHeight: "100%",
    overflow: "auto"
  },
  buttonPanel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing.unit * 3
  }
});

class SidePanel extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rightBlock}>
        <Typography variant="h6" color={"primary"} gutterBottom>
          {this.props.title}
        </Typography>
        <Typography variant="body2">{this.props.info}</Typography>
        {this.props.children}
        <div className={classes.buttonPanel}>
          {this.props.backComponent && this.props.backComponent}
          {this.props.onBack && (
            <Button
              variant="contained"
              disabled={this.props.backDisabled}
              onClick={() => this.props.onBack()}
            >
              {this.props.backLabel}
            </Button>
          )}
          {this.props.onNext && (
            <Button
              variant="contained"
              color={"primary"}
              disabled={this.props.nextDisabled}
              onClick={() => this.props.onNext()}
            >
              {this.props.nextLabel}
            </Button>
          )}
        </div>
      </div>
    );
  }
}

SidePanel.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  backComponent: PropTypes.element,
  onBack: PropTypes.func,
  backLabel: PropTypes.string,
  backDisabled: PropTypes.bool,
  onNext: PropTypes.func,
  nextLabel: PropTypes.string,
  nextDisabled: PropTypes.bool
};

export default withStyles(styles)(SidePanel);
