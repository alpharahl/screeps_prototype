module.exports = {
  run(room){
    const startCpu = Game.cpu.getUsed();
    const existing = parseFloat(Memory.stats.cpu.creeps.queens);
    for (const leaf of room.leafs){
      const queen = leaf.queen;
      if (queen) {
        queen.isWorking();
        if (queen.working) {

          const startCpuExtensions = Game.cpu.getUsed();
          const existingExtensions = parseFloat(Memory.stats.cpu.creeps.breakdown.queens.extensions);
          if (this.fillExtensions(leaf, queen)) {
            queen.memory.idle = false;
            continue;
          }
          Memory.stats.cpu.creeps.breakdown.queens.extensions = Game.cpu.getUsed() - startCpuExtensions;
          if (existingExtensions){
            Memory.stats.cpu.creeps.breakdown.queens.extensions = parseFloat(Memory.stats.cpu.creeps.breakdown.queens.extensions) + existingExtensions;
          }

          const startSpawnCpu = Game.cpu.getUsed();
          const existingSpawn = parseFloat(Memory.stats.cpu.creeps.breakdown.queens.spawns);
          if (this.fillSpawns(leaf, queen)){
            queen.memory.idle = false;
            continue;
          }
          Memory.stats.cpu.creeps.breakdown.queens.spawns = Game.cpu.getUsed() - startSpawnCpu;
          if (existingSpawn){
            Memory.stats.cpu.creeps.breakdown.queens.spawns = parseFloat(Memory.stats.cpu.creeps.breakdown.queens.spawns) + existingSpawn;
          }

          const startTowerCpu = Game.cpu.getUsed();
          const existingTower = parseFloat(Memory.stats.cpu.creeps.breakdown.queens.towers);
          if (this.fillTowers(leaf, queen)) {
            queen.memory.idle = false;
            continue;
          }
          Memory.stats.cpu.creeps.breakdown.queens.towers = Game.cpu.getUsed() - startTowerCpu;
          if (existingTower){
            Memory.stats.cpu.creeps.breakdown.queens.towers = parseFloat(Memory.stats.cpu.creeps.breakdown.queens.towers) + existingTower;
          }


          const startingUpgraderCpu = Game.cpu.getUsed();
          const existingUpgrader = parseFloat(Memory.stats.cpu.creeps.breakdown.queens.upgrader);
          if (leaf.id.includes('-4')){
            queen.memory.idle = false;
            queen.fillUpgrader();
            break;;
          }
          Memory.stats.cpu.creeps.breakdown.queens.upgrader = Game.cpu.getUsed() - startingUpgraderCpu;
          if (existingUpgrader){
            Memory.stats.cpu.creeps.breakdown.queens.upgrader = parseFloat(Memory.stats.cpu.creeps.breakdown.queens.upgrader) + existingUpgrader;
          }

          const startingLinkCpu = Game.cpu.getUsed();
          const existingLinks = parseFloat(Memory.stats.cpu.creeps.breakdown.queens.links);
          if (leaf.links.length > 0 && leaf.links[0].energy > 0) {
            this.empty(leaf, queen);
            queen.memory.idle = false;
            break;
          }
          Memory.stats.cpu.creeps.breakdown.queens.links = Game.cpu.getUsed() - startingLinkCpu;
          if (existingLinks){
            Memory.stats.cpu.creeps.breakdown.queens.links = parseFloat(Memory.stats.cpu.creeps.breakdown.queens.links) + existingLinks;
          }


          if (queen.energy < queen.carryCapacity) {
            queen.memory.idle = false;
            queen.working = false
          }

          const startingIdle = Game.cpu.getUsed();
          const existingIdle = parseFloat(Memory.stats.cpu.creeps.breakdown.queens.idleTime);
          if (!queen.memory.idle){
            if (queen.pos !== leaf.idlePoint){
              queen.moveTo(leaf.idlePoint)
            } else {
              queen.memory.idle = true;
            }
          }
          Memory.stats.cpu.creeps.breakdown.queens.idleTime = Game.cpu.getUsed() - startingIdle;
          if (existingIdle){
            Memory.stats.cpu.creeps.breakdown.queens.idleTime = parseFloat(Memory.stats.cpu.creeps.breakdown.queens.idleTime) + existingIdle;
          }

        } else {
          queen.speak("☀️");
          if (this.emptyLink(leaf, queen)) {
            continue;
          }
          if (queen.room.storage.store[RESOURCE_ENERGY] === 0){
            queen.moveTo(leaf.idlePoint)
            return;
          }
          if (queen.withdraw(queen.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            queen.moveTo(queen.room.storage);
          }
        }
      }
    }
    Memory.stats.cpu.creeps.queens = Game.cpu.getUsed() - startCpu;
    if (existing){
      Memory.stats.cpu.creeps.queens = parseFloat(Memory.stats.cpu.creeps.queens) + existing
    }
  },

  fillExtensions(leaf, queen){
    var exts = leaf.extensions.filter(extension => extension.energy < extension.energyCapacity)
    if (exts.length > 0){
      if (queen.transfer(exts[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
        queen.moveTo(exts[0]);
      }
      return true;
    }
  },

  fillSpawns(leaf, queen){
    var spawns = leaf.spawns.filter(spawn => spawn.energy < spawn.energyCapacity)
    if (spawns.length > 0){
      if (queen.transfer(spawns[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
        queen.moveTo(spawns[0]);
      }
      return true;
    }
  },

  fillTowers(leaf, queen){
    var towers = leaf.towers.filter(tower => tower.energy < tower.energyCapacity);
    if (towers.length > 0){
      if (queen.transfer(towers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
        queen.moveTo(towers[0])
      }
      return true;
    }
  },

  emptyLink(leaf, queen){
    var links = leaf.links.filter(link => link.energy > 0)
    if (links.length > 0){
      if (queen.withdraw(links[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
        queen.moveTo(links[0])
      }
      return true;
    }

  },

  empty(leaf, queen){
    if (leaf.storage){
      if (queen.transfer(leaf.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
        queen.moveTo(leaf.storage);
      }
    }
  }
}