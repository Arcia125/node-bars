import React, { Component } from 'react';

class Header extends Component {
    render() {
        const username = this.props.username;
        return (
            <nav className='navbar navbar-default' role='navigation'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <a className='navbar-brand' href='/'>
                        Node Bars
                        </a>
                    </div>
                    <ul className='nav navbar-nav'>
                        { username ?
                            <li><a href='/profile'>{ username }</a></li>
                            : <li><a href='/auth/twitter'>Login</a></li>
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
