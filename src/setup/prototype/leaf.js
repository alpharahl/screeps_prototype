function Leaf(room, p1, id){
  this.room = room;
  this.storage = room.storage;
  this.startingPoint = p1;
  this.id = room.name + '-' + id;
  if (Game.time % 100 === 0){
    this.memory.ids = null;
    this.memory.extensions = null;
    this.memory.towers = null;
    this.memory.spawns = null;
    this.memory.links = null;
  }
}

Object.defineProperty(Leaf.prototype, 'ids', {
  get (){
    if (!this._ids){
      if (!this.memory.ids || Game.time % 1000 === 0){
        var ids = [];
        const validStructs = [
          STRUCTURE_EXTENSION,
          STRUCTURE_TOWER,
          STRUCTURE_LINK,
          STRUCTURE_SPAWN
        ]
        for (var x = 0; x < 5; x++){
          for (var y = 0; y < 5; y++){
            var pos = new RoomPosition(this.startingPoint.x + x, this.startingPoint.y + y, this.room.name);

            var structs = pos.lookFor(LOOK_STRUCTURES, {
              filter: (i) => {
                return validStructs.includes(i.structureType)
              }
            })
            for (const struct of structs){
              ids.push(struct.id);
            }

          }
        }
        this.memory.ids = ids;
      }
      this._ids = this.memory.ids;
    }
    return this._ids;
  }
})

Leaf.prototype.buildingList = function(structType){
  var structs = [];
  for (const id of this.ids){
    const struct = Game.getObjectById(id)
    if (struct.structureType === structType){
      structs.push(struct.id);
    }
  }
  return structs;
}

Object.defineProperty(Leaf.prototype, 'towers', {
  configurable: true,
  get(){
    if (!this._towers){
      if (!this.memory.towers){
        this.memory.towers = this.buildingList(STRUCTURE_TOWER)
      }
      var towers = [];
      for (const id of this.memory.towers){
        towers.push(Game.getObjectById(id))
      }
      this._towers = towers;
    }
    return this._towers;
  }
})

Object.defineProperty(Leaf.prototype, 'extensions', {
  configurable: true,
  get(){
    if (!this._extensions){
      if (!this.memory.extensions || Game.time % 200 === 0){
        this.memory.extensions = this.buildingList(STRUCTURE_EXTENSION)
      }
      var extensions = [];
      for (const id of this.memory.extensions){
        extensions.push(Game.getObjectById(id))
      }
      this._extensions = extensions;
    }
    return this._extensions;
  }
})

Object.defineProperty(Leaf.prototype, 'links', {
  configurable: true,
  get(){
    if (!this._links){
      if (!this.memory.links){
        this.memory.links = this.buildingList(STRUCTURE_LINK)
      }
      var links = [];
      for (const id of this.memory.links){
        links.push(Game.getObjectById(id))
      }
      this._links = links;
    }
    return this._links;
  }
})

Object.defineProperty(Leaf.prototype, 'spawns', {
  configurable: true,
  get(){
    if (!this._spawns){
      if (!this.memory.spawns){
        this.memory.spawns = this.buildingList(STRUCTURE_SPAWN)
      }
      var spawns = [];
      for (const id of this.memory.spawns){
        spawns.push(Game.getObjectById(id))
      }
      if (this.id.includes('-3')){
        spawns.push(this.room.spawns[0]);
      }
      if (this.id.includes('-2')){
        if (this.room.spawns[1]){
          spawns.push(this.room.spawns[1]);
        }
      }
      this._spawns = spawns;
    }
    return this._spawns;
  }
})

Object.defineProperty(Leaf.prototype, 'roads', {
  configurable: true,
  get(){
    if (!this._roads){
      if (!this.memory.roads){
        this.memory.roads = this.buildingList(STRUCTURE_ROAD)
      }
      var roads = [];
      for (const id of this.memory.roads){
        roads.push(Game.getObjectById(id))
      }
      // if (this.id.includes('-3')){
      //   roads.push(this.room.roads[0]);
      // }
      this._roads = roads;
    }
    return this._roads;
  }
})

Object.defineProperty(Leaf.prototype, 'noWalk', {
  get(){
    if (!this._noWalk){
      if (!this.memory.noWalk){
        this.memory.noWalk = [];
        for (var x = 0; x < 5; x++){
          for (var y = 0; y < 5; y++){
            this.memory.noWalk.push({x: this.startingPoint.x + x, y: this.startingPoint.y + y})
          }
        }
      }
      this._noWalk = [];
      for (const coord of this.memory.noWalk){
        this._noWalk.push(new RoomPosition(coord.x, coord.y, this.room.name));
      }
    }
    return this._noWalk;
  }
})

Object.defineProperty(Leaf.prototype, 'idlePoint', {
  get(){
    if (!this._idlePoint){
      this._idlePoint = new RoomPosition(this.startingPoint.x + 2, this.startingPoint.y + 2, this.room.name);
    }
    return this._idlePoint;
  }
})

Object.defineProperty(Leaf.prototype, 'roadPositions', {
  get(){
    if (!this._roadPositions){
      this._roadPositions = [];
      for (const road of this.roads){
        this._roadPositions.push(road.pos);
      }
    }
    return this._roadPositions;
  }
})

Object.defineProperty(Leaf.prototype, 'queen', {
  configurable: true,
  get(){
    if (!this._queen){
      if (this.memory.queen){
        var queen = Game.creeps[this.memory.queen];
        if (queen){
          this._queen = queen;
        } else {
          this.memory.queen = undefined;
        }
      }
      this._queen = Game.creeps[this.memory.queen];
    }
    return this._queen;
  }
})

Object.defineProperty(Leaf.prototype, 'memory', {
  configurable: true,
  get: function() {
    if(_.isUndefined(Memory.myLeafMemory)) {
      Memory.myLeafMemory = {};
    }
    if(!_.isObject(Memory.myLeafMemory)) {
      return undefined;
    }
    return Memory.myLeafMemory[this.id] =
      Memory.myLeafMemory[this.id] || {};
  },
  set: function(value) {
    if(_.isUndefined(Memory.myLeafMemory)) {
      Memory.myLeafMemory = {};
    }
    if(!_.isObject(Memory.myLeafMemory)) {
      throw new Error('Could not set leaf memory');
    }
    Memory.myLeafMemory[this.id] = value;
  }
});

module.exports = Leaf