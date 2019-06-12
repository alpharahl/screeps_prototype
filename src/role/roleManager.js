var miner = require('role_miner');

var roleManager = {
  run(){
    for (const name in Game.creeps){
      const creep = Game.creeps[name]
      if (creep.type === 'miner'){
        miner.run(creep);
      }
    }
  }
}

module.exports = roleManager;