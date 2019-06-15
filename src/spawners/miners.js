

var minerSpawner = {
  run(room){
    for (const sourceId in room.miners){
      if (room.miners[sourceId] == null){
        if (room.bestSpawner){
          room.bestSpawner.spawnMiner(sourceId);
        }
      }
    }
  }
}

module.exports = minerSpawner;

