var miner = require('role_miner');
var upgrader = require('role_upgrader');

var roleManager = {
  run(){
    for (const name in Game.creeps){
      const creep = Game.creeps[name]
      if (creep.type === 'miner'){
        miner.run(creep);
      } else if (creep.type === 'upgrader'){
        upgrader.run(creep);
      }
    }
  }
}

module.exports = roleManager;