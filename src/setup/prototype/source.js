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