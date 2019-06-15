var minerSpawner = require('spawners_miners');
var upgraderSpawner = require('spawners_upgraders');
var builderSpawner = require('spawners_builder');

var spawners = {
  run(){
    minerSpawner.run();
    upgraderSpawner.run();
    builderSpawner.run();
  }
}

module.exports = spawners;