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

  getPos(x, y, room){
    return new RoomPosition(room.baseRoot.x + x, room.baseRoot.y + y, room.name)
  },

  placeExtensions(){
    if ((room.extensions.length + room.extensionSites.length) < CONTROLLER_STRUCTURES['extension'][room.controller.level]){
      for (const rowInd in LAYOUT){
        const row = LAYOUT[rowInd]
        for(const pInd in row){
          const placement = row[pInd]
          if(placement === 'e'){
            const pos = planner.getPos(parseInt(pInd), parseInt(rowInd), room)
            new RoomVisual(room.name).circle(pos, {
              fill: 'yellow'
            })
          }
        }
      }
    }
  },

  placeTowers(room){
    if ((room.towers.length + room.towerSites.length) < CONTROLLER_STRUCTURES['tower'][room.controller.level]){
      for (const rowInd in LAYOUT){
        const row = LAYOUT[rowInd];
        for (const pInd in row){
          const placement = row[pInd]
          if (placement === 't'){
            const pos = planner.getPos(parseInt(pInd), parseInt(rowInd), room)
            new RoomVisual(room.name).circle(pos.x, pos.y)
          }
        }
      }

    }
  }
}

module.exports = planner;