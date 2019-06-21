var minerSpawner = require('spawners_miners');
var upgraderSpawner = require('spawners_upgraders');
var builderSpawner = require('spawners_builder');
var haulerSpawner = require('spawners_hauler');
var queenSpawner = require('spawners_queen')

var spawners = {
  run(){
    for (const roomName in Game.rooms){
      const room = Game.rooms[roomName];
      if (Game.time % 25 != 0 && room.energyAvailable !== room.energyCapacityAvailable){
        return;
      }
      minerSpawner.run(room);
      haulerSpawner.run(room);
      queenSpawner.run(room);
      upgraderSpawner.run(room);
      builderSpawner.run(room);
    }
  }
}

module.exports = spawners;