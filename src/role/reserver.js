var Reserver = require('setup_prototype_creeps_reserver');

module.exports = {
  run(creep){
    new Reserver(creep).run();
  }
}