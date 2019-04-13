import React from 'react';
import { Dropdown, DropdownButton, Button, Row, Col, Pagination } from 'react-bootstrap';
import $ from 'jquery';
import DefaultTemplate from '../templates/DefaultTemplate';
import PaginationItems from '../components/PaginationItems';

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

        this.columns = [
            {lg: 4, xs: 8}, // Name
            {lg: 3, xs: 4}, // Race

            {lg: 1, xs: 3}, //CR
            {lg: 3, xs: 5}, //AC
            {lg: 1, xs: 4} // HP
        ];

        this.headers = [
            {name: 'name', title:'Creatue Name', width:''},
            {name: 'race', title:'Type', width:'135'},
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
        this.state.MonsterDataHandler.setPageNumber(this.state.query.page || 1)

        return (<DefaultTemplate>
            <Row>
                <Col lg="3">
                    <div className="form-group">
                        <DropdownButton title={"Filter by Type: " + this.state.MonsterDataHandler.getFilterRace()} className="block">
                            {this.races.map(Race =>
                                <Dropdown.Item key={Race} onClick={this.handleQueryLinkClick} data-filter-race={Race}>Filter Type: {Race}</Dropdown.Item>
                            )}
                        </DropdownButton>
                    </div>
                    <div className="form-group">
                        <DropdownButton title={"Filter by CR: " + this.state.MonsterDataHandler.getFilterCR()} className="block">
                            <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("all")}> - all CR's - </Dropdown.Item>
                            <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("0-1")}>CR 0-1</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("2")}>CR 2</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("3")}>CR 3</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("4")}>CR 4</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("5")}>CR 5</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("6-10")}>CR 6-10</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("11-15")}>CR 11-15</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("16-20")}>CR 16-20</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("21-25")}>CR 21-25</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("26-30")}>CR 26-30</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleQueryLinkClick} data-filter-cr={("31-10000")}>CR 31+</Dropdown.Item>
                        </DropdownButton>
                    </div>

                    {this.state.MonsterDataHandler.isFiltered() &&
                        <div className="form-group">
                            <Button onClick={this.handleClearFiltersLinkClick.bind(this)} variant="light" size="sm">&#10008; Clear Filters</Button>
                        </div>
                    }
                </Col>
                <Col lg="9">
                    <Row className="monster-row">
                        {this.renderHeaderCols()}
                    </Row>
                    {this.state.MonsterDataHandler.pageData().map(Monster =>
                        <Row key={Monster.id} className="monster-row">
                            <Col {...this.columns[0]} className="border">
                                <Button onClick={this.addToEncounter.bind(this, Monster)} size="sm" variant="success" className="btn-margin-right">+</Button>
                                <a href={("#/monster/" + Monster.id)}>{Monster.name}</a>
                            </Col>
                            <Col {...this.columns[1]} className="border">
                                {Monster.race}
                            </Col>
                            <Col {...this.columns[2]} className="border text-center">
                                <span className="text-muted d-lg-none">CR:</span> {Monster.cr}
                            </Col>
                            <Col {...this.columns[3]} className="border">
                                <span className="text-muted d-lg-none">AC:</span> {Monster.armorClass}
                            </Col>
                            <Col {...this.columns[4]} className="border text-center">
                                <span className="text-muted d-lg-none">HP:</span> {Monster.hitPoints.average}
                            </Col>
                        </Row>
                    )}

                    <Pagination className="justify-content-center mt-3" size="md">
                        <PaginationItems itemCount={this.state.MonsterDataHandler.pages()} activeItem={this.state.MonsterDataHandler.getPageNumber()} itemOnClick={this.handlePaginationLinkClick} />
                    </Pagination>
                </Col>
            </Row>



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

    renderHeaderCols(){
        var headers = [];

        this.headers.map((field, idx) => {
            let className = 'none';
            if(field.name === this.state.MonsterDataHandler.getSortField()){
                className = this.state.MonsterDataHandler.getSortDir() > 0 ? 'asc' : 'desc';
            }
            headers.push(
                <Col key={field.name} className="border" {...this.columns[idx]}>
                    <Button onClick={this.handleSortLinkClick} data-sort-field={field.name} size="sm" variant="link" block className={className}>
                        {field.title}
                    </Button>
                </Col>
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
      var data = Object.assign({}, e.currentTarget.dataset);
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
      $("html, body").animate({ scrollTop: 0 }, "fast");
      this.setState({query: query})
  }
};
