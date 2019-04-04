import React from 'react';
import { Table, Form, InputGroup, Button, ButtonGroup, Modal } from 'react-bootstrap';

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
        this.handleAddCreatureSubmit = this.handleAddCreatureSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRemoveCreature = this.handleRemoveCreature.bind(this);
        this.handleShowFileModal = this.handleShowFileModal.bind(this);
        this.handleLoadFile = this.handleLoadFile.bind(this);
        
        this.state = {
            Encounter: this.EncounterDataHandler.getEncounter(),
            showAddCreature: false,
            showFile: false,
            downloadURL: ''
        };
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
        this.setState({Encounter: this.EncounterDataHandler.getEncounter()});
    }
    
    handleAddCreature(){
        this.setState({showAddCreature: true});
    }
    
    handleRemoveCreature(e){
        const key = e.target.dataset.key;
        if(window.confirm('Are you sure?')){
            this.EncounterDataHandler.removeCreature(key);
            this.updateEncounterState();
        }
    }
    
    handleShowFileModal(){
        const data = this.EncounterDataHandler.getEncounterData();
        const url = this.FileUtility.makeJsonFile(data);
        this.setState({downloadURL: url, showFile: true});
    }
    
    handleClose(){
        this.setState({showAddCreature: false, showFile: false, downloadURL: ''});
    }
    
    handleAddCreatureSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        var Creature = {
            name: form.name.value,
            max_hp: form.max_hp.value,
            hp: form.max_hp.value,
            ac: form.ac.value,
            init_mod: parseInt(form.init_mod.value),
            init: 0,
            href: '',
            note: ''
        };

        this.EncounterDataHandler.addCreature(Creature);
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
    
    render(){
            return (<DefaultTemplate>
                        <ButtonGroup className="mb-2">
                            <Button onClick={this.handleShowFileModal}>File</Button>
                            <Button href="#/monsters/" variant="success">&#10010; Add Monster From Directory</Button>
                            <Button onClick={this.handleAddCreature} variant="outline-success">&#10010; Add Creature/Character</Button>
                        </ButtonGroup>
                        
                        {this.state.Encounter.length > 0 &&
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Creature Name</th>
                                    <th width="130">HP</th>
                                    <th width="160">AC</th>
                                    <th width="105">Initiative</th>
                                    <th width="40"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Encounter.map(Creature => 
                                    <tr key={Creature.key}>
                                        <td>
                                            <InputGroup className="">
                                                <Form.Control name="name" value={Creature.name} placeholder="Creature Name" onChange={this.handleUpdateValue} data-key={Creature.key} />
                                                {Creature.href.length > 0 &&
                                                    <InputGroup.Append>
                                                        <Button href={Creature.href} target="_blank" variant="info">&#x1f517;</Button>
                                                    </InputGroup.Append>
                                                }
                                            </InputGroup>
                                        </td>
                                        <td>
                                            <InputGroup className="">
                                                <Form.Control name="hp" value={Creature.hp} onChange={this.handleUpdateValue} data-key={Creature.key} />
                                                <InputGroup.Text>/ {Creature.max_hp}</InputGroup.Text>
                                            </InputGroup>
                                        </td>
                                        <td>
                                            <Form.Control name="ac" value={Creature.ac} placeholder="Armor Class" onChange={this.handleUpdateValue} data-key={Creature.key} />
                                        </td>
                                        <td>
                                            <InputGroup className="">
                                                <Form.Control name="init" value={Creature.init} placeholder={"d20" + mod(Creature.init_mod)} onChange={this.handleUpdateValue} data-key={Creature.key}/>
                                                <InputGroup.Append>
                                                    <Button onClick={this.handleRollInit} data-key={Creature.key} title={"d20" + mod(Creature.init_mod)}>&#8634;</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </td>
                                        <td>
                                            <Button onClick={this.handleRemoveCreature} target="_blank" data-key={Creature.key} variant="outline-danger">&#10008;</Button>
                                        </td>

                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        }
                        {this.state.Encounter.length < 1 &&
                                <p>No creatures in encounter yet.</p>
                        }
                        <Modal show={this.state.showAddCreature} onHide={this.handleClose}>
                            <Form onSubmit={this.handleAddCreatureSubmit} method="post">
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Creature/Character</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <Form.Group>
                                        <Form.Label>Creature/Character Name</Form.Label>
                                        <Form.Control type="text" name="name" placeholder="Creature name" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Max Health Points</Form.Label>
                                        <Form.Control type="number" name="max_hp" placeholder="Max HP" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Armor Class</Form.Label>
                                        <Form.Control type="number" name="ac" placeholder="AC" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Initiative <b>Modifier</b></Form.Label>
                                        <Form.Control type="number" name="init_mod" placeholder="+0" defaultValue="+0" />
                                        <Form.Text className="">AKA: Dex Modifier</Form.Text>
                                    </Form.Group>

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="primary">
                                        Add
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
                                
                                {this.state.downloadURL.length > 0 &&
                                    <Form.Group>
                                        <Button href={this.state.downloadURL} download="encounter.dndem" block>Download Encounter</Button>
                                    </Form.Group>
                                }
                            </Modal.Body>
                        </Modal>
                    </DefaultTemplate>)
    }
}