var hauler = {
  run(creep){
    const startCpu = Game.cpu.getUsed();
    const existing = parseFloat(Memory.stats.cpu.creeps.haulers);
    creep.haul();
    Memory.stats.cpu.creeps.haulers = Game.cpu.getUsed() - startCpu;
    if (existing){
      Memory.stats.cpu.creeps.haulers = parseFloat(Memory.stats.cpu.creeps.haulers) + existing;
    }
  }
}

module.exports = hauler;