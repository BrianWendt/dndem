import React from 'react';
import { Col, Row, Form, InputGroup, Button, ButtonGroup, Modal } from 'react-bootstrap';

import DefaultTemplate from '../templates/DefaultTemplate';

import EncounterDataHandler from '../data/EncounterDataHandler';
import {mod} from '../data/mod';
import FileUtility from '../data/FileUtility';

export default class EncounterPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        document.title = 'DnDEM - Manage Encounter';

        this.EncounterDataHandler = new EncounterDataHandler('encounter');
        this.FileUtility = new FileUtility();

        this.handleUpdateValue = this.handleUpdateValue.bind(this);
        this.handleRollInit = this.handleRollInit.bind(this);
        this.handleAddCreature = this.handleAddCreature.bind(this);
        this.handleCreatureSubmit = this.handleCreatureSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRemoveCreature = this.handleRemoveCreature.bind(this);
        this.handleEditCreature = this.handleEditCreature.bind(this);
        this.handleShowFileModal = this.handleShowFileModal.bind(this);
        this.handleLoadFile = this.handleLoadFile.bind(this);

        this.blankCreature = {key: null, name: "", init: 0};
        this.state = {
            Encounter: this.EncounterDataHandler.getEncounterData(),
            Creature: this.blankCreature,
            showCreatureModal: false,
            showFile: false,
            downloadURL: ''
        };
    }

    render(){
        return (<DefaultTemplate>
            <ButtonGroup className="mb-2">
                <Button onClick={this.handleShowFileModal}>File</Button>
                <Button href="#/monsters/" variant="success">&#10010; Add Monster From Directory</Button>
                <Button onClick={this.handleAddCreature} variant="outline-success">&#10010; Add Creature/Character</Button>
            </ButtonGroup>

            {this.state.Encounter.creatures.length > 0 &&
                <div>
                    <Row className="monster-row header-row">
                        <Col xs={12} lg={7} className="border p-1">Creature Name</Col>
                        <Col xs={4} lg={2} className="border p-1 text-center">HP</Col>
                        <Col xs={4} lg={2} className="border p-1 text-center">AC</Col>
                        <Col xs={4} lg={1} className="border p-1 text-center">Initiative</Col>
                    </Row>

                    {this.state.Encounter.creatures.map(Creature =>
                        <Row key={Creature.key} className="monster-row">
                            <Col xs={12} lg={7} className="border p-1">
                                <InputGroup className="">
                                    <InputGroup.Prepend>
                                        <Button onClick={this.handleEditCreature} data-key={Creature.key} variant="outline-success">&#x270E;</Button>
                                    </InputGroup.Prepend>
                                    <Form.Control name="name" value={Creature.name} placeholder="Creature Name" onChange={this.handleUpdateValue} data-key={Creature.key} />

                                    {Creature.href.length > 0 &&
                                        <InputGroup.Append>
                                            <Button href={Creature.href} target="_blank" variant="info">&#x1f517;</Button>
                                        </InputGroup.Append>
                                    }
                                </InputGroup>
                            </Col>
                            <Col xs={4} lg={2} className="border p-1 text-center">
                                <InputGroup className="">
                                    <Form.Control name="hp" value={Creature.hp} onChange={this.handleUpdateValue} data-key={Creature.key} />
                                    <InputGroup.Text>/ {Creature.max_hp}</InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col xs={4} lg={2} className="border p-1 text-center">
                                {Creature.ac}
                            </Col>
                            <Col xs={4} lg={1} className="border p-1 text-center">
                                <InputGroup className="">
                                    <Form.Control name="init" value={Creature.init} placeholder={"d20" + mod(Creature.init_mod)} onChange={this.handleUpdateValue} data-key={Creature.key}/>
                                    <InputGroup.Append>
                                        <Button onClick={this.handleRollInit} data-key={Creature.key} title={"d20" + mod(Creature.init_mod)}>&#8634;</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Row>
                    )}
                </div>
            }

            {this.state.Encounter.creatures.length < 1 &&
                <p>No creatures in encounter yet.</p>
            }
            <Modal show={this.state.showCreatureModal} onHide={this.handleClose}>
                <Form onSubmit={this.handleCreatureSubmit} method="post">
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.Creature.key ? "Edit" : "Add"} Creature/Character</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control name="key" type="hidden" defaultValue={this.state.Creature.key} />
                        <Form.Control name="hp" type="hidden" defaultValue={this.state.Creature.hp} />
                        <Form.Control name="init" type="hidden" defaultValue={this.state.Creature.init} />
                        <Form.Control name="href" type="hidden" defaultValue={this.state.Creature.href} />

                        <Form.Group>
                            <Form.Label>Creature/Character Name</Form.Label>
                            <Form.Control name="name" defaultValue={this.state.Creature.name} type="text" placeholder="Creature name" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label><b>Max</b> Health Points</Form.Label>
                            <Form.Control name="max_hp" defaultValue={this.state.Creature.max_hp} type="number" placeholder="Max HP" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Armor Class</Form.Label>
                            <Form.Control name="ac" defaultValue={this.state.Creature.ac} type="text" placeholder="AC" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Initiative <b>Modifier</b></Form.Label>
                            <Form.Control name="init_mod" defaultValue={this.state.Creature.init_mod} type="number" placeholder="+0" />
                            <Form.Text className="">AKA: Dex Modifier</Form.Text>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>

                        <Button onClick={this.handleRemoveCreature} data-key={this.state.Creature.key} variant="outline-danger">&#10008; Remove Creature</Button>

                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>

                        <Button type="submit" variant="primary">
                            {this.state.Creature.key ? "Save" : "Add"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={this.state.showFile} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>File - Save or Open Encounter Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group>
                        <Form.Label>Load File</Form.Label>
                        <Form.Control type="file" name="file" placeholder="Load File" accept=".dndem" onChange={this.handleLoadFile} />
                    </Form.Group>

                    <hr/>

                    <Form.Group>
                        <Button href={this.state.downloadURL} download="encounter.dndem" block>Download Encounter</Button>
                    </Form.Group>
                </Modal.Body>
            </Modal>
        </DefaultTemplate>)
    }

    handleUpdateValue(e){
        const key = e.target.dataset.key;
        const field = e.target.name;
        const value = e.target.value;
        this.EncounterDataHandler.updateCreature(key, field, value);
        this.updateEncounterState();
    }

    handleRollInit(e){
        const key = e.target.dataset.key;
        this.EncounterDataHandler.rollInit(key)
        this.updateEncounterState();
    }

    updateEncounterState(){
        this.setState({Encounter: this.EncounterDataHandler.getEncounterData()});
    }

    handleAddCreature(){
        this.setState({showCreatureModal: true, Creature: this.blankCreature});
    }

    handleEditCreature(e){
        const key = e.currentTarget.dataset.key;
        const Creature = this.EncounterDataHandler.getCreature(key);
        this.setState({showCreatureModal: true, Creature: Creature })
    }

    handleRemoveCreature(e){
        const key = e.currentTarget.dataset.key;
        if(window.confirm('Are you sure?')){
            this.EncounterDataHandler.removeCreature(key);
            this.updateEncounterState();
        }
        this.handleClose();
    }

    handleShowFileModal(){
        const data = this.EncounterDataHandler.getEncounterData();
        const url = this.FileUtility.makeJsonFile(data);
        this.setState({downloadURL: url, showFile: true});
    }

    handleClose(){
        this.setState({showCreatureModal: false, showFile: false, downloadURL: ''});
    }

    handleCreatureSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        var Creature = {
            key: form.key.value,
            name: form.name.value,
            max_hp: form.max_hp.value,
            hp: form.hp.value || form.max_hp.value,
            ac: form.ac.value,
            init_mod: parseInt(form.init_mod.value) || 0,
            init: form.init.value,
            href: form.href.value,
            note: ''
        };
        this.EncounterDataHandler.setCreature(Creature);
        this.updateEncounterState();
        this.handleClose();
    }

    handleLoadedFile(e){
        this.EncounterDataHandler.updateEncounterData(e.target.result);
        this.updateEncounterState();
    }

    handleLoadFile(e){
        this.FileUtility.readFile(e.target.files[0], this.handleLoadedFile.bind(this));
    }
}
