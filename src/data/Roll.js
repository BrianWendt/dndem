// Simple dice rolling utility by Brian Wendt.
// Nothing fancy yet. This may be replaced with Morgul/rpgdice in the future.
// Todo: replace Math.random for improved randomness.

const Roll = {
        d2: function(){ return this.dX(2); },
        d3: function(){ return this.dX(3); },
        d4: function(){ return this.dX(4); },
        d6: function(){ return this.dX(6); },
        d8: function(){ return this.dX(8); },
        d10: function(){ return this.dX(10); },
        d12: function(){ return this.dX(12); },
        d20: function(){ return this.dX(20); },
        d100: function(){ return this.dX(100); },
        
        dX: function(x){
            return Math.floor(Math.random() * Math.floor(x));
        }
};

export default Roll;