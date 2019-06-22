module.exports = {
  run(room){
    room.queenAvoid;
    for (const leaf of room.leafs){
      const queen = leaf.queen;
      if (queen) {
        // this.backup(queen)
        queen.isWorking();
        if (queen.working) {
          if (this.fillExtensions(leaf, queen)) {
            continue;
          }
          if (this.fillSpawns(leaf, queen)){
            continue;
          }
          if (this.fillTowers(leaf, queen)) {
            continue;
          }
          if (leaf.links.length > 0 && leaf.links[0].energy > 0) {
            this.empty(leaf, queen);
          }
          if (queen.energy < queen.carryCapacity) {
            queen.working = false
          }
        } else {
          queen.speak("☀️");
          if (this.emptyLink(leaf, queen)) {
            continue;
          }
          if (queen.withdraw(queen.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            queen.moveTo(queen.room.storage);
          }
        }
      }
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
  },

  backup(queen){
    queen.queen();
  }
}