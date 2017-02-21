import React, { Component } from 'react';
import xhrRequest from '../utils/requests/xhrRequest';

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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            msg: {
                msg: `Searching...`,
                isError: false,
            },
        });
        this.props.onSearch(this.state.query)
            .then((response) => {
                debug(response);
                this.setState({
                    msg: {
                        msg: ``,
                        isError: false
                    },
                });
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
            <form onSubmit={ this.handleSubmit } className='row location-search'>
                <div className='container text-center form-group col-xs-9'>
                    <input value={ this.state.query } onChange={ this.handleChange } className='form-control' type='text' name='search'/>
                </div>
                <button className='btn btn-primary col-xs-3' type='submit'>
                    Go
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
