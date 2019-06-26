Object.defineProperty(Creep.prototype, 'miningSource', {
  get: function(){
    return Game.getObjectById(this.memory.source);
  },

  enumerable: false,
  configurable: true
})

Creep.prototype.mine = function(){
  if (this.memory.remote){
    if (this.moveToRoom(this.memory.remote)){
      return;
    }

  }
  var position = this.miningSource.miningSpot;
  if (this.pos.x === position.x && this.pos.y === position.y){
    this.speak('⛏');
    this.harvest(this.miningSource);
    if (!this.miningSource.container){
      this.placeMiningContainer();
    }
    if (this.miningSource.link){
      if (this.miningSource.container){
        this.withdraw(this.miningSource.container, RESOURCE_ENERGY);
      }
      this.transfer(this.miningSource.link, RESOURCE_ENERGY);
    } else {
      if (this.miningContainerSite){
        this.build(this.miningContainerSite);
      } else {
        this.drop(RESOURCE_ENERGY);
      }
    }
  } else {
    this.moveTo(new RoomPosition(position.x, position.y, this.miningSource.room.name))
    this.speak('✈️');
  }
};

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