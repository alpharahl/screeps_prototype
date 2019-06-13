Creep.prototype.upgrade = function(){
  this.isWorking();
  if (this.working){
    this.speak('⚒')
    if (this.upgradeController(this.room.controller) === ERR_NOT_IN_RANGE){
      this.moveTo(this.room.controller)
    }
  } else {
    this.speak('☀️')
    this.getEnergy();
  }
};
