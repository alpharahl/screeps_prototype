require('utils_layoutPlanner_roomProto')

var planner = {
  run(){
    for (const roomName in Game.rooms){
      const room = Game.rooms[roomName];
      if (room.ownedByMe()){
        planner.placeTowers(room);
        planner.placeExtensions(room);
        planner.placeRoads(room);
      }
    }
  },

  getPos(x, y, room){
    return new RoomPosition(room.baseRoot.x + x, room.baseRoot.y + y, room.name)
  },

  placeExtensions(room){
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
            pos.createConstructionSite(STRUCTURE_EXTENSION);
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
            pos.createConstructionSite(STRUCTURE_TOWER);
          }
        }
      }

    }
  },

  placeRoads(room){
    for (const rowInd in LAYOUT){
      const row = LAYOUT[rowInd];
      for (const pInd in row){
        const placement = row[pInd];
        if (placement === 'r'){
          const pos = planner.getPos(parseInt(pInd), parseInt(rowInd), room);
          new RoomVisual(room.name).circle(pos, {
            fill: 'red'
          })
        }
      }
    }
  }
};

module.exports = planner;