import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import quotelist from '../data/quotes';

class Quotes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quote: "Daily quote coming soon!",
            intervalId: null
        };

        this.updateInterval = null;
        this.quotelist = quotelist;

        this.updateTime(this);
        this.startInterval();

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

    isADayAgo() {
        this.startDate = localStorage.getItem('startDate');
        if(this.startDate != "null") {
            var today =  new Date();
            var pastDate = new Date(this.startDate.toString("YYYY-MM-DDTHH:MM:SS"));
            if(86400000 < today.getTime()-pastDate.getTime()) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    startInterval = () => {
        this.intervalId = setInterval(this.updateInterval, 1000);
        if (this.intervalId != null) {
            this.setState({ intervalId: this.intervalId });
        }
    }

    stopInterval() {
        clearInterval(this.intervalId);
    }

    updateTime(state) {
        this.updateInterval = () => {
            if(this.isADayAgo()) {
                this.quoteOfTheDay = "";
                var randomquote = Math.ceil(Math.random() *  state.quotelist.quotes.length + 1);

                for (var i=0; i< state.quotelist.quotes.length; i++) {
                    if(randomquote == i) {
                        this.quoteOfTheDay = state.quotelist.quotes[i];
                        this.setState({quote:  this.quoteOfTheDay});
                    }
                }
            }
        }
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
                          Quote of the day
                        </Typography>
                            {this.state.quote && this.state.quote}
                    </CardContent>
                </CardActionArea>
                <CardActions>
                </CardActions>
            </Card>

        );
    }
}

export default Quotes;