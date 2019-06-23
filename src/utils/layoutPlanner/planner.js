require('utils_layoutPlanner_roomProto')

var planner = {
  run(){
    for (const roomName in Game.rooms){
      const room = Game.rooms[roomName];
      if (room.ownedByMe()){
        planner.placeTowers(room);
        planner.placeExtensions(room);
        planner.placeRoads(room);
        planner.placeStorage(room);
        planner.placeLinks(room);
        planner.placeRamparts(room);
        if (Game.time % 10000 === 0){
          room.removeAllWalls();
        }
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

  placeRamparts(room){
    if (!room.expandable){
      return;
    }
    if (room.criticalWallsAndRamparts.length > 0){
      return;
    }
    if (room.memory.ramparts !== 'complete' || Game.time % 100 === 0){
      room.memory.ramparts = null;
      for (const rowInd in LAYOUT){
        const row = LAYOUT[rowInd];
        for (const pInd in row){
          const placement = row[pInd];
          if (placement === 'n'){
            continue;
          }
          const pos = planner.getPos(parseInt(pInd), parseInt(rowInd), room);
          const structs = pos.lookFor(LOOK_STRUCTURES)
          for (const s of structs){
            if (s.structureType === STRUCTURE_RAMPART){
              continue;
            }
          }
          new RoomVisual(room.name).circle(pos.x, pos.y, {fill: 'green'})
          if (pos.createConstructionSite(STRUCTURE_RAMPART) === OK){
            return;
          }
        }
      }
      room.memory.ramparts = 'complete'

    }
  },

  placeStorage(room){
    if (room.storage || CONTROLLER_STRUCTURES['storage'][room.controller.level] === 0){
      return;
    }
    for (const rowInd in LAYOUT){
      const row = LAYOUT[rowInd]
      for (const pInd in row){
        const placement = row[pInd];
        if (placement === 'b'){
          const pos = planner.getPos(parseInt(pInd), parseInt(rowInd), room);
          pos.createConstructionSite(STRUCTURE_STORAGE);
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
    if (room.memory.bunkerRoads === "complete" && Game.time % 1000 !== 0){
      return;
    }
    if (room.constructionSites.length === 0){
      for (const rowInd in LAYOUT){
        const row = LAYOUT[rowInd];
        for (const pInd in row){
          const placement = row[pInd];
          if (placement === 'r'){
            const pos = planner.getPos(parseInt(pInd), parseInt(rowInd), room);
            new RoomVisual(room.name).circle(pos, {
              fill: 'red'
            })
            if (pos.createConstructionSite(STRUCTURE_ROAD) === OK){
              return;
            }
          }
        }
      }
      // if we get here, no need to build more roads
      room.memory.bunkerRoads = "complete"
    }
  },

  placeLinks(room){
    if ((room.links.length + room.linkSites.length) < CONTROLLER_STRUCTURES['link'][room.controller.level] ){
      if ((room.links.length + room.linkSites.length)  === 0){
        for (const rowInd in LAYOUT) {
          const row = LAYOUT[rowInd];
          for (const pInd in row) {
            const placement = row[pInd];
            if (placement === 'l') {
              const pos = planner.getPos(parseInt(pInd), parseInt(rowInd), room);
              new RoomVisual(room.name).circle(pos, {
                fill: 'red'
              })
              if (pos.createConstructionSite(STRUCTURE_LINK) === OK){
                return;
              }
            }
          }
        }
      } else {
        var sources = room.sources.sort((a, b) => {
          if (a.distToBase > b.distToBase){
            return -1;
          } else if (a.distToBase < b.distToBase){
            return 1;
          }
          return 0;
        })
        for (const source of sources){
          if (!source.link){
            // const pos = new RoomPosition(source.linkPos.x, source.linkPos.y, room.name)
            new RoomVisual(room.name).circle(source.linkSpot, {
              fill: 'red'
            })
            var pos = new RoomPosition(source.linkSpot.x, source.linkSpot.y, room.name)
            if (pos.createConstructionSite(STRUCTURE_LINK) === OK){
              return;
            }
          }
        }

      }
    }
  }
};

module.exports = planner;