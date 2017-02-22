import React, { Component } from 'react';

import Header from './Header';
import LocationSearch from './LocationSearch';
import Bar from './Bar';

import xhrRequest from '../utils/requests/xhrRequest';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            locationBars: null,
        };
        this.connect = this.connect.bind(this);
        this.handleLocationSearch = this.handleLocationSearch.bind(this);
        this.renderBars = this.renderBars.bind(this);
    }

    componentDidMount() {
        this.connect();
    }

    connect() {
        xhrRequest({ method: `GET`, url: `auth/user` })
            .then((response) => {
                const username = response.username;
                this.setState({
                    username,
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handleLocationSearch(location) {
        return new Promise((resolve, reject) => {
            xhrRequest({ method: `GET`, url: `/api/v1/search/location/${encodeURIComponent(location)}` })
            .then((response) => {
                const locationBars = response;
                this.setState({
                    locationBars,
                });
                resolve(response);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
                this.setState({
                    locationBars: null,
                });
            });
        });
    }

    renderBars() {
        if (this.state.locationBars !== null) {
            const bars = this.state.locationBars.businesses;
            console.log(bars);
            return bars.map((bar, barIndex) => <Bar key={ barIndex } bar={ bar } delay={ barIndex } user={ this.state.username } />);
        }
        return null;
    }

    render() {
        return (
            <div>
                <Header username={ this.state.username } />
                <LocationSearch onSearch={ this.handleLocationSearch } />
                <div style={ { marginRight: `20%`, marginLeft: `20%` } }>
                    {
                        this.renderBars()
                    }
                </div>
            </div>
        );
    }
}

export default App;
