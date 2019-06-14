require('utils_layoutPlanner_roomProto')

var planner = {
  run(){
    for (const roomName in Game.rooms){
      const room = Game.rooms[roomName];
      if (room.ownedByMe()){
        planner.placeTowers(room);
      }
    }
  },

  placeExtensions(){},

  placeTowers(room){
    if ((room.towers.length + room.towerSites.length) < CONTROLLER_STRUCTURES['tower'][room.controller.level]){
      console.log('need to place a tower');

    }
  }
}

module.exports = planner;