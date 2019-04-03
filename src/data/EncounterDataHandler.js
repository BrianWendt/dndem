import { Cookies } from 'react-cookie';
import uuidv1 from 'uuid/v1';
import Roll from './Roll';

export default class EncounterDataHandler {
    //key argument is present to provide future support for multiple encounters.
    
    constructor(key = 'encounter'){
        this.key = key;
        this.Cookies = new Cookies();
    }
    
    getEncounter(){
        return this.getEncounterData().sort((a, b) => ((a.init > b.init) ? -1 : 1));
    }
    
    getEncounterData(){
        return this.Cookies.get(this.key) || [];
    }
    
    updateEncounterData(data){
        this.Cookies.set(this.key, data, { path: '/', maxAge: 99999999 })
    }
    
    updateCreature(key, field, value){
        var data = this.getEncounterData().map(Creature => {
            if(Creature.key === key){
                Creature[field] = value;
            }
            return Creature;
        });
        this.updateEncounterData(data);
    }
    
    addCreature(Creature){
        var data = this.getEncounterData();
        Creature.key = uuidv1();
        data.push(Creature);
        this.updateEncounterData(data);
    }
    
    removeCreature(key){
        var data = this.getEncounterData().filter(function(Creature){
            return (Creature.key !== key);
        });
        
        this.updateEncounterData(data);
    }
    
    addMonster(Monster){
        var Creature = {
            name: Monster.name,
            max_hp: Monster.hitPoints.average,
            hp: Monster.hitPoints.average,
            init_mod: Monster.initiativeMod,
            init: Roll.d20() + Monster.initiativeMod,
            href: '#/monster/' + Monster.id,
            ac: Monster.armorClass,
            note: ''
        };
        this.addCreature(Creature);
    }
    
    rollInit(key){
        var init = 0;
        var data = this.getEncounterData().map(Creature => {
            if(Creature.key === key){
                init = Roll.d20() + Creature.init_mod
                Creature.init = init;
            }
            return Creature;
        });
        this.updateEncounterData(data);
        return init;
    }
}