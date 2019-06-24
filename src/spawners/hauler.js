var haulerSpawner = {
  run(room){
    if (!room.ownedByMe()){
      return;
    }
    var haulerCount = 2;
    if ( room.storage && room.storage.energy > 0){
      haulerCount = 2;
    }
    for (const source of room.sources){
      if (source.link){
        haulerCount--;
      }
    }
    if (room.haulers.length < haulerCount){
      if (room.bestSpawner){
        room.bestSpawner.spawnHauler();
      }
    }
  }
}

module.exports = haulerSpawner;