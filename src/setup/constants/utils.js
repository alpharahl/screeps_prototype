var rooms = [];
for (const roomName in Game.rooms){
  const room = Game.rooms[roomName];
  if (room.ownedByMe()){
    rooms.push(room);
  }
}

global.ROOMS = rooms;
