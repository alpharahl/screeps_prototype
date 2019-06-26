function Road(pos1, pos2, room){
  this.room = room;
  this.start = pos1;
  this.end = pos2;
  this.id = room.name + '-' + pos1.toString() + '-' + pos2.toString();
}

Object.defineProperty(Road.prototype, 'path', {
  get(){
    if (!this._path){
      if (!this.memory.path){
        this.memory.path = Room.serializePath(this.room.idealPath(this.start, this.end));
      }
      this._path = Room.deserializePath(this.memory.path);
    }
    return this._path;
  }
})

Object.defineProperty(Road.prototype, 'ids', {
  get(){
    if (!this._ids){
      if (!this.memory.ids || Game.time % 100 === 0){
        this.memory.ids = {};
        for (const ind in this.path){
          const path = this.path[ind];
          const pos = new RoomPosition(path.x, path.y, this.room.name);
          var structures = pos.lookFor(LOOK_STRUCTURES);
          for (const struct of structures){
            if (struct.structureType === STRUCTURE_ROAD){
              this.memory.ids.push(struct.id);
            }
          }
        }
      }
      this._ids = this.memory.ids;
    }
    return this._ids;
  }
})

Object.defineProperty(Road.prototype, 'positions', {
  get(){
    if (!this._positions){
      if (!this.memory.positions){
        var positions = [];
        for (const ind in this.path){
          const path = this.path[ind];
          positions.push(new RoomPosition(path.x, path.y, this.room.name));
        }
        this.memory.positions = positions;
      }
      this._positions = [];
      for (const pos of this.memory.positions){
        this._positions.push(new RoomPosition(pos.x, pos.y, this.room.name));
      }
    }
    return this._positions;
  }
})

Object.defineProperty(Road.prototype, 'emptySpots', {
  get(){
    if (!this._emptySpots){
      this._emptySpots = [];
      for (const spot of this.positions){
        var structs = spot.lookFor(LOOK_STRUCTURES);
        if (structs.length === 0){
          this._emptySpots.push(spot);
        }
      }
    }
    return this._emptySpots;
  }
})

Road.prototype.construct = function(){
  for (const spot of this.emptySpots){
    new RoomVisual(this.room.name).circle(spot, {fill: 'blue'})
    if (spot.createConstructionSite(STRUCTURE_ROAD) === 'OK'){
      return;
    }
  }
}

Road.prototype.draw = function(){
  for (const ind in this.path){
    const step = this.path[ind];
    var pos = new RoomPosition(step.x, step.y, this.room.name);
    new RoomVisual(this.room.name).circle(pos, {fill: 'red'});
  }
}

Object.defineProperty(Road.prototype, 'memory', {
  configurable: true,
  get: function() {
    if(_.isUndefined(Memory.RoadMemory)) {
      Memory.RoadMemory = {};
    }
    if(!_.isObject(Memory.RoadMemory)) {
      return undefined;
    }
    return Memory.RoadMemory[this.id] =
      Memory.RoadMemory[this.id] || {};
  },
  set: function(value) {
    if(_.isUndefined(Memory.RoadMemory)) {
      Memory.RoadMemory = {};
    }
    if(!_.isObject(Memory.RoadMemory)) {
      throw new Error('Could not set leaf memory');
    }
    Memory.RoadMemory[this.id] = value;
  }
});

module.exports = Road;