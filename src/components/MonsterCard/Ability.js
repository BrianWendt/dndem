import React from 'react';

import { Card } from 'react-bootstrap';

export default class MonsterCardAbility extends React.Component {
    render(){
        const Ability = this.props.Ability;
        return (
                <Card className="mb-2">
                    <Card.Header as="h4">{Ability.name}</Card.Header>
                    <Card.Body>
                        <Card.Text as="div">
                            <p>{Ability.description}</p>
                            {Ability.recharge !== null &&
                                    <div className="text-right">Recharge: {Ability.recharge}</div>
                            }
                        </Card.Text>
                    </Card.Body>
                </Card>
                    );
    }
};