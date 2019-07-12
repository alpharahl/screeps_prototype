Creep.prototype.remoteHaul = function(){
  this.isWorking();
  if (this.working){
    this.findAndRepairRoad()
    if (this.memory.home && this.room.name !== this.memory.home){
      if (this.room.find(FIND_CONSTRUCTION_SITES).length > 0){
        this.buildRun();
        return;
      }
    }
    if (this.memory.home && this.moveToRoom(this.memory.home, true)){
      return;
    }
    this.fillStorage();
  } else {
    if (this.memory.home && this.moveToRoom(this.memory.remote, true)){
      return;
    }
    if (this.removeOldStructures()){
      return;
    }
    this.pickupFromSource();
  }
}


Creep.prototype.removeOldStructures = function(){
  var structs = this.room.find(FIND_HOSTILE_STRUCTURES);
  if (structs.length > 0){
    if (this.dismantle(structs[0]) === ERR_NOT_IN_RANGE){
      this.moveTo(structs[0]);
    }
    return true;
  }
}

Object.defineProperty(Creep.prototype, 'remoteSource', {
  get(){
    if (!this._remoteSource){
      this._remoteSource = Game.getObjectById(this.memory.source);
    }
    return this._remoteSource
  }
})

Creep.prototype.pickupFromSource = function(){
  var res = this.withdraw(this.remoteSource.container, RESOURCE_ENERGY)
  if (res === ERR_NOT_IN_RANGE){
    this.moveTo(this.remoteSource.container);
  }
}