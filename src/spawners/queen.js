var queenSpawner = {
  run(room){
    for (const leaf of room.leafs){
      if (!leaf.queen){
        if (room.bestSpawner){

          room.bestSpawner.spawnQueen(leaf);
        }
      }
    }
  }
}

module.exports = queenSpawner;