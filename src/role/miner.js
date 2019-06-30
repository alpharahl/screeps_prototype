var miner = {
  run(creep){
    const startCpu = Game.cpu.getUsed();
    const existing = parseFloat(Memory.stats.cpu.creeps.miners);
    creep.mine();
    Memory.stats.cpu.creeps.miners = Game.cpu.getUsed() - startCpu;
    if (existing){
      Memory.stats.cpu.creeps.miners = parseFloat(Memory.stats.cpu.creeps.miners) + existing;
    }
  }
}

module.exports = miner;