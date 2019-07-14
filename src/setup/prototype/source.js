Object.defineProperty(Source.prototype, 'miningSpot',{
  get: function(){
    if (!this._miningSpot){
      if (!this.memory.miningSpot){
        const spot = this.pos.findPathTo(this.room.baseLocation)[0]
        this.memory.miningSpot = spot;
      }
      this._miningSpot = this.memory.miningSpot
    }
    return this._miningSpot;
  },
  enumerable: false,
  configurable: true
})

Object.defineProperty(Source.prototype, 'linkSpot', {
  get: function(){
    if (!this._linkSpot){
      if (!this.memory.linkSpot){
        const spot = new RoomPosition(this.miningSpot.x, this.miningSpot.y, this.room.name).findPathTo(this.room.baseLocation, {
          ignoreCreeps: true
        })[0]
        this.memory.linkSpot = spot;
      }
      this._linkSpot = this.memory.linkSpot;
    }
    return this._linkSpot
  }
})

Object.defineProperty(Source.prototype, 'link', {
  get (){
    if (!this._link){
      if (!this.memory.link || !Game.getObjectById(this.memory.link)){
        var spot = new RoomPosition(this.linkSpot.x, this.linkSpot.y, this.room.name);
        var cs = spot.lookFor(LOOK_STRUCTURES);
        for (const s of cs){
          if (s.structureType === STRUCTURE_LINK){
            this.memory.link = s.id;
          }
        }
      }
      this._link = Game.getObjectById(this.memory.link);
    }
    return this._link;
  }
})

Object.defineProperty(Source.prototype, 'container', {
  get: function(){
    if (!this._container){
      if (!this.memory.container || !Game.getObjectById(this.memory.container)){
        var spot = new RoomPosition(this.miningSpot.x, this.miningSpot.y, this.room.name);
        var cs = spot.lookFor(LOOK_STRUCTURES);
        for (const s of cs){
          if (s.structureType === STRUCTURE_CONTAINER){
            this.memory.container = s.id;
          }
        }
      }
      this._container = Game.getObjectById(this.memory.container);
    }
    return this._container;
  }
})

Object.defineProperty(Source.prototype, 'distToBase', {
  get: function(){
    if (!this._distToBase){
      if (!this.memory.distToBase){
        this.memory.distToBase = this.pos.findPathTo(this.room.baseLocation, {
          ignoreCreeps: true
        }).length
      }
      this._distToBase = this.memory.distToBase;
    }
    return this._distToBase;
  }
})

Object.defineProperty(Source.prototype, 'pathFromStorage', {
  get () {
    if (!this._pathFromStorage){
      if (this.room.home.storage){
        if (!this.memory.pathFromStorage){
          this.memory.pathFromStorage = PathFinder.search(this.room.home.storage.pos, {pos: this.pos, range: 1}, {
            ignoreCreeps: true,
            swampCost: 2,
            plainCost: 2,
            roomCallback(name){
              const room = Game.rooms[name];
              if (!room) return;
              let costs = new PathFinder.CostMatrix;

              var roads = room.find(FIND_STRUCTURES, {
                filter: (i) => {
                  return i.structureType === STRUCTURE_ROAD
                }
              })
              for (const sInd in roads){
                const struct = roads[sInd];
                costs.set(struct.pos.x, struct.pos.y, 1);
              }

              // don't step in leafs
              for (const leaf of room.leafs){
                for (const step of leaf.noWalk){
                  costs.set(step.x, step.y, 50);
                }
              }

              for (const source of room.sources){
                const spot = source.miningSpot;
                costs.set(spot.x, spot.y, 255);
              }

              return costs;
            }
          }).path
        }
        const startcpu = Game.cpu.getUsed();
        this._pathFromStorage = [];
        for (const p of this.memory.pathFromStorage){
          this._pathFromStorage.push(new RoomPosition(p.x, p.y, p.roomName));
        }
        console.log('Used (from):', Game.cpu.getUsed() - startcpu)
      }
    }
    return this._pathFromStorage;
  }
})

Object.defineProperty(Source.prototype, 'pathToStorage', {
  get () {
    if (!this._pathToStorage){
      if (this.room.home.storage){
        if (!this.memory.pathToStorage){
          this.memory.pathToStorage = PathFinder.search(this.pos, {pos: this.room.home.storage.pos, range: 1}, {
            ignoreCreeps: true,
            swampCost: 2,
            plainCost: 2,
            roomCallback(name){
              const room = Game.rooms[name];
              if (!room) return;
              let costs = new PathFinder.CostMatrix;

              var roads = room.find(FIND_STRUCTURES, {
                filter: (i) => {
                  return i.structureType === STRUCTURE_ROAD
                }
              })
              for (const sInd in roads){
                const struct = roads[sInd];
                costs.set(struct.pos.x, struct.pos.y, 1);
              }

              // don't step in leafs
              for (const leaf of room.leafs){
                for (const step of leaf.noWalk){
                  costs.set(step.x, step.y, 50);
                }
              }

              for (const source of room.sources){
                const spot = source.miningSpot;
                costs.set(spot.x, spot.y, 255);
              }

              return costs;
            }
          }).path
        }
        const startcpu = Game.cpu.getUsed();
        this._pathToStorage = [];
        for (const p of this.memory.pathToStorage){
          this._pathToStorage.push(new RoomPosition(p.x, p.y, p.roomName));
        }
        console.log('Used (to):', Game.cpu.getUsed() - startcpu)
      }
    }
    return this._pathToStorage;
  }
})

Object.defineProperty(Source.prototype, 'miner', {
  get (){
    if (!this._miner){
      if (this.memory.miner){
        if (Game.creeps[this.memory.miner]){
          this._miner = Game.creeps[this.memory.miner];
        } else {
          this.memory.miner = null;
        }
      }
    }
    return this._miner;
  }
})

Object.defineProperty(Source.prototype, 'hauler', {
  get(){
    if (!this.container){
      return true;
    }
    if (!this._hauler){
      if (this.memory.hauler){
        if (Game.creeps[this.memory.hauler]){
          this._hauler = Game.creeps[this.memory.hauler]
        } else {
          this.memory.hauler = null;
        }
      }
    }
    return this._hauler;
  }
})

Source.prototype.setMiner = function(name){
  this.memory.miner = name;
}

Source.prototype.setHauler = function(name){
  this.memory.hauler = name;
}

Object.defineProperty(Source.prototype, 'memory', {
  configurable: true,
  get: function() {
    if(_.isUndefined(Memory.mySourcesMemory)) {
      Memory.mySourcesMemory = {};
    }
    if(!_.isObject(Memory.mySourcesMemory)) {
      return undefined;
    }
    return Memory.mySourcesMemory[this.id] =
      Memory.mySourcesMemory[this.id] || {};
  },
  set: function(value) {
    if(_.isUndefined(Memory.mySourcesMemory)) {
      Memory.mySourcesMemory = {};
    }
    if(!_.isObject(Memory.mySourcesMemory)) {
      throw new Error('Could not set source memory');
    }
    Memory.mySourcesMemory[this.id] = value;
  }
});