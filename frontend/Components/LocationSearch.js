import React, { Component } from 'react';
import storageIsAvailable from '../utils/localstore/storageIsAvailable';

import Hover from './Hover';

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
        this.props.onSearch(searchLocation, 0)
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
        const formStyle = {
            transition: `all 0.3s ease`,
            position: `relative`,
            right: `6px`,
            paddingLeft: `15%`,
            paddingRight: `15%`,
        };

        const formHoverStyle = {
            transition: `all 0.3s ease`,
            filter: `drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.16))`,
        };

        const inputHeight = `45px`;

        const searchBarShadow = `0px 2px 3px rgba(0, 0, 0, 0.22), 0 0 1px rgba(0, 0, 0, 0.16)`;

        const searchInputStyle = {
            borderTopRightRadius: `0`,
            borderBottomRightRadius: `0`,
            borderTopLeftRadius: `5px`,
            borderBottomLeftRadius: `5px`,
            height: inputHeight,
            boxShadow: searchBarShadow,
            border: `none`,
        };

        const searchButtonStyle = {
            borderBottomLeftRadius: `0`,
            borderTopLeftRadius: `0`,
            borderTopRightRadius: `5px`,
            borderBottomRightRadius: `5px`,
            height: inputHeight,
            boxShadow: searchBarShadow,
        };

        const inputContainerStyle = {
            padding: `0`,
        };

        const helperTextStyle = {
            width: `100%`,
            marginLeft: `20px`,
            color: this.state.msg && this.state.msg.msg !== `` ? `` : `transparent`,
        };

        const helperTextClasses = `text-${this.state.msg && this.state.msg.isError ? `danger` : `info`} pull-left`;

        return (
            <Hover style={ formStyle } hoverStyle={ formHoverStyle }>
                <form onSubmit={ this.handleSubmit } className='row location-search'>
                    <div style={ inputContainerStyle } className='container text-center col-xs-11'>
                        <input style={ searchInputStyle } ref={ (elem) => { this.searchInput = elem; } } value={ this.state.query } onChange={ this.handleChange } className='form-control' type='text' name='search' />
                    </div>
                    <button style={ searchButtonStyle } className='btn btn-primary col-xs-1' type='submit'>
                        Search
                    </button>
                    <span
                        style={ helperTextStyle }
                        className={ helperTextClasses }
                    >
                        { this.state.msg.msg || `No Message` }
                    </span>
                </form>
            </Hover>
        );
    }
}

export default LocationSearch;
