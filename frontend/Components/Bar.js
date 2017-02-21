import React, { Component } from 'react';

class Bar extends Component {
    render() {
        return (
            <div>
                { this.props.barName || `` }
            </div>
        );
    }
}

export default Bar;
