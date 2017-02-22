import React, { Component } from 'react';

class Hover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
        };
        this.getStyle = this.getStyle.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    getStyle() {
        const style = this.props.style;
        const hoverStyle = this.props.hoverStyle;
        if (this.state.hovered) {
            return Object.assign({}, style, hoverStyle);
        }
        return style;
    }

    handleMouseEnter(event) {
        this.setState({
            hovered: true,
        });
    }

    handleMouseLeave(event) {
        this.setState({
            hovered: false,
        });
    }

    render() {
        return (
            <div style={ this.props.containerStyle } onMouseEnter={ this.handleMouseEnter } onMouseLeave={ this.handleMouseLeave }>
                { React.Children.map(this.props.children, child => React.cloneElement(child, { style: this.getStyle() })) }
            </div>
        );
    }
}

export default Hover;
