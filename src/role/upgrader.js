var upgrader = {
  run(creep){
    const startCpu = Game.cpu.getUsed();
    const existing = parseFloat(Memory.stats.cpu.creeps.upgraders);
    creep.upgrade();
    Memory.stats.cpu.creeps.upgraders = Game.cpu.getUsed() - startCpu;
    if (existing){
      Memory.stats.cpu.creeps.upgraders = parseFloat(Memory.stats.cpu.creeps.upgraders) + existing;
    }
  }
}

module.exports = upgrader;