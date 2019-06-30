var Reserver = require('setup_prototype_creeps_reserver');

module.exports = {
  run(creep){
    const startCpu = Game.cpu.getUsed();
    const existing = parseFloat(Memory.stats.cpu.creeps.reservers);
    new Reserver(creep).run();
    Memory.stats.cpu.creeps.reservers = Game.cpu.getUsed() - startCpu;
    if (existing){
      Memory.stats.cpu.creeps.reservers = parseFloat(Memory.stats.cpu.creeps.reservers) + existing;
    }
  }
}