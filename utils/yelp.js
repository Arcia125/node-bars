'use strict';

const request = require(`request`);
const querystring = require(`querystring`);


const getParam = (paramKey, param, end) => {
    if (param) {
        return `${paramKey}=${param}${end ? '' : '&'}`;
    }
    return ``;
};

class Yelp {
    constructor({ clientId, clientSecret }) {
        this.endpoints = {};
        this.endpoints.base = `https://api.yelp.com/v3`;
        this.endpoints.search = `${this.endpoints.base}/businesses/search?`;
        const oauth2 = `https://api.yelp.com/oauth2/token`;
        const form = {
            grant_type: `client_credentials`,
            client_id: clientId,
            client_secret: clientSecret,
        };
        const formData = querystring.stringify(form);
        const contentLength = formData.length;
        const headers = {
            "Content-Length": contentLength,
            "Content-Type": `application/x-www-form-urlencoded`,
        };
        request({
            method: `POST`,
            headers,
            uri: oauth2,
            body: formData,
        }, (error, response, body) => {
            if (error) {
                console.log(error);
                return;
            }
            const bodyJson = JSON.parse(body);
            this.token = bodyJson.access_token;
        });
    }

    search({
        term,
        location,
        latitude,
        longitude,
        radius,
        categories,
        locale,
        limit,
        offset,
        sortBy,
        price,
        openNow,
        openAt,
        attributes,
        paramString,
    } = {}, callback) {
        if (!(location || (latitude && longitude)) && !paramString) {
            console.log(`You must include either location or latitude and longitude in your search parameters.`);
            return null;
        }
        let searchParam;
        if (paramString) {
            searchParam = paramString;
        } else {
            const params = [
                getParam(`term`, term),
                getParam(`location`, location),
                getParam(`latitude`, latitude),
                getParam(`longitude`, longitude),
                getParam(`radius`, radius),
                getParam(`categories`, categories),
                getParam(`locale`, locale),
                getParam(`limit`, limit),
                getParam(`offset`, offset),
                getParam(`sort_by`, sortBy),
                getParam(`price`, price),
                getParam(`open_now`, openNow),
                getParam(`open_at`, openAt),
                getParam(`attributes`, attributes),
            ];
            searchParam = params.join(``);
        }
        console.assert(typeof this.token !== `undefined`);
        request({
            method: `GET`,
            uri: `${this.endpoints.search}${searchParam}`,
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        }, (error, res, body) => {
            if (error) {
                console.log(error);
                return;
            }
            if (typeof callback === `function`) {
                callback(JSON.parse(body));
            }
        });
    }
}

module.exports = Yelp;
