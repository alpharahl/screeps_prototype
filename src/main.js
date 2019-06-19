require('setup_setup');
require('setup_constants_buildingLayout')
require('setup_constants_utils');
var spawners = require('spawners_spawners');
var roleManager = require('role_roleManager');
var utils = require('utils_utils');

// Collect room stats
function exportStats() {

  // Reset stats object
  Memory.stats = {
    gcl: {},
    rooms: {},
    cpu: {},
  };

  Memory.stats.time = Game.time;
  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName];
    let isMyRoom = (room.controller ? room.controller.my : false);
    if (isMyRoom) {
      let roomStats = Memory.stats.rooms[roomName] = {};
      roomStats.storageEnergy           = (room.storage ? room.storage.store.energy : 0);
      roomStats.terminalEnergy          = (room.terminal ? room.terminal.store.energy : 0);
      roomStats.energyAvailable         = room.energyAvailable;
      roomStats.energyCapacityAvailable = room.energyCapacityAvailable;
      roomStats.controllerProgress      = room.controller.progress;
      roomStats.controllerProgressTotal = room.controller.progressTotal;
      roomStats.controllerLevel         = room.controller.level;
      roomStats.creepCount              = room.creeps.length;
      roomStats.creeps = {};
      var miners = 0;
      for (const m in room.miners){
        if (room.miners[m]){
          miners ++;
        }
      }
      roomStats.creeps.miners = miners;
      roomStats.creeps.upgraders = room.upgraders.length;
      roomStats.creeps.haulers = room.haulers.length;
      roomStats.creeps.builders = room.builders.length;
    }

  }
  // Collect GCL stats
  Memory.stats.gcl.progress      = Game.gcl.progress;
  Memory.stats.gcl.progressTotal = Game.gcl.progressTotal;

  Memory.stats.gcl.level         = Game.gcl.level;
  // Collect CPU stats
  Memory.stats.cpu.bucket        = Game.cpu.bucket;
  Memory.stats.cpu.limit         = Game.cpu.limit;
  Memory.stats.cpu.used          = Game.cpu.getUsed();

}
module.exports.loop = function () {

  for (const roomName in Game.rooms){
    const room =Game.rooms[roomName];
    var towers = room.find(FIND_MY_STRUCTURES, {
      filter: (i) => {
        return i.structureType == STRUCTURE_TOWER
      }
    })
    for (const tower of towers){

      if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (i) => {
            return i.hits < i.hitsMax &&
              i.structureType !== STRUCTURE_WALL &&
              i.structureType !== STRUCTURE_RAMPART
          }

        });
        if(closestDamagedStructure && tower.energy > 400) {
          tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
          tower.attack(closestHostile);
        }
      }
    }
  }

  for (const name in Game.rooms){
    const room = Game.rooms[name]
    room.controller.storage;
  }

  utils.run();
  spawners.run();
  roleManager.run();
  if (Memory.stats === undefined){
    Memory.stats = {}

  }


  exportStats();
}
