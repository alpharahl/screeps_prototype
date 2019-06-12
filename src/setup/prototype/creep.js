require('setup_prototype_creeps_miners');

Creep.prototype.speak = function(words){
  this.say(words || this.type);
}

Object.defineProperty(Creep.prototype, 'type', {
  get: function(){
    return this.memory.type
  },

  enumerable: false,
  configurable: true
})

Object.defineProperty(Creep.prototype, 'working', {
  get: function(){

  }
})