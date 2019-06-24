var minerSpawner = {
  run(room){
    for (const sourceId in room.miners){
      if (room.miners[sourceId] == null){
        if (room.bestSpawner){
          room.bestSpawner.spawnMiner(sourceId);
        }
      }
    }
  },

  remoteRun(room){
    for (const sourceId in room.miners){
      if (room.miners[sourceId] === null){
        if (room.bestSpawner){
          room.bestSpawner.spawnMiner(sourceId, room.name);
        }
      }
    }
  }
}

module.exports = minerSpawner;

