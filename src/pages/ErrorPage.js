import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import EncounterDataHandler from '../data/EncounterDataHandler';

import DefaultTemplate from '../templates/DefaultTemplate';

export default class ErrorPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.errors = {
            "unknown": "unknown",
        }
    }

    render() {
        document.title = "Error";
        const code = this.props.match.params.code;
        const render = (typeof this.errors[code] !== "undefined") ? this.errors[code] : this.errors.unknown;
        return (
            <DefaultTemplate>
                {this[render]()}
            </DefaultTemplate>
        );

    }

    unknown(){
        return (<div><h1>Unknown Error</h1></div>)
    }
}
