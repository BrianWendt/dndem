import React from 'react';

import { Button } from 'react-bootstrap';

import DefaultTemplate from '../templates/DefaultTemplate';
import MonsterCard from  '../components/MonsterCard';

/* data */

import MonsterDataHandler from '../data/MonsterDataHandler';

export default class MonsterPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.MonsterDataHandler = new MonsterDataHandler();
        const id = this.props.match.params.id;
        this.Monster = this.MonsterDataHandler.get(id);
        document.title = 'DnDEM - ' + this.Monster.name + " (Monster)";
    }

    render(){
        const Monster = this.Monster;

        return (Monster === false) ? false : (
                <DefaultTemplate>
                    {this.props.history.length > 1 &&
                            <p><Button onClick={this.props.history.goBack()} variant="secondary">&#10852; Back</Button></p>
                    }
                    <h1>{Monster.name}</h1>
                    <MonsterCard Monster={Monster} />
                </DefaultTemplate>
              );
    }

    goBack(){

    }
};
