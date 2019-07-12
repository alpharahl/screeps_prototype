var minerSpawner = {
  run(room){
    for (const source of room.sources){
      if (!source.miner){
        if (room.bestSpawner){
          room.bestSpawner.spawnMiner(source);
        }
      }
    }
  },

  remoteRun(room){
    for (const source of room.sources){
      if (!source.miner){
        if (room.bestSpawner){
          room.bestSpawner.spawnMiner(source, room.name);
        }
      }
    }
  }
}

module.exports = minerSpawner;

