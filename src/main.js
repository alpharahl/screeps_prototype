require('setup_setup');
var spawners = require('spawners_spawners');
var roleManager = require('role_roleManager');

function exportStats() {
  // Reset stats object
  Memory.stats = {
    gcl: {},
    rooms: {},
    cpu: {},
  };

  Memory.stats.time = Game.time;

  // Collect room stats
  for (let roomName in Game.rooms) {
    let room = Game.rooms[roomName];
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
  var tower = Game.getObjectById('TOWER_ID');
  if(tower) {
    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => structure.hits < structure.hitsMax
    });
    if(closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
      tower.attack(closestHostile);
    }
  }

  spawners.run();
  roleManager.run();
  if (Memory.stats === undefined){
    Memory.stats = {}
  }

  exportStats();
}