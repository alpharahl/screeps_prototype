var upgraderSpawner = {
  run(room){
    if (!room.ownedByMe()){
      return;
    }
    if (room.bestSpawner){
      var upgraderCount = 1;
      if (room.storage.store[RESOURCE_ENERGY] > 50000){
        upgraderCount = 2;
      }
      if (room.storage.store[RESOURCE_ENERGY] > 100000){
        upgraderCount = 3;
      }
      if (room.storage.store[RESOURCE_ENERGY] > 150000) {
        upgraderCount = 4;
      }
      if (room.storage.store[RESOURCE_ENERGY] > 200000){
        upgraderCount = 5;
      }
      if (room.upgraders.length < upgraderCount){
        room.bestSpawner.spawnUpgrader();
      }
    }
  }
}

module.exports = upgraderSpawner;