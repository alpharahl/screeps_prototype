

var minerSpawner = {
  run(){
    var rooms = [];
    for (const roomName in Game.rooms){
      const room = Game.rooms[roomName]
      if (room.ownedByMe()){
        rooms.push(room);
      }
    }

    for (const room of rooms){
      for (const sourceId in room.miners){
        if (room.miners[sourceId] == null){
          if (room.bestSpawner()){
            room.bestSpawner().spawnMiner(sourceId);
          }
        }
      }
    }
  }
}

module.exports = minerSpawner;

