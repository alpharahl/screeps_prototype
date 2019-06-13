var minerSpawner = require('spawners_miners');
var upgraderSpawner = require('spawners_upgraders');

var spawners = {
  run(){
    minerSpawner.run();
    upgraderSpawner.run();
  }
}

module.exports = spawners;