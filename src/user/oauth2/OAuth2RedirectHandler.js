import React, { Component } from 'react';
import { ACCESS_TOKEN, SESSION_ID } from '../../constants';
import { Redirect } from 'react-router-dom'
import { Cookies } from 'react-cookie';

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    handleSessionChange(sessionId) {
        const cookies = new Cookies();

        cookies.set('sessionId', sessionId, { path: '/' });
    }

    render() {        
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');
        const session = this.getUrlParameter('sessionId');
        console.log(session);
        console.log(this.props.location);
        return <Redirect to={{
            pathname: "/profile",
            state: { from: this.props.location }
        }}/>;

        // if(session) {
        //     console.log('session return perfect');
        //     console.log(session);
        //     this.handleSessionChange(session);
        //     return <Redirect to={{
        //         pathname: "/profile",
        //         state: { from: this.props.location }
        //     }}/>;
        // }

        // if(token) {
        //     console.log('here');
        //     localStorage.setItem(ACCESS_TOKEN, token);
        //     return <Redirect to={{
        //         pathname: "/profile",
        //         state: { from: this.props.location }
        //     }}/>; 
        // } else {
        //     return <Redirect to={{
        //         pathname: "/login",
        //         state: { 
        //             from: this.props.location,
        //             error: error 
        //         }
        //     }}/>; 
        // }
    }
}

export default OAuth2RedirectHandler;