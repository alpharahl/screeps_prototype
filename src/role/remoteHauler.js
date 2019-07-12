module.exports = {
  run(creep){
    const startCpu = Game.cpu.getUsed();
    const existing = parseFloat(Memory.stats.cpu.creeps.remoteHaulers);
    creep.remoteHaul();
    Memory.stats.cpu.creeps.remoteHaulers = Game.cpu.getUsed() - startCpu;
    if(existing){
      Memory.stats.cpu.creeps.remoteHaulers = parseFloat(Memory.stats.cpu.creeps.remoteHaulers + existing);
    }
  },

  haul(creep){

  }
}