import React from 'react';
import { Table } from 'react-bootstrap';

import MonsterCard from '../MonsterCard';

export default class MonsterCardDetails extends React.Component {
    render(){
        const Monster = this.props.Monster;
        const hp = Monster.hitPoints.average + " (" + Monster.hitPoints.roll + ")";
        return (
            <Table size="sm">
                <tbody>
                    
                    <MonsterCard.Detail dt="Armor Class:" dd={Monster.armorClass} />
                    <MonsterCard.Detail dt="HP:" dd={hp} />
                    <MonsterCard.Detail dt="Speed:" dd={Monster.speed} />
                    
                    {Monster.savingThrows.length > 0 &&
                        <MonsterCard.Detail dt="Saving Throws:" dd={Monster.savingThrows.join('; ')} />
                    }
                    {Monster.skills.length > 0 &&
                        <MonsterCard.Detail dt="Skills:" dd={Monster.skills.join("; ")} />
                    }
                    {Monster.languages.length > 0 &&
                        <MonsterCard.Detail dt="Languages:" dd={Monster.languages.join(", ")} />
                    }
                    <MonsterCard.Detail dt="Challenge Rating:" dd={(Monster.cr + ' (' + Monster.xp + 'xp)')} />
                </tbody>
            </Table>
                );
    }
};