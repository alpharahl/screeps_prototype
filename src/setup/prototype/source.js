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