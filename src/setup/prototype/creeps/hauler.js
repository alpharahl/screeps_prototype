Creep.prototype.haul = function() {
  this.isWorking();
  if (this.working) {
    this.speak('🚚')
    if (this.fillExtensions()){
      return;
    }
    if (this.fillSpawns()){
      return;
    }
    if (this.fillTowers()){
      return;
    }
    if (this.fillUpgrader()){
      return;
    }
  }else {
    this.speak('☀️')
    this.getEnergy();
  }
}

Creep.prototype.fillTowers = function(){
  if (this.room.towers && this.room.towers[0].energy < 750) {
    if (this.transfer(this.room.towers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      this.moveTo(this.room.towers[0])
      return true;
    }
  }
  return false;
}

Creep.prototype.fillUpgrader = function(){
  if (this.room.upgraders.length > 0)
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
        this.memory.spawn = spawn.id;
        break;
      }
    }

    if (this.memory.spawn){
      var spawn = Game.getObjectById(this.memory.spawn)
        if (spawn.energy < spawn.energyCapacity){
        if (this.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
          this.moveTo(spawn);
        } else {
          this.memory.spawn = null;
        }

      }
      return true;
    }
  }
}