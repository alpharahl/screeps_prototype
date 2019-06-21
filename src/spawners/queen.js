var queenSpawner = {
  run(room){
    if (room.queens.length < room.leafs){
      if (room.bestSpawner){
        room.bestSpawner.spawnQueen();
      }
    }

  }
}

module.exports = queenSpawner;