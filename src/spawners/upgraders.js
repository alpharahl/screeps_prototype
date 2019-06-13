var upgraderSpawner = {
  run(){
    var rooms = [];
    for (const roomName in Game.rooms){
      const room = Game.rooms[roomName];
      if (room.ownedByMe()){
        rooms.push(room);
      }
    }

    for (const room of rooms){
      if (room.upgraders.length < 3){
        if (room.bestSpawner()){
          room.bestSpawner().spawnUpgrader();
        }
      }
    }
  }
}

module.exports = upgraderSpawner;