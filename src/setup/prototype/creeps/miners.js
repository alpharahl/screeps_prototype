Object.defineProperty(Creep.prototype, 'miningSource', {
  get: function(){
    return Game.getObjectById(this.memory.source);
  },

  enumerable: false,
  configurable: true
})

Creep.prototype.mine = function(){
  var position = this.miningSource.miningSpot;
  if (this.pos.x === position.x && this.pos.y === position.y){
    this.speak('⛏');
    this.harvest(this.miningSource);
    this.depositMiningBox();
  } else {
    this.moveTo(position.x, position.y)
    this.speak('✈️');
  }
};

Creep.prototype.depositMiningBox = function(){
  if (this.energy > 0){
    if (this.miningContainer){
      console.log('depositing')
      this.transfer(this.miningContainer, RESOURCE_ENERGY)
    } else {
      this.speak('🛠')
      if (this.miningContainerSite){
        this.build(this.miningContainerSite)
      } else {
        this.placeMiningContainer()
      }
    }
  }
}

Object.defineProperty(Creep.prototype, 'miningContainer', {
  get: function(){
    if (!this._miningContainer){
      if (!this.memory.miningContainer){
        var structures = this.pos.lookFor(LOOK_STRUCTURES)
        if (structures.length && structures[0].structureType === 'STRUCTURE_CONTAINER'){
          this.memory.miningContainer = structures[0].id;
        }
      }
      this._miningContainer = Game.getObjectById(this.memory.miningContainer);
    }
    return this._miningContainer
  }
})

Object.defineProperty(Creep.prototype, 'miningContainerSite', {
  get: function(){
    if (!this._miningContainerSite){
      var sites = this.pos.lookFor(LOOK_CONSTRUCTION_SITES)
      if (sites.length){
        this._miningContainerSite = sites[0]
      }
    }
    return this._miningContainerSite;
  }
})

Creep.prototype.placeMiningContainer = function(){
  this.pos.createConstructionSite(STRUCTURE_CONTAINER)
}