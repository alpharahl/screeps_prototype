var upgraderSpawner = {
  run(room){
    if (!room.ownedByMe()){
      return;
    }
    if (room.bestSpawner){
      var upgraderCount = 1;
      if (room.upgraders.length < upgraderCount){
        room.bestSpawner.spawnUpgrader();
      }
    }
  }
}

module.exports = upgraderSpawner;