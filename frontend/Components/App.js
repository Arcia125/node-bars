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
            return bars.map((bar, barIndex) => {
                return (
                    <Bar key={ barIndex } barName={ bar.name }/>
                );
            });
        }
        return null;
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
        // const xhr = new XMLHttpRequest();
        // xhr.open(`GET`, `auth/user`, true);
        // xhr.onload = (event) => {
        //     if (xhr.readyState === 4) {
        //         if (xhr.status === 200) {
        //             const username = JSON.parse(xhr.response).username || null;
        //             this.setState({
        //                 username,
        //             });
        //         } else {
        //             console.error(xhr.statusText);
        //         }

        //     }
        // };
        // xhr.onerror = (event) => {
        //     console.error(xhr.statusText);
        // };
        // xhr.send(null);
    }
    render() {
        return (
            <div>
                <Header username={ this.state.username }/>
                <LocationSearch onSearch={ this.handleLocationSearch }/>
                {
                    this.renderBars()
                }
            </div>
        );
    }
}

export default App;
