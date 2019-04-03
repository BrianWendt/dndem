import Monsters from './Monsters';
import { xp } from './xp';

export default class MonsterDataHandler {
    
    _data = [];
    filterName = '';
    filterCR = 'all';
    filterRace = 'all';
    sortField = 'name';
    sortDir = 1;
    
    pageNumber = 1;
    perPage = 50;
    
    constructor(){
        this._data = Monsters.Monsters;
    }
    
    get(id){
        const MonsterData = Monsters.Monsters.find(function(Monster){
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
        const start_idx = ((this.pageNumber - 1) * this.perPage);
        const end_idx = start_idx + this.perPage;
        return this.data().filter(function(Monster, idx) {
            return (idx >= start_idx && idx < end_idx);
        });
    }
    
    pages(){
        return Math.ceil(this.data().length / this.perPage);
    }
    
    setPageNumber(number){
        this.pageNumber = parseInt(number);
    }
    
    /*  Sorting direction is toggled by `dir` being 1 or -1 */
    sortBy(field, dir){
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
        return (field === this.sortField) ? (this.sortDir * -1) : 1;
    }
      
    filtered(){
        return (this.filterCR !== 'all' || this.filterRace !== 'all');
    }
    
    filterByCR(value){
        this.filterCR = value;
    }
    
    filterByRace(value){
        this.filterRace = value;
    }
    
    _filter(data){
        
        /* Filter by CR */
        var cr_min = 0;
        var cr_max = 10000;
        
        if(this.filterCR === 'all'){
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
        if(this.filterRace !== 'all'){
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