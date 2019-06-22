require('setup_prototype_creeps_miners');
require('setup_prototype_creeps_upgraders');
require('setup_prototype_creeps_builder');
require('setup_prototype_creeps_hauler');
require('setup_prototype_creeps_queen');

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

Creep.prototype._moveTo = Creep.prototype.moveTo;
Creep.prototype.moveTo = function(target){
  if (this.memory.type === 'queen'){
    let cMatrix = new PathFinder.CostMatrix;
    for (const spot of this.room.queenAvoid){
      cMatrix.set(spot.x, spot.y, 30);
    }
    this._moveTo(target, {
      reusePath: 10,
      costCallback: cMatrix
    });
  } else {
    this._moveTo(target);
  }
}

Creep.prototype.getEnergy = function(){
  if (this.room.storage && this.room.storage.energy > 0){
    if (this.withdraw(this.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
      this.moveTo(this.room.storage);
    }
  } else {
    var container = this.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (i) => {
        return i.structureType === STRUCTURE_CONTAINER &&
          i.store[RESOURCE_ENERGY] > 50
      }
    })
    if (container){
      if (this.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
        this.moveTo(container)
      }
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