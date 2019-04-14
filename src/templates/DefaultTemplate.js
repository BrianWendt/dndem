import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

import '../css/default.css';
import '../css/App.css';

export default class DefaultTemplate extends React.Component {
    render() {
        return (
                <div id="app">
                    <header className="default_header">
                        <Navbar bg="primary" variant="dark" expand="sm">
                            <Container>
                                <Navbar.Brand href="#/" className="font-tinos-700">DnDEM</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                        <Nav.Link href="#/">Home</Nav.Link>
                                        <Nav.Link href="#/encounter/">Encounter Manager</Nav.Link>
                                        <Nav.Link href="#/monsters/">Monster Directory</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>

                        </Navbar>
                    </header>
                    <Container id="content">
                        {this.props.children}
                    </Container>
                </div>
                )

    }
}
