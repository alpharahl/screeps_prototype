Object.defineProperty(Creep.prototype, 'miningSource', {
  get: function(){
    if (!this._miningSource){
      this._miningSource = Game.getObjectById(this.memory.source)
    }
    return this._miningSource;
  },

  enumerable: false,
  configurable: true
})

Creep.prototype.mine = function(){

  const startRemoteCheck = Game.cpu.getUsed();
  const existingRemoteCheck = parseFloat(Memory.stats.cpu.creeps.breakdown.miners.remoteCheck);
  if (this.memory.remote){
    if (this.moveToRoom(this.memory.remote)){
      return;
    }
  }
  Memory.stats.cpu.creeps.breakdown.miners.remoteCheck = Game.cpu.getUsed() - startRemoteCheck;
  if (existingRemoteCheck){
    Memory.stats.cpu.creeps.breakdown.miners.remoteCheck = parseFloat(Memory.stats.cpu.creeps.breakdown.miners.remoteCheck) + existingRemoteCheck;
  }

  const startMiningSpot = Game.cpu.getUsed();
  const existingMiningSpot = parseFloat(Memory.stats.cpu.creeps.breakdown.miners.existingMiningSpot);
  var position = this.miningSource.miningSpot;
  Memory.stats.cpu.creeps.breakdown.miners.existingMiningSpot = Game.cpu.getUsed() - startMiningSpot;
  if (existingMiningSpot){
    Memory.stats.cpu.creeps.breakdown.miners.existingMiningSpot = parseFloat(Memory.stats.cpu.creeps.breakdown.miners.existingMiningSpot) + existingMiningSpot;
  }

  if (this.pos.x === position.x && this.pos.y === position.y){

    this.memory.working = true;

    const startHarvest = Game.cpu.getUsed();
    const harvesting = parseFloat(Memory.stats.cpu.creeps.breakdown.miners.harvesting);
    this.speak('⛏');
    this.harvest(this.miningSource);
    Memory.stats.cpu.creeps.breakdown.miners.harvesting = Game.cpu.getUsed() - startHarvest;
    if (harvesting){
      Memory.stats.cpu.creeps.breakdown.miners.harvesting = parseFloat(Memory.stats.cpu.creeps.breakdown.miners.harvesting) + harvesting;
    }

    const startMiningContainer = Game.cpu.getUsed();
    const miningContainerPlace = parseFloat(Memory.stats.cpu.creeps.breakdown.miners.miningContainerPlace);
    if (!this.miningSource.container){
      this.placeMiningContainer();
    }
    Memory.stats.cpu.creeps.breakdown.miners.miningContainerPlace = Game.cpu.getUsed() - startMiningContainer;
    if (miningContainerPlace){
      Memory.stats.cpu.creeps.breakdown.miners.miningContainerPlace = parseFloat(Memory.stats.cpu.creeps.breakdown.miners.miningContainerPlace) + miningContainerPlace;
    }

    const startEnergyDropping = Game.cpu.getUsed();
    const energyDropping = parseFloat(Memory.stats.cpu.creeps.breakdown.miners.energyDropping);
    if (this.miningSource.link){
      if (this.miningSource.container){
        this.withdraw(this.miningSource.container, RESOURCE_ENERGY);
      }
      this.transfer(this.miningSource.link, RESOURCE_ENERGY);
    } else {
      if (this.miningContainerSite && this.room.spawns.length === 0){
        this.build(this.miningContainerSite);
      } else {
        if (this.miningSource.container && this.miningSource.container.hits < this.miningSource.container.hitsMax){
          this.repair(this.miningSource.container);
        } else {
          this.drop(RESOURCE_ENERGY);
        }
      }
    }
    Memory.stats.cpu.creeps.breakdown.miners.energyDropping = Game.cpu.getUsed() - startEnergyDropping;
    if (energyDropping){
      Memory.stats.cpu.creeps.breakdown.miners.energyDropping = parseFloat(Memory.stats.cpu.creeps.breakdown.miners.energyDropping) + energyDropping;
    }

  } else {
    const startMove = Game.cpu.getUsed();
    const moveToSource = parseFloat(Memory.stats.cpu.creeps.breakdown.miners.moveToSource);
    this.moveTo(new RoomPosition(position.x, position.y, this.miningSource.room.name))
    this.speak('✈️');
    Memory.stats.cpu.creeps.breakdown.miners.moveToSource = Game.cpu.getUsed() - startMove;
    if (moveToSource){
      Memory.stats.cpu.creeps.breakdown.miners.moveToSource = parseFloat(Memory.stats.cpu.creeps.breakdown.miners.moveToSource) + moveToSource;
    }
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