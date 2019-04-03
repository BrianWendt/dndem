import React from 'react';
import {mod} from '../../data/mod';

export default class MonsterCardAbilityScoreText  extends React.Component {
    render(){
        return (<div><span className="text-muted small">{this.props.score}</span> <span> ({mod(this.props.mod)})</span></div>);
    }
};