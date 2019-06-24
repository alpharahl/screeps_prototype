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
      if (this.spawns.length > 0){
        if (this.spawns.length > 0 && this.energyAvailable >= 300){
          for (const spawn of this.spawns){
            if (!spawn.spawning){
              this._bestSpawner = this.spawns[0];
              return this._bestSpawner;
            }
          }
        }
      } else {
        this._bestSpawner = Game.rooms[this.memory.home].bestSpawner;
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

Room.prototype.reservedByMe = function(){
  if (this.controller && this.controller.reservation && this.controller.reservation.username === 'alpha-rahl'){
    return true;
  }
  return false;
}

Object.defineProperty(Room.prototype, 'home', {
  get(){
    if (!this._home){
      if (this.memory.home){
        this._home = Game.rooms[this.memory.home]
      }
    }
    return this._home;
  }
})

Object.defineProperty(Room.prototype, 'creeps', {
  get: function(){
    if (!this._creeps){
      this._creeps = this.find(FIND_MY_CREEPS)
      if (this.memory.home){
        this._creeps = this._creeps.concat(this.home.find(FIND_MY_CREEPS, {
          filter: (i) => {
            return i.memory.remote === this.name;
          }
        }))
      }
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

Object.defineProperty(Room.prototype, 'expandable', {
  get (){
    if (this.storage && this.storage.energy >= 50000){
      if (this.constructionSites.length === 0){
        return true;
      }
    }
    return false;
  }
})

Object.defineProperty(Room.prototype, 'scout', {
  get(){
    if (!this._scout){
      if (this.memory.scout){
        var scout = Game.creeps[this.memory.scout];
        if (!scout){
          this.memory.scout = null;
        }
        this._scout = scout;
      }
    }
    return this._scout;
  }
})

Object.defineProperty(Room.prototype, 'neighbors', {
  get(){
    if (!this._neighbors){
      this._neighbors = Game.map.describeExits(this.name);
    }
    return this._neighbors;
  }
})

Object.defineProperty(Room.prototype, 'scoutTarget', {
  get(){
    if (!this._scoutTarget){
      if (!this.memory.scoutReports){
        this.memory.scoutReports = {}
        for (const direction in this.neighbors){
          const name = this.neighbors[direction]
          if (Game.rooms[name]){
            continue;
          }
          this.memory.scoutReports[name] = {
            lastSeen: 0
          }
        }
      }
      for (const name in this.memory.scoutReports){
        if (this.memory.scoutReports[name].lastSeen < Game.time - CONSIDER_SCOUTING_OLD){
          if (AVOID.includes(name)){
            continue;
          }
          return name;
        }
      }
    }
  }
})

Object.defineProperty(Room.prototype, 'reserveRooms', {
  get(){
    if (!this._reserveRooms){
      if (!this.memory.reserveRooms || Game.time % 750 === 0){
        this.memory.reserveRooms = [];
        for (const name in this.memory.scoutReports){
          const report = this.memory.scoutReports[name];
          if (report.reserve){
            this.memory.reserveRooms.push(name);
          }
        }
      }
      this._reserveRooms = this.memory.reserveRooms;
    }
    return this._reserveRooms
  }
})

Object.defineProperty(Room.prototype, 'criticalWallsAndRamparts', {
  get (){
    if (!this._criticalWallsAndRamparts){
      this._criticalWallsAndRamparts = this.find(FIND_STRUCTURES, {
        filter: (i) => {
          return (i.structureType === STRUCTURE_WALL ||
            i.structureType === STRUCTURE_RAMPART) &&
            i.hits < WALL_CRITICAL
        }
      })
    }
    return this._criticalWallsAndRamparts
  }
})

Room.prototype.removeAllWalls = function(){
  var walls = this.find(FIND_STRUCTURES, {
    filter: (i) => {
      return i.structureType === STRUCTURE_WALL
    }
  })
  for (const wall of walls){
    wall.destroy();
  }
}

Object.defineProperty(Room.prototype, 'baseLocation', {
  get: function(){
    if (!this._baseLocation){
      if (this.memory.home){
        this._baseLocation = Game.rooms[this.memory.home].baseLocation
      } else {
        if (this.find(FIND_MY_SPAWNS).length > 0) {
          this._baseLocation = this.find(FIND_MY_SPAWNS)[0].pos
        }
      }
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