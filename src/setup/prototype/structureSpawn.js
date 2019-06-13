StructureSpawn.prototype.spawnMiner = function(sourceId){
  // first need to set room to know spawner is not available
  var name = this.room.nextCreepName;
  var ideal = [MOVE, CARRY, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK]
  var body = this.finalizeBody(ideal);
  var creepOpts = {
    memory: {
      type: 'miner',
      source: sourceId
    }
  }
  if (this.spawnCreep(body, name, creepOpts) === OK){
    this.room._bestSpawner = false;
    console.log("Spawning miner for", sourceId, 'from', this.name)
  }
}

StructureSpawn.prototype.spawnUpgrader = function(){
  var name = this.room.nextCreepName;
  var ideal = [MOVE, CARRY, WORK, WORK, MOVE, CARRY, WORK, WORK, MOVE, CARRY, WORK, WORK]
  var body = this.finalizeBody(ideal);
  var creepOpts = {
    memory: {
      type: 'upgrader'
    }
  }
  if (this.spawnCreep(body, name, creepOpts) === OK){
    this.room._bestSpawner = false;
    console.log("Spawning Upgrader for", room.name)
  }
}

StructureSpawn.prototype.finalizeBody = function(bodyParts){
  var energy = this.room.energyAvailable;
  var final = [];
  for (const part of bodyParts){
    if (energy - BODYPART_COST[part] >= 0){
      final.push(part)
      energy -= BODYPART_COST[part]
    }
  }
  return final;
}