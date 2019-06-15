var upgraderSpawner = {
  run(room){
    if (room.upgraders.length < 2){
      if (room.bestSpawner()){
        room.bestSpawner().spawnUpgrader();
      }
    }
  }
}

module.exports = upgraderSpawner;