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


Object.defineProperty(Room.prototype, 'bestSpawner', {
  get (){
    if (this._bestSpawner === undefined){
      if (this.spawns.length > 0 && this.energyAvailable >= 300){
        for (const spawn of this.spawns){
          if (!spawn.spawning){
            this._bestSpawner = this.spawns[0];
            return this._bestSpawner;
          }
        }
      }
    }
    return this._bestSpawner;
  },
  enumerable: false,
  configurable: true
})

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

Object.defineProperty(Room.prototype, 'builders', {
  get: function(){
    if (!this._builders){
      this._builders = [];
      for (const creep of this.creeps){
        if (creep.type === 'builder'){
          this._builders.push(creep.id)
        }
      }
    }
    return this._builders;
  },
  enumerable: false,
  configurable: true
})

Object.defineProperty(Room.prototype, 'haulers', {
  get: function(){
    if (!this._haulers){
      this._haulers = [];
      for (const creep of this.creeps){
        if (creep.type === 'hauler'){
          this._haulers.push(creep.id)
        }
      }
    }
    return this._haulers;
  },
  enumerable: false,
  configurable: true
})

Object.defineProperty(Room.prototype, 'queenAvoid', {
  get(){
    if (!this._queenAvoid) {
      this.memory.queenAvoid = null;
      if (!this.memory.queenAvoid){
        this.memory.queenAvoid = [
          { x: this.baseRoot.x + 4, y: this.baseRoot.y + 5},
          { x: this.baseRoot.x + 3, y: this.baseRoot.y + 5},
          { x: this.baseRoot.x + 5, y: this.baseRoot.y + 3},
          { x: this.baseRoot.x + 5, y: this.baseRoot.y + 6},
          { x: this.baseRoot.x + 5, y: this.baseRoot.y + 4},
          { x: this.baseRoot.x + 5, y: this.baseRoot.y + 7},
          { x: this.baseRoot.x + 6, y: this.baseRoot.y + 5},
          { x: this.baseRoot.x + 7, y: this.baseRoot.y + 5},
        ]
      }
      var positions = [];
      for (const mem of this.memory.queenAvoid) {
        positions.push(new RoomPosition(mem.x, mem.y, this.name))
      }

      this._queenAvoid = positions;
    }
    return this._queenAvoid;
  }
})

Object.defineProperty(Room.prototype, 'queens', {
  get: function(){
    if (!this._queens){
      this._queens = this.find(FIND_MY_CREEPS, {
        filter: (i) => {
          return i.memory.type === 'queen'
        }
      })
    }
    return this._queens
  }
})

Object.defineProperty(Room.prototype, 'sourceStorage', {
  get: function(){
    if (!this._sourceStorage){
      this._sourceStorage = [];
      for (const source of this.sources){
        if (source.container){
          this._sourceStorage.push(source.container)
        }
      }
    }
    return this._sourceStorage;
  }
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

Object.defineProperty(Room.prototype, 'constructionSites', {
  get (){
    if (!this._sites){
      this._sites = this.find(FIND_CONSTRUCTION_SITES)
    }
    return this._sites;
  }
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