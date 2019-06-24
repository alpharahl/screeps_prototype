function Reserver(creep){
  this.creep = creep;
  this.memory = creep.memory;
  this.roomName = creep.memory.remote;
  this.room = creep.room;
}

Reserver.prototype.run = function(){
  if (!this.memory.ticksToTravel){
    this.memory.ticksToTravel = 0;
  }

  if (this.controller){
    if (this.creep.reserveController(this.controller) === ERR_NOT_IN_RANGE){
      this.creep.moveTo(this.controller);
      this.memory.ticksToTravel++;
    } else {
      if (this.ticksToLive && this.creep.ticksToLive === this.memory.ticksToTravel * 2/3){
        Game.rooms[this.memory.home].memory.reservers[this.room.name] = null;
      }
    }

  } else {
    // can't see the room yet, need to move to it
    this.creep.moveToRoom(this.roomName)
    this.memory.ticksToTravel++;
  }
}

Object.defineProperty(Reserver.prototype, 'controller', {
  get(){
    if (!this._controller){
      if (!this.memory.controller){
        if (this.roomName === this.creep.room.name){
          this.memory.controller = this.room.controller.id;
        }
      }
      this._controller = Game.getObjectById(this.memory.controller)
    }
    return this._controller;
  }
})

module.exports = Reserver;
