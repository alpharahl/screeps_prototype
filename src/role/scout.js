module.exports = {
  run(creep){
    if (creep.memory.target === creep.room.name){
      this.scout(creep.room, creep);
      creep.memory.target = null;
    } else {
      if (creep.memory.target){
        creep.say(creep.memory.target);
        creep.moveTo(new RoomPosition(25,25, creep.memory.target));
      } else {
        //console.log('looking for a new scout target');
        creep.memory.target = Game.rooms[creep.memory.home].scoutTarget;
        if (!creep.memory.target){
          creep.suicide();
        }
      }
    }
  },

  scout(room, creep){
    room.sources;
    var home = Game.rooms[creep.memory.home];
    room.memory.home = creep.memory.home;
    room.memory.distHome = Game.map.findRoute(room, home);
    if (room.sources.length === 2 && Game.map.findRoute(room, home).length <= 2 && Game.map.isRoomAvailable(room.name) && !AVOID.includes(room)){
      home.memory.scoutReports[room.name].reserve = true;
    } else if (room.sources.length === 1 && Game.map.findRoute(room, home).length === 1){
      home.memory.scoutReports[room.name].reserve = true;
    }
    if (home.memory.scoutReports[room.name]){
      home.memory.scoutReports[room.name].lastSeen = Game.time;
    }
  }
}