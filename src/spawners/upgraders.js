var upgraderSpawner = {
  run(room){
    if (!room.ownedByMe()){
      return;
    }
    if (room.bestSpawner){
      var upgraderCount = 2;
      if (room.storage){
        upgraderCount = 1;

        if (room.storage.store[RESOURCE_ENERGY] > UPGRADER_GOAL_MIN){
          upgraderCount = 2;
        }
        if (room.storage.store[RESOURCE_ENERGY] > UPGRADER_GOAL_MAX){
          upgraderCount = 3;
        }
      }
      if (room.upgraders.length < upgraderCount){
        room.bestSpawner.spawnUpgrader();
      }
    }
  }
}

module.exports = upgraderSpawner;