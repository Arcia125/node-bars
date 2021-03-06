import React, { Component } from 'react';

import Header from './Header';
import LocationSearch from './LocationSearch';
import Bar from './Bar';

import xhrRequest from '../utils/requests/xhrRequest';
import storageIsAvailable from '../utils/localstore/storageIsAvailable';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            locationBars: null,
        };

        this.storageKey = `locationSearch`;

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

    getLocationFromStorage() {
        if (storageIsAvailable()) {
            return localStorage.getItem(this.storageKey);
        } else {
            return ``;
        }
    }

    handleLocationSearch(location, pageNumber = 0) {
        return new Promise((resolve, reject) => {
            xhrRequest({ method: `GET`, url: `/api/v1/search/location/${encodeURIComponent(location ? location : this.getLocationFromStorage())}/${pageNumber}` })
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
            const bars = this.state.locationBars;
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
