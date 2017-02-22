import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import xhrRequest from '../utils/requests/xhrRequest';
import storageIsAvailable from '../utils/localstore/storageIsAvailable';

const debugEnabled = true;

const debug = (msg) => {
    debugEnabled && console.log(msg);
};

class LocationSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ``,
            msg: { msg: ``, isError: false },
        };
        this.storageKey = `locationSearch`;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (storageIsAvailable()) {
            const searchLocation = localStorage.getItem(this.storageKey);
            this.searchLocation(searchLocation);
            this.setState({
                query: searchLocation,
            });
        }
    }

    searchLocation(searchLocation) {
        this.setState({
            msg: {
                msg: `Searching...`,
                isError: false,
            },
        });
        this.props.onSearch(searchLocation)
            .then((response) => {
                debug(response);
                this.setState({
                    msg: {
                        msg: ``,
                        isError: false,
                    },
                });
                if (storageIsAvailable()) {
                    localStorage.setItem(this.storageKey, searchLocation);
                }
            })
            .catch((err) => {
                debug(err);
                if (err === `Not Found`) {
                    this.setState({
                        msg: {
                            msg: `The location you entered has no results.`,
                            isError: true,
                        },
                    });
                } else {
                    this.setState({
                        msg: {
                            msg: `An error occured while searching.`,
                            isError: true,
                        },
                    });
                }
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.searchInput.blur();
        this.searchLocation(this.state.query);
    }

    handleChange(event) {
        const query = event.target.value;
        this.setState({
            query,
            msg: {
                msg: ``,
                isError: false,
            },
        });
    }

    render() {
        return (
            <form style={ { position: `relative`, right: `6px` } } onSubmit={ this.handleSubmit } className='row location-search'>
                <div style={ { paddingRight: `0` } } className='container text-center form-group col-xs-11'>
                    <input ref={ (elem) => { this.searchInput = elem; } } value={ this.state.query } onChange={ this.handleChange } className='form-control' type='text' name='search'/>
                </div>
                <button className='btn btn-primary col-xs-1' type='submit'>
                    Search
                </button>
                <span
                    style={ { width: '100%', marginLeft: '20px', color: this.state.msg && this.state.msg.msg !== `` ? `` : `transparent` } }
                    className={ `text-${this.state.msg && this.state.msg.isError ? 'danger' : 'info'} pull-left` }
                >
                    { this.state.msg.msg || `No Message` }
                </span>
            </form>
        );
    }
}

export default LocationSearch;
