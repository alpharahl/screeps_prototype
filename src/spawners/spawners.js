var minerSpawner = require('spawners_miners');
var upgraderSpawner = require('spawners_upgraders');
var builderSpawner = require('spawners_builder');
var haulerSpawner = require('spawners_hauler');
var queenSpawner = require('spawners_queen')
var scoutSpawner = require('spawners_scout');
var reserverSpawner = require('spawners_reserver');

var spawners = {
  run(){
    for (const roomName in Game.rooms){
      const room = Game.rooms[roomName];
      if (room.ownedByMe()){
        if (!this.roomChecks(room)){
          continue;
        }
        this.spawnLocal(room);
      } else if (room.reservedByMe()){
        this.spawnRemote(room);
      }
    }
  },

  roomChecks(room){
    if (Game.time % 25 != 0){
      if (room.energyAvailable <300){
        return false;
      }
      if (room.energyAvailable <= room.energyCapacityAvailable * 2/3){
        return false;
      }
    }
    return true;
  },

  spawnLocal(room){
    minerSpawner.run(room);
    haulerSpawner.run(room);
    queenSpawner.run(room);
    upgraderSpawner.run(room);
    builderSpawner.run(room);
    scoutSpawner.run(room);
    reserverSpawner.run(room);
  },

  spawnRemote(room){
    minerSpawner.remoteRun(room);
    haulerSpawner.remoteRun(room);
  }
}

module.exports = spawners;