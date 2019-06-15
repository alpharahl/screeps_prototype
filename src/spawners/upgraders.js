var upgraderSpawner = {
  run(){
    for (const room of ROOMS){
      if (room.upgraders.length < 2){
        if (room.bestSpawner()){
          room.bestSpawner().spawnUpgrader();
        }
      }
    }
  }
}

module.exports = upgraderSpawner;