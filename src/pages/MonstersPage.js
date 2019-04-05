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

        this.EncounterDataHandler = new EncounterDataHandler('encounter');
        
        this.handleQueryLinkClick = this.handleQueryLinkClick.bind(this);
        this.handleSortLinkClick = this.handleSortLinkClick.bind(this);
        this.handlePaginationLinkClick = this.handlePaginationLinkClick.bind(this);
        
        this.state = {
            MonsterDataHandler: new MonsterDataHandler(),
            query: (typeof this.props.location.search === 'undefined' ) ? {} : queryString.parse(this.props.location.search)
        };

        this.headers = [
            {name: 'name', title:'Creatue Name', width:''},
            {name: 'race', title:'Race', width:'135'},
            {name: 'cr', title:'CR', width:'90'},
            {name: 'ac', title:'AC', width:'260'},
            {name: 'hp', title:'HP', width:'90'},
        ];
        
        
        this.races = [];
        this.state.MonsterDataHandler._data.map(function(Monster){
            if(this.races.indexOf(Monster.race) < 0){
                this.races.push(Monster.race)
            }
            return true;
        }, this);
        this.races.sort();
        this.races.unshift('all');
    }
    
    render() {
        
        this.state.MonsterDataHandler.sortBy(this.state.query.sortField, this.state.query.sortDir);
        this.state.MonsterDataHandler.filterByCR(this.state.query.filterCr);
        this.state.MonsterDataHandler.filterByRace(this.state.query.filterRace);
        this.state.MonsterDataHandler.setPageNumber(this.state.query.page)

        return (<DefaultTemplate>
            
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        {this.renderHeaders()}
                        <th width="30"></th>
                    </tr>
                    <tr>
                        <th>
                            
                        </th>
                        <th>
                            <DropdownButton title={this.state.MonsterDataHandler.getFilterRace()} className="block" size="sm">
                                {this.races.map(Race =>
                                    <Dropdown.Item key={Race} onClick={this.handleQueryLinkClick} data-filter-race={Race}>{Race}</Dropdown.Item>
                                )}
                            </DropdownButton>
                        </th>
                        <th>
                            <DropdownButton title={this.state.MonsterDataHandler.getFilterCR()} className="block" size="sm">
                                <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("all")}> - all cr's - </Dropdown.Item>
                                <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("0-1")}>0-1</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("2")}>2</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("3")}>3</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("4")}>4</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("5")}>5</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("6-10")}>6-10</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("11-15")}>11-15</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("16-20")}>16-20</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("21-25")}>21-25</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("26-30")}>26-30</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("31-10000")}>31+</Dropdown.Item>
                            </DropdownButton>
                        </th>

                        <th>
                            {this.state.MonsterDataHandler.isFiltered() &&
                                <Button onClick={this.handleClearFiltersLinkClick.bind(this)} variant="light" size="sm">&#10008; Clear Filters</Button>
                            }
                        </th>
                        
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.MonsterDataHandler.pageData().map(Monster => 
                        <tr key={Monster.id}>
                            <td><a href={("#/monster/" + Monster.id)}>{Monster.name}</a></td>
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
            <Pagination className="justify-content-center" size="md">{this.renderPaginationItems()}</Pagination>
            
        </DefaultTemplate>);
  }
  
  renderPaginationItems(){
    let items = [];
    for (let number = 1; number <= this.state.MonsterDataHandler.pages(); number++) {
        items.push(
            <Pagination.Item key={number} active={number === this.state.MonsterDataHandler.getPageNumber()} onClick={this.handlePaginationLinkClick} data-page={number}>
                {number}
            </Pagination.Item>,
        );
    }
    return items;
  }
  
  renderHeaders(){
        var headers = [];
        this.headers.map(field => {
            let className = 'none';
            if(field.name === this.state.MonsterDataHandler.getSortField()){
                className = this.state.MonsterDataHandler.getSortDir() > 0 ? 'asc' : 'desc';
            }
            headers.push(
                <th key={field.name} width={field.width}>
                    <Button onClick={this.handleSortLinkClick} data-sort-field={field.name} size="sm" variant="link" block className={className}>
                        {field.title}
                    </Button>
                </th>
                    );
            return true;
        });
        return headers;
  }
  
  addToEncounter(Monster){
      this.EncounterDataHandler.addMonster(Monster);
      alert(Monster.name + " added to encounter.")
  }
  
  handleQueryLinkClick(e){
      this.query(Object.assign({}, e.target.dataset));
  }
  
  handleSortLinkClick(e){
      var data = Object.assign({}, e.target.dataset);
      data.sortDir = this.state.MonsterDataHandler.sortDirSwitch(data.sortField);
      this.query(data);
  }
  
  handlePaginationLinkClick(e){
      var data = Object.assign({}, e.target.dataset);
      this.query(data, false, data.page);
  }
  
  handleClearFiltersLinkClick(){
      this.query({
          filterName: '',
          filterRace: 'all',
          filterCr: 'all'
      }, true);
  }
  
  query(data, clear = false, page = 1){
      var query;
      if(clear){
        query = data;
      } else {
        const queryClone = Object.assign({}, this.state.query); //clone
        query = Object.assign(queryClone, data);
      }
      query.page = page;
      const href = this.props.location.pathname + '?' + queryString.stringify(query);
      this.props.history.push(href);
      this.setState({query: query})
  }
};