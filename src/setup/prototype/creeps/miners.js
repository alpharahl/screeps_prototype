Object.defineProperty(Creep.prototype, 'miningSource', {
  get: function(){
    return Game.getObjectById(this.memory.source);
  },

  enumerable: false,
  configurable: true
})

Creep.prototype.moveToMine = function(){
  var position = this.miningSource.miningSpot;
  if (this.carry[RESOURCE_ENERGY] == 50){
    if (this.upgradeController(this.room.controller) === ERR_NOT_IN_RANGE){
      this.moveTo(this.room.controller);
    }
    this.speak('crappy keep alive')
  }
  else {
    if (this.pos.x === position.x && this.pos.y === position.y){
      this.speak('mining');
      this.harvest(this.miningSource);
    } else {
      this.moveTo(position.x, position.y)
      this.speak('moving');
    }
  }

}