import { Cookies } from 'react-cookie';
import uuidv1 from 'uuid/v1';
import Roll from './Roll';

export default class EncounterDataHandler {
    //key argument is present to provide future support for multiple encounters.

    /**
     * Create an EncounterDataHandler instance with given key.
     * @param {string} key - forward support for having multiple encounters loaded into cookie. 
     */
    constructor(key = 'encounter'){
        this.key = key;
        this.Cookies = new Cookies();
        
        this.defaultData = {
            "name": "",
            "creatures": []
        }
    }

    /**
     * Fetch the encounter data with creatures sorted by initiative rolls.
     * @return {object} encounter data
     */
    getEncounterData(){
        var data = this.Cookies.get(this.key) || this.defaultData;
        data.creatures = data.creatures.sort((a, b) => ((a.init > b.init) ? -1 : 1));
        return data;
    }

    /**
     * Update the value of a given field in the encounter data.
     * @param {string} field
     * @param {*} value 
     */
    updateEncounterField(field, value){
        var data = this.getEncounterData();
        data[field] = value;
        this.Cookies.set(this.key, data, { path: '/', maxAge: 99999999 });
    }
    
    /**
     * Update the creatures list in the encounter data
     * @param {array} creatures
     */
    updateEncounterCreatures(creatures){
        this.updateEncounterField("creatures", creatures);
    }

    /**
     * Get creature from encounter data by UUID key
     * @param {string} key - UUID key
     */
    getCreature(key){
        return this.getEncounterData().creatures.find(Creature => {
            return (Creature.key ===  key);
        });
    }

    /**
     * Update a field value on a creature.
     * @param {string} key - UUID key
     * @param {string} field
     * @param {*} value 
     */
    updateCreature(key, field, value){
        var creatures = this.getEncounterData().creatures.map(Creature => {
            if(Creature.key === key){
                Creature[field] = value;
            }
            return Creature;
        });
        this.updateEncounterCreatures(creatures);
    }

    /**
     * Add/Update creature.
     * If key uuid is set this function will handle the update. Otherwise it adds the creature.
     * @param {object} creature 
     */
    setCreature(Creature){
        var creatures = this.getEncounterData().creatures;
        if(typeof Creature.key === "string" && Creature.key.length > 0){
            creatures = creatures.map(_Creature => {
                if(_Creature.key === Creature.key){
                    _Creature = Creature;
                }
                return _Creature;
            });
            this.updateEncounterCreatures(creatures);
        } else {
            Creature.key = uuidv1();
            creatures.push(Creature);
            this.updateEncounterCreatures(creatures);
        }
    }

    /**
     * Remove creature by key
     * @param {string} key
     */
    removeCreature(key){
        var creatures = this.getEncounterData().creatures.filter(function(Creature){
            return (Creature.key !== key);
        });

        this.updateEncounterCreatures(creatures);
    }

    /**
     * Roll initiative for creature by their key uuid.
     * @param {string} key
     */
    rollInit(key){
        var init = 0;
        var data = this.getEncounterData().creatures.map(Creature => {
            if(Creature.key === key){
                init = Roll.d20() + Creature.init_mod
                Creature.init = init;
            }
            return Creature;
        });
        this.updateEncounterCreatures(data);
        return init;
    }
}
