var haulerSpawner = {
  run(room){
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
  },

  remoteRun(room){
    var haulerCount = 2;
    if (room.haulers.length < haulerCount){
      if (room.bestSpawner){
        room.bestSpawner.spawnHauler(roomName);
      }
    }
  }
}

module.exports = haulerSpawner;