import Monsters from './Monsters';
import { xp } from './xp';

export default class MonsterDataHandler {
    
    _data = [];
    filterName = "";
    filterCR = null;
    filterRace = null;
    sortField = 'name';
    sortDir = 1;
    
    pageNumber = 1;
    perPage = 50;
    
    constructor(){
        this._data = Monsters.Monsters;
    }
    
    getFilterName(){ return this.filterName || ""; }
    getFilterCR(){ return (typeof this.filterCR == "string") ? this.filterCR : "all"; }
    getFilterRace(){ return this.filterRace || "all"; }
    getSortField(){ return this.sortField || "name"; }
    getSortDir(){ return parseInt(this.sortDir) || 1; }
    getPageNumber(){ return parseInt(this.pageNumber) || 1; }
    getPerPage(){ return this.perPage; }
    
    setPageNumber(number){  this.pageNumber = parseInt(number); }
    filterByCR(value){ this.filterCR = value; }
    filterByRace(value){ this.filterRace = value; }
    
    get(id){
        const MonsterData = this._data.find(function(Monster){
            return (Monster.id === id);
        });
        return (MonsterData === false) ? false :  new Monster(MonsterData);
    }
    
    data(){
        var data = []
        this._filter(this._data).map(MonsterData => {
            data.push(new Monster(MonsterData));
            return true;
        })
        
        return data;
    }
    
    pageData(){
        const start_idx = ((this.getPageNumber() - 1) * this.getPerPage());
        const end_idx = start_idx + this.getPerPage();
        return this.data().filter(function(Monster, idx) {
            return (idx >= start_idx && idx < end_idx);
        });
    }
    
    pages(){
        return Math.ceil(this.data().length / this.getPerPage());
    }
    
    /*  Sorting direction is toggled by `dir` being 1 or -1 */
    sortBy(field, dir = null){
        this.sortField = field;
        this.sortDir = dir;
        
        switch(field){
            
            case 'cr':
                this._data.sort((a, b) => ((a._cr > b._cr) ? 1 : -1) * dir);
                break;
                
            case 'ac':
                this._data.sort((a, b) => ((parseInt(a.armorClass) > parseInt(b.armorClass)) ? 1 : -1) * dir);
                break;
                
            case 'hp':
                this._data.sort((a, b) => ((a.hitPoints.average > b.hitPoints.average) ? 1 : -1) * dir);
                break;
                
            case 'race':
                this._data.sort((a, b) => ((a.race > b.race) ? 1 : -1) * dir);
                break;

            default: //name
                this._data.sort((a, b) => ((a.name > b.name) ? 1 : -1) * dir);
                break;
        }
    }
    
    sortDirSwitch(field){
        console.log('switch', field, this.getSortField())
        return (field === this.getSortField()) ? (this.getSortDir() * -1) : 1;
    }
      
    isFiltered(){  return (this.getFilterCR() !== 'all' || this.getFilterRace() !== 'all'); }
    
    _filter(data){
        
        /* Filter by CR */
        var cr_min = 0;
        var cr_max = 10000;
        if(this.getFilterCR() === 'all'){
            //skip
        } else if(this.filterCR.indexOf('-')>0){
            [cr_min, cr_max] = this.filterCR.split('-');
        } else {
            cr_min = cr_max = parseInt(this.filterCR);
        }
        
        data = data.filter(function(Monster){
            return (Monster._cr >= cr_min && Monster._cr <= cr_max);
        });
        
        /* Filter By Race */
        if(this.getFilterRace() !== 'all'){
            data = data.filter(function(Monster){
                return (this.filterRace === Monster.race);
            }, this);
        }
        
        return data;
    }
};


class Monster {
    constructor(MonsterData){
        Object.assign(this, MonsterData);
        this.xp = xp(this._cr);
        this.initiativeMod = this.abilityScores.DEX.mod;
    }
}