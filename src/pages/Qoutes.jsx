import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { couldStartTrivia } from 'typescript';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

class Qoutes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            qoute: null,
        };

        this.classes = makeStyles(theme => ({
            card: {
                maxWidth: 345,
            },
            media: {
                height: 140,
            },
            container: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            textField: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
            },
            dense: {
                marginTop: 16,
            },
            menu: {
                width: 200,
            },
        }));
    }

    componentDidUpdate(prevProps, prevState) {

    }

    startInterval() {
        this.intervalId = setInterval(this.updateInterval, 1000);
        if (this.intervalId != null) {
            this.setState({ intervalId: this.intervalId });
        }
    }

    stopInterval() {
        clearInterval(this.intervalId);
    }

    startTime(state) {
        this.countDownDate = localStorage.getItem('startDate');
        if (this.countDownDate != "null") {
            this.countDownDate = new Date(this.countDownDate);
        } else {
            this.countDownDate = new Date();
            localStorage.setItem('startDate', this.countDownDate);
        }

        var days = 0;
        var hours = 0;
        var minutes = 0;
        var seconds = 0;

        var state = this;
        // Update the count down every 1 second
        this.updateTime(state, this.countDownDate, days, hours, minutes, seconds);
        this.startInterval();
    }

    updateTime(state, countDownDate, days, hours, minutes, seconds) {
        this.updateInterval = () => {
            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now an the count down date
            var distance = now - countDownDate.getTime();

            // Time calculations for days, hours, minutes and seconds
            days = Math.floor(distance / (1000 * 60 * 60 * 24));
            hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            if (state.time != new Date()) {
                state.setState({ time: days + "d " + hours + "h " + minutes + "m " + seconds + "s ", days: days });
            }
        }
    }

    resetTime = () => {
        this.stopInterval();
        this.countDownDate = new Date;
        localStorage.setItem('startDate', this.countDownDate);
        this.setState({ time: null, days: 0 });
        this.updateTime(this, this.countDownDate, 0, 0, 0, 0);
        this.startInterval();
    }

    stopTime = () => {
        this.countDownDate = null;
        localStorage.setItem('startDate', "null");
        this.setState({ time: null, days: 0 });
        this.stopInterval();
    }

    setGoalName = (event) => {
        this.setState({ goalName: event.target.value });
        this.goalName = localStorage.setItem('goalName', event.target.value);
    }

    resetGoal = () => {
        this.setState({ goalName: "" });
        localStorage.setItem('goalName', "null");
    }

    render() {
        return (
            <Card className={this.classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={this.classes.media}
                        image="./img/staystrong.jpg"
                        title="stay strong"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {this.state.goalName}
                        </Typography>
                        {this.state.time != null &&
                            <div>
                                <div>{this.state.time}</div>
                                <div id="daysStrong">{this.state.days} Days going strong!</div>
                            </div>
                        }
                        {this.state.time == null &&
                            <div id="daysStrong">Start counting!</div>
                        }
                        <TextField
                            id="filled-name"
                            label="Goal name"
                            className={this.classes.textField}
                            onChange={this.setGoalName}
                            value={this.state.goalName}
                            margin="normal"
                            variant="filled"
                        />
                        <IconButton onClick={this.resetGoal}>
                            <UndoIcon/>
                        </IconButton>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {this.state.time == null &&
                        <Button size="small" color="primary" onClick={this.startTime}>
                            Start
                        </Button>
                    }
                    {this.state.time != null &&
                        <Button size="small" color="primary" onClick={this.resetTime}>
                            Reset
                        </Button>
                    }
                    <Button size="small" color="primary" onClick={this.stopTime}>
                        Stop
                    </Button>
                </CardActions>
            </Card>

        );
    }
}

export default StayStrong;