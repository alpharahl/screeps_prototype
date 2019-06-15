var minerSpawner = require('spawners_miners');
var upgraderSpawner = require('spawners_upgraders');
var builderSpawner = require('spawners_builder');
var haulerSpawner = require('spawners_hauler');

var spawners = {
  run(){
    minerSpawner.run();
    upgraderSpawner.run();
    haulerSpawner.run();
    builderSpawner.run();
  }
}

module.exports = spawners;