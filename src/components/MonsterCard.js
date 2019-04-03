import React from 'react';
import { Row, Col } from 'react-bootstrap';

import MonsterCardAbility from  '../components/MonsterCard/Ability';
import MonsterCardAbilityScores from  '../components/MonsterCard/AbilityScores';
import MonsterCardAbilityScoreText from  '../components/MonsterCard/AbilityScoreText';
import MonsterCardDetails from  '../components/MonsterCard/Details';
import MonsterCardDetail from  '../components/MonsterCard/Detail';

export default class MonsterCard extends React.Component {
        
    static Details = MonsterCardDetails;
    static Detail = MonsterCardDetail;
    static Ability = MonsterCardAbility;
    static AbilityScores = MonsterCardAbilityScores;
    static AbilityScoreText = MonsterCardAbilityScoreText;


    render(){
        const Monster = this.props.Monster;

        return (<div>
                    <p>{Monster.size} {Monster.race}, {Monster.alignment} </p>
                    
                    <MonsterCard.AbilityScores Monster={Monster} />
                    
                    <Row>
                        <Col lg={4}>
                            image here
                        </Col>
                        <Col lg={8}>
                            <MonsterCard.Details Monster={Monster} />
                        </Col>
                    </Row>

                    {Monster.abilities.length > 0 &&
                        <h3>Abilities</h3>
                    }

                    {Monster.abilities.map((Ability, i) => {
                        return <MonsterCard.Ability key={("ability-" + i)} Ability={Ability}/>;
                    })}

                    {Monster.source.length > 0 &&
                        <p className="text-muted">Source: {Monster.source}</p>
                    }
                </div>
                );
    }
};

