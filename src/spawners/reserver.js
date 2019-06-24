module.exports = {
  run(room){
    for (const roomName of room.reserveRooms){
      if (!room.memory.reservers){
        room.memory.reservers = {}
      }
      if (room.memory.reservers[roomName]){
        var creep = Game.creeps[room.memory.reservers[roomName]];
        if(creep){
          return;
        }
        room.memory.reservers[roomName] = null;
      }
      if (room.bestSpawner){
        room.bestSpawner.spawnReserver(roomName)
      }
    }
  }
}