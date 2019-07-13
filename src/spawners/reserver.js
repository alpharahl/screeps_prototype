module.exports = {
  run(room){
    for (const roomName of room.reserveRooms){
      if (!room.memory.reservers){
        room.memory.reservers = {}
      }
      if (room.memory.reservers[roomName]){
        var creep = Game.creeps[room.memory.reservers[roomName]];
        if(creep){
          continue;
        }
        room.memory.reservers[roomName] = null;
      }
      var targetRoom = Game.rooms[roomName]
      if (!targetRoom || (targetRoom && targetRoom.controller.reservation && targetRoom.controller.reservation.ticksToEnd < 2500)){
        if (room.bestSpawner){
          room.bestSpawner.spawnReserver(roomName)
        }
      }
    }
  }
}