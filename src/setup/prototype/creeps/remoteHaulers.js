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
    var res = ERR_NOT_FOUND;
    if (this.remoteSource){
      res = this.moveByPath(this.remoteSource.pathToStorage);
    }
    this.speak(res);
    if (res === OK){
      return;
    } else if (res === ERR_NOT_FOUND){
      this.moveTo(new RoomPosition(25,25,this.memory.home));
    }
    this.fillStorage();
  } else {
    var res = ERR_NOT_FOUND;
    if (this.remoteSource){
      res = this.moveByPath(this.remoteSource.pathFromStorage);
    }
    if (res === OK){
      return;
    } else if(res === ERR_NOT_FOUND){
      if (this.remoteSource){
        this.moveTo(this.remoteSource.container);
      } else {
        this.moveTo(new RoomPosition(25,25, this.memory.remote))
      }
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
  if (this.remoteSource){
    this.withdraw(this.remoteSource.container, RESOURCE_ENERGY)
  } else {
    this.moveTo(new RoomPosition(25,25,this.memory.remote));
  }

}