import React from 'react';
import { Table, Dropdown, DropdownButton, Button, Pagination } from 'react-bootstrap';
import DefaultTemplate from '../templates/DefaultTemplate';

import queryString from 'query-string';

import MonsterDataHandler from '../data/MonsterDataHandler';
import EncounterDataHandler from '../data/EncounterDataHandler';


export default class MonstersPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        document.title = 'DnDEM - Monsters';

        this.MonsterDataHandler = new MonsterDataHandler();
        this.EncounterDataHandler = new EncounterDataHandler('encounter');
        
        this.queryString = (typeof this.props.location.search === 'undefined' ) ? {} : queryString.parse(this.props.location.search);

        this.headers = [
            {name: 'name', title:'Creatue Name',width:'',className:'interactive'},
            {name: 'race', title:'Race',width:'135',className:'interactive'},
            {name: 'cr', title:'CR',width:'90',className:'interactive text-center'},
            {name: 'ac', title:'AC',width:'260',className:'interactive'},
            {name: 'hp', title:'HP',width:'90',className:'interactive text-center'},
        ];
        
        this.races = [];
        this.MonsterDataHandler.data().map(function(Monster){
            if(this.races.indexOf(Monster.race) < 0){
                this.races.push(Monster.race)
            }
            return true;
        }, this);
        this.races.sort();
        
        this.MonsterDataHandler.sortBy(this.queryVal('sortField', 'name'), parseInt(this.queryVal('sortDir', 1)));
        this.MonsterDataHandler.filterByCR(this.queryVal('filter_cr', 'all'));
        this.MonsterDataHandler.filterByRace(this.queryVal('filter_race', 'all'));
        this.MonsterDataHandler.setPageNumber(this.queryVal('page', 1))
    }
    
    render() {

        return (<DefaultTemplate>
            
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        {this.headers.map(field => 
                        <th key={field.name} width={field.width} className={field.className}>
                            <a href={this.sortLink(field.name)}>{field.title}</a>
                            {field.name === this.queryVal('sortField') &&
                                    <small> ({this.queryVal('sortDir', 1) > 0 ? 'asc' : 'desc'})</small>
                            }
                        </th>
                        )}
                        <th width="30"></th>
                    </tr>
                    <tr>
                        <th>
                            
                        </th>
                        <th>
                            <DropdownButton title={this.queryVal('filter_race', 'all')} className="block" size="sm">
                                <Dropdown.Item href={this.filterRace("all")}> - all races -</Dropdown.Item>
                                {this.races.map(Race =>
                                    <Dropdown.Item key={Race} href={this.filterRace(Race)}>{Race}</Dropdown.Item>
                                )}
                            </DropdownButton>
                        </th>
                        <th>
                            <DropdownButton title={this.queryVal('filter_cr', 'all')} className="block" size="sm">
                                <Dropdown.Item href={this.filterCR("all")}> - all cr's - </Dropdown.Item>
                                <Dropdown.Item href={this.filterCR("0-1")}>0-1</Dropdown.Item>
                                <Dropdown.Item href={this.filterCR("2")}>2</Dropdown.Item>
                                <Dropdown.Item href={this.filterCR("3")}>3</Dropdown.Item>
                                <Dropdown.Item href={this.filterCR("4")}>4</Dropdown.Item>
                                <Dropdown.Item href={this.filterCR("5")}>5</Dropdown.Item>
                                <Dropdown.Item href={this.filterCR("6-10")}>6-10</Dropdown.Item>
                                <Dropdown.Item href={this.filterCR("11-15")}>11-15</Dropdown.Item>
                                <Dropdown.Item href={this.filterCR("16-20")}>16-20</Dropdown.Item>
                                <Dropdown.Item href={this.filterCR("21-25")}>21-25</Dropdown.Item>
                                <Dropdown.Item href={this.filterCR("26-30")}>26-30</Dropdown.Item>
                                <Dropdown.Item href={this.filterCR("31-10000")}>31+</Dropdown.Item>
                            </DropdownButton>
                        </th>

                        <th>
                            {this.MonsterDataHandler.filtered() &&
                                <Button href={this.clearFiltersLink()} variant="light" size="sm">&#10008; Clear Filters</Button>
                            }
                        </th>
                        
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.MonsterDataHandler.pageData().map(Monster => 
                        <tr key={Monster.id}>
                            <td><a href={("/monster/" + Monster.id)}>{Monster.name}</a></td>
                            <td>{Monster.race}</td>
                            <td className="text-center">{Monster.cr}</td>
                            <td>{Monster.armorClass}</td>
                            <td className="text-center">{Monster.hitPoints.average}</td>
                            <td>
                                <Button onClick={this.addToEncounter.bind(this, Monster)} size="sm" variant="success">+</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Pagination className="justify-content-center" size="md">{this.paginationItems()}</Pagination>
            
        </DefaultTemplate>);
  }
  
  paginationItems(){
    let items = [];
    for (let number = 1; number <= this.MonsterDataHandler.pages(); number++) {
        const href = this.filterLink({page: number});
        items.push(
            <Pagination.Item key={number} active={number === this.MonsterDataHandler.pageNumber} href={href}>
                {number}
            </Pagination.Item>,
        );
    }
    return items;
  }
  
  addToEncounter(Monster){
      this.EncounterDataHandler.addMonster(Monster);
      alert(Monster.name + " added to encounter.")
  }
  
  filterCR(value){
      return this.filterLink({filter_cr:value, page: 1});
  }
  
  filterRace(value){
      return this.filterLink({filter_race:value, page: 1});
  }
  
  filterLink(values = {}){
      const query = Object.assign({}, this.queryString); //clone
      return '?' + queryString.stringify(Object.assign(query, values));
  }
  
  sortLink(field){
      var query = {
          sortField: field,
          sortDir: this.MonsterDataHandler.sortDirSwitch(field),
          page: 1
      };
      return this.filterLink(query);
  }
  
  queryVal(key, default_val = null){
      return (typeof this.queryString[key] === 'undefined') ? default_val : this.queryString[key];
  }
  
  clearFiltersLink(){
      return '?' + queryString.stringify({sortField: this.MonsterDataHandler.sortField, sortDir: this.MonsterDataHandler.sortDir});
  }
};