Object.defineProperty(Room.prototype, 'sources', {
  get: function(){
    if (!this._sources){
      if (!this.memory.sources){
        this.memory.sources = this.find(FIND_SOURCES).map(source => source.id)
      }
      this._sources = this.memory.sources.map(id => Game.getObjectById(id));
    }
    return this._sources;
  },

  enumerable: false,
  configurable: true
})

Object.defineProperty(Room.prototype, 'nextCreepName', {
  get: function(){
    if (!this.memory.creepName){
      this.memory.creepName = 0;
    }
    this.memory.creepName ++;
    return this.name + '-' + this.memory.creepName;
  }
})

Object.defineProperty(Room.prototype, 'spawns', {
  get: function(){
    if (!this._spawns){
      this._spawns = this.find(FIND_MY_SPAWNS)
    }
    return this._spawns;
  },

  enumerable: false,
  configurable: true
})

Room.prototype.bestSpawner = function(){
  if (this._bestSpawner === undefined){
    if (this.spawns.length > 0 && this.energyAvailable >= 300){
      if (!this.spawns[0].spawning){
        this._bestSpawner = this.spawns[0];
      }
    }
    if (!this._bestSpawner){
      this._bestSpawner = false;
    }
  }
  return this._bestSpawner;
}

Object.defineProperty(Room.prototype, 'miners', {
  get: function(){
    if (!this._miners){
      this._miners = {}
      for (const source of this.sources){
        this._miners[source.id] = null;
      }
      for (const creep of this.creeps){
        if (creep.type === 'miner'){
          this._miners[creep.memory.source] = creep.id
        }
      }
    }
    return this._miners;
  },
  enumerable: false,
  configurable:true
})

Object.defineProperty(Room.prototype, 'upgraders', {
  get: function(){
    if (!this._upgraders){
      this._upgraders = [];
      for (const creep of this.creeps){
        if (creep.type === 'upgrader'){
          this._upgraders.push(creep.id)
        }
      }
    }
    return this._upgraders;
  },
  enumerable: false,
  configurable: true
})

Room.prototype.ownedByMe = function(){
  if (this.controller && this.controller.owner && this.controller.owner.username === 'alpha-rahl'){
    return true;
  }
  return false;
}

Object.defineProperty(Room.prototype, 'creeps', {
  get: function(){
    if (!this._creeps){
      this._creeps = this.find(FIND_MY_CREEPS)
    }
    return this._creeps;
  },
  enumerable: false,
  configurable:true
})

Object.defineProperty(Room.prototype, 'baseLocation', {
  get: function(){
    if (!this._baseLocation){
      if (this.find(FIND_MY_SPAWNS).length > 0)
      this._baseLocation = this.find(FIND_MY_SPAWNS)[0].pos
    }
    return this._baseLocation;
  },
  enumerable: false,
  configurable:true
})

Object.defineProperty(Room.prototype, 'baseRoot', {
  get: function(){
    if (!this._rootLocation){
      this._rootLocation = new RoomPosition(this.baseLocation.x - 5, this.baseLocation.y - 6, this.name)
    }
    return this._rootLocation;
  }
})