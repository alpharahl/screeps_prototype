var miner = require('role_miner');
var upgrader = require('role_upgrader');
var builder = require('role_builder');
var hauler = require('role_hauler');

getMethod = function(string, creep)
{
  return eval(string).run(creep);
}

var roleManager = {
  run(){
    for (const name in Game.creeps){
      const creep = Game.creeps[name]
      getMethod(creep.type, creep);
    }
  }
}

module.exports = roleManager;