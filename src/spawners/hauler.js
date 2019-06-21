var haulerSpawner = {
  run(room){
    var haulerCount = 2;
    if (room.storage.energy > 0){
      haulerCount = 2;
    }
    if (room.haulers.length < haulerCount){
      if (room.bestSpawner){
        room.bestSpawner.spawnHauler();
      }
    }
  }
}

module.exports = haulerSpawner;