import React, { Component } from 'react';
import { Jumbotron, Container, Alert } from 'react-bootstrap';
import packageData from '../../package.json';

import DefaultTemplate from '../templates/DefaultTemplate';

export default class IndexPage extends Component {
    render() {
        document.title = packageData.description;
        return (

                <DefaultTemplate>
                    <Jumbotron fluid>
                        <Container>
                            <h1><small>DnDEM:</small> the D&D Encounter Manager</h1>
                            <p className="lead">A tool for DMs to manage initiative and HP easily from their laptop or other device.</p>
                        </Container>

                    </Jumbotron>

                    <Alert variant="warning"><span className="text-danger">&#10071; Notice:</span> This Web Application uses browser cookies to store Encounter infomation. Using it means that you accept the use of cookies.</Alert>

                    <h2>Instructions</h2>
                    <ol className="lead">
                        <li>Browse the directory of classic and unique D&D monsters.</li>
                        <li>Add some enemies to the encounter.</li>
                        <li>Add your players to the encounter.</li>
                        <li>Roll initiative.</li>
                        <li><strong>CONQUER</strong>!</li>
                    </ol>

                    <h3>Information</h3>
                    <p>Report issues <a href="https://github.com/BrianWendt/dndem/issues" target="_blank">here</a> at the GitHub repository.</p>
                    <p>DnDEM is provided under the <a href="https://github.com/BrianWendt/dndem/blob/master/LICENSE" target="_blank">MIT License</a>.</p>
                    <p>Join DnDEM on GitHub to help contribute to the <a href="https://github.com/BrianWendt/dndem" target="_blank">BrianWendt/dndem</a> project.</p>
                    <p>Shout-out to the <a href="https://github.com/theoperatore/dnd-monster-api" target="_blank">theoperatore/dnd-monster-api</a> project for compiling the Monster data primarily used by DnDEM.</p>
                </DefaultTemplate>
                );
    }
}
