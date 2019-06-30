var builder = {
  run(creep){
    const startCpu = Game.cpu.getUsed();
    const existing = parseFloat(Memory.stats.cpu.creeps.builders);
    creep.buildRun();
    Memory.stats.cpu.creeps.builders = Game.cpu.getUsed() - startCpu;
    if (existing){
      Memory.stats.cpu.creeps.builders = parseFloat(Memory.stats.cpu.creeps.builders) + existing;
    }
  }
}

module.exports = builder;