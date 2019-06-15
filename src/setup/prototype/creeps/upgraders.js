Creep.prototype.upgrade = function(){
  this.isWorking();
  if (this.working){
    if (this.room.towers && this.room.towers[0].energy < 750) {
      if (this.transfer(this.room.towers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.moveTo(this.room.towers[0])
      }
    } else {
        this.speak('⚒')
        if (this.upgradeController(this.room.controller) === ERR_NOT_IN_RANGE){
          this.moveTo(this.room.controller)
        }
      }
    } else {
      this.speak('☀️')
      this.getEnergy();
  }
};
