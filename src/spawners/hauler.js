var haulerSpawner = {
  run(room){
    if (room.haulers().length < 2){
      if (room.bestSpawner()){
        room.bestSpawner().spawnHauler();
      }
    }
  }
}

module.exports = haulerSpawner;