import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class Alert extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    handleToggle = (shouldOpen) => {
        if(shouldOpen) {
            this.props.action();
        }
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return <div>
            <Button variant="outlined" color="primary" onClick={() => { this.handleToggle(false) }}>
                {this.props.name}
            </Button>
            <Dialog
                open={this.state.isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleToggle}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{this.props.name +" timer?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to do this?
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { this.handleToggle(true) }} color="primary">
                        Yes
                        </Button>
                    <Button onClick={() => { this.handleToggle(false) }} color="primary">
                        No
                        </Button>
                </DialogActions>
            </Dialog>
        </div>
    }
}