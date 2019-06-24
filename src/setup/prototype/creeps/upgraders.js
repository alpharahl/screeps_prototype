Creep.prototype.upgrade = function(){
  this.isWorking();
  if (this.working){
    this.speak('👆')
    if (this.upgradeController(this.room.controller) === ERR_NOT_IN_RANGE){
      this.moveTo(this.room.controller)
    }
  } else {
    this.speak('☀️')
    if (this.room.memory.controllerStorage && this.room.memory.controllerStorage !== 'building'){
      var storage = Game.getObjectById(this.room.memory.controllerStorage);
      if (storage.store[RESOURCE_ENERGY] > 0){
        if (this.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
          this.moveTo(storage)
        }
        return;
      }
    }
    this.getEnergy();

  }
};
