var haulerSpawner = {
  run(room){
    var haulerCount = room.sources.length;
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
    for (const source of room.sources){
      if (!source.hauler){
        if (room.bestSpawner){
          room.bestSpawner.spawnRemoteHauler(source, room.name);
        }
      }
    }
  }
}

module.exports = haulerSpawner;