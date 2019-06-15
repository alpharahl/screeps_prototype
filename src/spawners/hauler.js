var haulerSpawner = {
  run(){
    for (const room of ROOMS){
      if (room.haulers.length < 2){
        if (room.bestSpawner()){
          room.bestSpawner().spawnHauler();
        }
      }
    }
  }
}

module.exports = haulerSpawner;