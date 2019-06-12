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

Object.defineProperty(Room.prototype, 'miners', {
  get: function(){
    if (!this._miners){
      this._miners = {}
      for (const id of this.sources){
        this._miners[id] = null;
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