import React from 'react';
import { Table } from 'react-bootstrap';

import MonsterCard from '../MonsterCard';

export default class MonsterCardAbilityScores extends React.Component {
    render(){
        const Monster = this.props.Monster;
        return (
            <Table size="sm" className="text-center">
                <thead>
                    <tr>
                        <th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="lead">
                        <td>
                            <MonsterCard.AbilityScoreText mod={Monster.abilityScores.STR.mod} score={Monster.abilityScores.STR.score} />
                        </td>
                        <td>
                            <MonsterCard.AbilityScoreText mod={Monster.abilityScores.DEX.mod} score={Monster.abilityScores.DEX.score} />
                        </td>
                        <td>
                            <MonsterCard.AbilityScoreText mod={Monster.abilityScores.CON.mod} score={Monster.abilityScores.CON.score} />
                        </td>
                        <td>
                            <MonsterCard.AbilityScoreText mod={Monster.abilityScores.INT.mod} score={Monster.abilityScores.INT.score} />
                        </td>
                        <td>
                            <MonsterCard.AbilityScoreText mod={Monster.abilityScores.WIS.mod} score={Monster.abilityScores.WIS.score} />
                        </td>
                        <td>
                            <MonsterCard.AbilityScoreText mod={Monster.abilityScores.CHA.mod} score={Monster.abilityScores.CHA.score} />
                        </td>
                    </tr>
                </tbody>
            </Table>
            );
    }
};