function Leaf(room, p1, id){
  this.room = room;
  this.storage = room.storage;
  this.startingPoint = p1;
  this.id = room.name + '-' + id;
  if (Game.time % 100 === 0){
    this.memory.ids = null;
    this.memory.extensions = [];
    this.memory.towers = [];
    this.memory.spawns = [];
    this.memory.links = [];
  }
}

Object.defineProperty(Leaf.prototype, 'ids', {
  get (){
    if (!this._ids){
      if (!this.memory.ids || Game.time % 200 === 0){
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
            if (structs.length > 0){
              ids.push(structs[0].id);
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
      if (!this.memory.extensions){
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
      this._spawns = spawns;
    }
    return this._spawns;
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