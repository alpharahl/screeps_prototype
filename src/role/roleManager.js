var miner = require('role_miner');
var upgrader = require('role_upgrader');
var builder = require('role_builder');
var hauler = require('role_hauler');
var leafs = require('role_leafs');
var links = require('role_links');
var harasser = require('role_harasser');
var scout = require('role_scout')
var reserver = require('role_reserver');

getMethod = function(string, creep)
{
  return eval(string).run(creep);
}

var roleManager = {
  run(){
    for (const name in Game.creeps){
      const creep = Game.creeps[name]
      if (creep.type !== 'queen'){
        getMethod(creep.type, creep);
      }
    }
    for (const name in Game.rooms) {
      const room = Game.rooms[name];
      if (room.ownedByMe()) {
        leafs.run(room);
        links.run(room);
      }
    }
  }
}

module.exports = roleManager;