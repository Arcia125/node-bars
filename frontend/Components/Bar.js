import React from 'react';

import xhrRequest from '../utils/requests/xhrRequest';

import Hover from './Hover';

const Bar = (props) => {
    const bar = props.bar;

    const handleGoing = (event) => {
        event.preventDefault();
        if (props.user) {
            xhrRequest({ method: `POST`, url: `/bars/go`, data: { bar: bar.id } })
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            window.location = `/auth/twitter`;
        }
    };

    const textWhite = `#F3F3F3`;
    const barHeight = `175px`;
    const textShadow = {
        color: textWhite,
        textShadow: `-1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000, 1px 1px 1px #000`,
        WebkitFontSmoothing: `antialiased`,
    };

    const contentStyle = {
        display: `flex`,
        flexDirection: `column`,
        height: `100%`,
    };

    const barStyle = Object.assign({}, {
        backgroundImage: `url(${bar.image_url})`,
        backgroundSize: `cover`,
        padding: `5px 10px`,
        boxShadow: `1px 1px 5px #999`,
        marginTop: `8px`,
        marginBottom: `8px`,
        height: barHeight,
        transition: `all 0.4s ease-out`,
        backgroundPosition: `center 0px`,
        position: `relative`,
        width: `100%`,
    }, textShadow);

    const imageHoverStyle = {
        filter: `saturate(1.3) brightness(1.2)`,
        transition: `all 0.4s ease-out`,
        zIndex: `1000`,
        boxShadow: ``,
        height: `${barHeight.slice(0, -2) * 1.5}px`,
        backgroundPosition: `center center`,
    };

    const businessNameStyle = Object.assign({}, {
        fontSize: `30px`,
        fontWeight: `bold`,
    }, textShadow);

    const businessAddressStyle = Object.assign({}, {}, textShadow);

    const attendButtonStyle = Object.assign({}, {
        background: `rgba(0, 0, 0, .7)`,
        transition: `all 0.3s ease`,
        transform: `translate(0, -50%)`,
    }, textShadow);

    const attendButtonHover = {
        background: textWhite,
        color: `#000`,
        textShadow: ``,
        border: `1px solid #0A0A0A`,
        transition: `all 0.3s ease`,
    };

    const attendContainerStyle = {
        position: `absolute`,
        top: `50%`,
        bottom: `50%`,
        right: `1%`,
    };

    const footerStyle = {
        position: `absolute`,
        bottom: `1%`,
        transition: `all 0.3s ease`,
    };

    const footerHover = {
        transition: `all 0.3s ease`,
        filter: `drop-shadow(1px 1px 2px black) saturate(4)`,
    };

    const ratingsStyle = {
        width: `175px`,
    };

    return (
        <Hover style={ barStyle } hoverStyle={ imageHoverStyle }>
            <div>
                <div style={ contentStyle }>
                    <a target='_blank' style={ businessNameStyle } href={ bar.url }>{ bar.name || `` }</a>
                    <p style={ businessAddressStyle }> { bar.location.display_address[0] || bar.location.address1 || bar.location.address2 }</p>
                    <Hover containerStyle={ attendContainerStyle } style={ attendButtonStyle } hoverStyle={ attendButtonHover }><button onClick={ handleGoing } className='btn btn-lg'>{ `${0} Going` }</button></Hover>
                    <Hover style={ footerStyle } hoverStyle={ footerHover }><a href='https://www.yelp.com/' target='_blank'><img style={ ratingsStyle } alt='yelp stars' src={ `/stars/${bar.rating.toString().replace(`.`, `_`)}.png` } /><img alt='yelp logo' src='Yelp_trademark_RGB.png' /></a></Hover>
                </div>
            </div>
        </Hover>
    );
};

export default Bar;
