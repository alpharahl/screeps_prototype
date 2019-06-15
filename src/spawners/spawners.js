var minerSpawner = require('spawners_miners');
var upgraderSpawner = require('spawners_upgraders');
var builderSpawner = require('spawners_builder');
var haulerSpawner = require('spawners_hauler');

var spawners = {
  run(){
    for (const roomName in Game.rooms){
      const room = Game.rooms[roomName];
      minerSpawner.run(room);
      haulerSpawner.run(room);
      upgraderSpawner.run(room);
      builderSpawner.run(room);
    }
  }
}

module.exports = spawners;