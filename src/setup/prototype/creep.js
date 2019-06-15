require('setup_prototype_creeps_miners');
require('setup_prototype_creeps_upgraders');
require('setup_prototype_creeps_builder');

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

Object.defineProperty(Creep.prototype, 'energy', {
  get: function(){
    if (!this._energy){
      this._energy = this.carry[RESOURCE_ENERGY]
    }
    return this._energy;
  }
});

Creep.prototype.getEnergy = function(){
  var containers = this.room.find(FIND_STRUCTURES, {
    filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                   i.energy() > 0
  })
  if (containers[0]){
    if (this.withdraw(containers[containers.length - 1], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
      this.moveTo(containers[containers.length - 1])
    }
  }
}

Object.defineProperty(Creep.prototype, 'working', {
  get(){
    if (!this._working){
      if (this.memory.working === undefined){
        this.memory.working = false
      }
      this._working = this.memory.working;
    }
    return this._working;
  },
  set(value){
    this.memory.working = value;
    this._working = value;
  }
})

Creep.prototype.isFull = function(){
  return _.sum(this.carry) === this.carryCapacity;
}

Creep.prototype.isWorking = function(){
  if (this.isFull){
    this.working = true;
  }
  if (this.energy === 0){
    this.working = false;
  }
}