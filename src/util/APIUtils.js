import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import axios from 'axios';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options, { withCredentials: true })
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    console.log('ssafasdfasdfasdfasdf');
    // if(!localStorage.getItem(ACCESS_TOKEN)) {
    //     return Promise.reject("No access token set.");
    // }
    
    axios.defaults.withCredentials = true;

    return axios.get(API_BASE_URL + "/member/me", {
        headers: { 
            'Content-Type': 'application/json', 
            withCredentials: true,
        }
    }).then((res) => {
        console.log('res : ', res);
        return res.data;
    }
    );
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}