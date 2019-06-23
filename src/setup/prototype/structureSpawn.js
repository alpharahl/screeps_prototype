StructureSpawn.prototype.spawnMiner = function(sourceId, roomName = this.room.name){
  // first need to set room to know spawner is not available
  var name = this.room.nextCreepName;
  var ideal = [MOVE, CARRY, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK]
  var body = this.finalizeBody(ideal);
  var creepOpts = {
    memory: {
      type: 'miner',
      source: sourceId,
      remote: roomName
    }
  }
  if (this.spawnCreep(body, name, creepOpts) === OK){
    console.log("miner spawned ok")
    this.room._bestSpawner = false;
    console.log("Spawning miner for", sourceId, 'from', this.name)
  }
}

StructureSpawn.prototype.spawnUpgrader = function(){
  var name = this.room.nextCreepName;
  var ideal = [];
  const idealTimes = 6;
  for (var i = 0; i < idealTimes; i++){
    ideal = ideal.concat([MOVE, WORK, CARRY]);
  }
  var body = this.finalizeBody(ideal);
  var creepOpts = {
    memory: {
      type: 'upgrader'
    }
  }
  if (this.spawnCreep(body, name, creepOpts) === OK){
    this.room._bestSpawner = false;
    console.log("Spawning Upgrader for", this.room.name)
  }
}

StructureSpawn.prototype.spawnScout = function(){
  var name = this.room.nextCreepName;
  var body = [MOVE, MOVE];
  var creepOpts = {
    memory: {
      type: 'scout',
      home: this.room.name
    }
  }
  if (this.spawnCreep(body, name, creepOpts) === OK){
    this.room._bestSpawner = false;
    this.room.memory.scout = name;
    console.log("Spawning scout for", this.room.name);
  }
}

StructureSpawn.prototype.spawnBuilder = function(){
  var name = this.room.nextCreepName;
  var ideal = [MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK]
  var body = this.finalizeBody(ideal);
  var creepOpts = {
    memory: {
      type: 'builder'
    }
  }
  if (this.spawnCreep(body, name, creepOpts) === OK){
    this.room._bestSpawner = false;
    console.log("Spawning Builder for", this.room.name)
  }
}

StructureSpawn.prototype.spawnHauler = function(){
  var name = this.room.nextCreepName;
  var ideal = [MOVE, CARRY];
  for (var i = 0; i < 10; i++){
    ideal = ideal.concat([MOVE, CARRY])
  }
  var body = this.finalizeBody(ideal);
  var creepOpts = {
    memory: {
      type: 'hauler'
    }
  }
  if (this.spawnCreep(body, name, creepOpts) === OK){
    this.room._bestSpawner = false;
    console.log("Spawning Hauler for", this.room.name);
  }
}

StructureSpawn.prototype.spawnQueen = function(leaf){
  var name = this.room.nextCreepName;
  var ideal = [MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY]
  var body = this.finalizeBody(ideal);
  var creepOpts = {
    memory: {
      type: 'queen',
      leaf: leaf.id
    }
  }
  if (this.spawnCreep(body, name, creepOpts) === OK){
    this.room._bestSpawner = false;
    console.log("Spawning Queen fro", this.room.name);
    leaf.memory.queen = name;
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