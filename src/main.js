require('setup_setup');
require('setup_constants_buildingLayout')
require('setup_constants_utils');
require('setup_constants_variables');
var spawners = require('spawners_spawners');
var roleManager = require('role_roleManager');
var utils = require('utils_utils');

// Collect room stats
function exportStats() {

  // Reset stats object


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
      roomStats.creeps.queens = room.queens.length;
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

  Memory.stats = {
    gcl: {},
    rooms: {},
    cpu: {
      creeps: {
        breakdown: {
          queens: {},
          miners: {}
        }
      }
    },
  };

  for (const roomName in Game.rooms){
    const room = Game.rooms[roomName];
    var towers = room.find(FIND_MY_STRUCTURES, {
      filter: (i) => {
        return i.structureType == STRUCTURE_TOWER
      }
    })
    var hostileCreeps = []
    for (const tower of towers){
      if (hostileCreeps.length === 0){
        hostileCreeps = tower.pos.findInRange(FIND_HOSTILE_CREEPS, 10, {

        })
        var creepsNotOnFull = room.find(FIND_HOSTILE_CREEPS, {
          filter: (i) => {
            return i.hits < i.hitsMax
          }
        })
        hostileCreeps = hostileCreeps.concat(creepsNotOnFull)
      }
    }
    var damageDone = 0;
    for (const tower of towers){
      if(tower) {
        if (room.find(FIND_HOSTILE_CREEPS).length > 0){
          if (hostileCreeps.length > 0){
            if (tower.attack(hostileCreeps[0]) === 0){
              var range = tower.pos.getRangeTo(hostileCreeps[0]);
              var expectedHits = 600
              if (range > 5){
                expectedHits = expectedHits - (range * 40)
              }
              if (range >= 20){
                expectedHits = 150
              }
              damageDone = damageDone + expectedHits;
              if (damageDone >= hostileCreeps[0].hits){
                hostileCreeps.shift();
                damageDone = 0;
              }
            }

          }
          continue;
        }
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (i) => {
            return i.hits < i.hitsMax &&
              i.structureType !== STRUCTURE_WALL &&
              i.structureType !== STRUCTURE_RAMPART
          }

        });
        if (!closestDamagedStructure && (room.storage && room.storage.energy > 100000)){
          closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (i) => {
              return i.hits < WALL_HEALTH &&
                (i.structureType === STRUCTURE_WALL ||
                i.structureType === STRUCTURE_RAMPART)
            }
          })
        }
        if(closestDamagedStructure && tower.energy > 400) {
          tower.repair(closestDamagedStructure);
        }

      }
    }
  }

  Memory.stats.cpu.towers = Game.cpu.getUsed();

  utils.run();
  Memory.stats.cpu.utils = Game.cpu.getUsed() - parseInt(Memory.stats.cpu.towers);


  spawners.run();
  Memory.stats.cpu.spawning = Game.cpu.getUsed() - parseInt(Memory.stats.cpu.towers) - parseInt(Memory.stats.cpu.utils)

  roleManager.run();
  Memory.stats.cpu.roles = Game.cpu.getUsed() - parseInt(Memory.stats.cpu.towers) - parseInt(Memory.stats.cpu.utils) - parseInt(Memory.stats.cpu.spawning)

  exportStats();


  for (var name in Memory.creeps){
    if (!Game.creeps[name]){
      delete Memory.creeps[name];
      //console.log("Clearing out old creeps memory:", name);
    }
  }

}
