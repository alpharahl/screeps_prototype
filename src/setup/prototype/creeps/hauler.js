Creep.prototype.haul = function() {
  this.isWorking();
  if (this.working) {
    if (this.fillExtensions()){
      return;
    }
    if (this.fillSpawns()){
      return;
    }
    this.speak('🚚')
    if (this.fillTowers()){
      return;
    }
    if (this.fillBuilders()){
      return;
    }
    if (this.fillStorage()){
      return;
    }
    if (this.fillUpgrader()){
      return;
    }
  }else {
    this.speak('☀️')
    this.getEnergyForHaul();
  }
}

Creep.prototype.getEnergyForHaul = function(){
  var container = this.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: (i) => {
      return i.structureType === STRUCTURE_CONTAINER &&
        i.store[RESOURCE_ENERGY] > this.carryCapacity * 2/3 &&
        i.id !== this.room.memory.controllerStorage;
    }
  })
  if (container){
    if (this.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
      this.moveTo(container)
    }
  }

}

Creep.prototype.fillStorage = function(){
  if (this.room.storage){
    if (this.room.storage.energy < 500000){
      if (this.transfer(this.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
        this.moveTo(this.room.storage)
      }
      return true;
    }
  }
  return false;
}

Creep.prototype.fillTowers = function(){
  if (this.room.towers){
    for (const tower of this.room.towers){
      if (tower.energy < 750){
        if (this.transfer(tower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
          this.moveTo(tower);
        }
        return true;
      }
    }
  }
  return false;
}

Creep.prototype.fillUpgrader = function(){
  if (this.room.memory.controllerStorage && this.room.memory.controllerStorage !== 'building'){
    var container = Game.getObjectById(this.room.memory.controllerStorage);
    if (this.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
      this.moveTo(container);
      return true;
    }
  } else {

    if (this.room.upgraders.length > 0){

      var upgrader;
      for (const u of this.room.upgraders){
        var up = Game.getObjectById(u)
        if (!upgrader){
          upgrader = up;
        } else {
          if (up.energy < upgrader.energy){
            upgrader = up;
          }
        }
      }
      var res = this.transfer(upgrader, RESOURCE_ENERGY);

      if ( res === ERR_NOT_IN_RANGE){
        this.moveTo(upgrader);
      }
    }
  }
}

Creep.prototype.fillBuilders = function(){
  if (this.room.builders.length > 0){
    var builder;
    var builders = this.pos.findClosestByPath(FIND_MY_CREEPS, {
      filter: (i) => {
        return i.memory.type === 'builder'
      }
    })
    if (builders.length > 0){
      builder = builders[0]
      for (const b of builders){
        if (b.energy < builder.energy){
          builder = b;
        }
      }
    }
    if (!builder){
      return false;
    }
    var res = this.transfer(builder, RESOURCE_ENERGY)
    if (res === ERR_NOT_IN_RANGE){
      this.moveTo(builder);
      return true;
    } else if (res === OK){
      return true;
    }
  }
}

Creep.prototype.fillExtensions = function(){
  if (this.room.extensions.length > 0){
    for (const extension of this.room.extensions){
      if (extension.energy < extension.energyCapacity){
        this.memory.extension = extension.id;
        break;
      }
    }
  }
  if (this.memory.extension){
    var extension = Game.getObjectById(this.memory.extension);
    if (extension.energy < extension.energyCapacity){
      if (this.transfer(extension, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
        this.moveTo(extension);
      }
    } else {
      this.memory.extension = null;
    }
    return true;
  }
}

Creep.prototype.fillSpawns = function(){
  if (this.room.spawns.length > 0){
    for (const spawn of this.room.spawns){
      if (spawn.energy < spawn.energyCapacity){
        this.speak("in spawn")
        this._spawn = spawn.id;
        break;
      }
    }

    if (this._spawn){
      var spawn = Game.getObjectById(this._spawn)
        if (spawn.energy < spawn.energyCapacity){
        if (this.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
          this.moveTo(spawn);
        } else {
          this._spawn = null;
        }

      }
      return true;
    }
  }
}