function RemoteRoom(room){
  this.room = room;
  this.home = room.home;
  this.id = room.name;
  this.memory = room.memory;
  this.sources = room.sources;
  this.controller = room.controller;
}

Object.defineProperty(RemoteRoom.prototype, 'mapPath', {
  get(){
    if (!this._mapPath){
      if (!this.memory.mapPath){
        let mapPath = Game.map.findRoute(this.id, this.home.name).map(x => x.room)
        mapPath.unshift(this.id);
        this.memory.mapPath = mapPath;
      }
      this._mapPath = this.memory.mapPath;
    }
    return this._mapPath;
  }
})

Object.defineProperty(RemoteRoom.prototype, 'mapPathRooms', {
  get(){
    if (!this._mapPathRooms){
      this._mapPathRooms = [];
      for (const name of this.mapPath){
        if (Game.rooms[name]){
          this._mapPathRooms.push(Game.rooms[name]);
        }
      }
    }
    return this._mapPathRooms;
  }
})

RemoteRoom.prototype.createRoad = function(path){
  if (!Game.rooms[this.name]){
    return;
  }
  for (const pos of path.path){
    if (Object.keys(Game.constructionSites).length <10){
      const structs = pos.lookFor(LOOK_STRUCTURES);
      if (structs.length > 0){
        continue;
      }
      const sites = pos.lookFor(LOOK_CONSTRUCTION_SITES);
      if (sites.length > 0){
        continue;
      }
      new RoomVisual(pos.roomName).circle(pos, {fill: 'red'})
      if(pos.createConstructionSite(STRUCTURE_ROAD) === OK){
        return true;
      }
    }
  }
}

RemoteRoom.prototype.sourceRoads = function (){
  if (!this.room.memory.sourceRoads){
    this.room.memory.sourceRoads = {};
  }
  for (const source of this.room.sources){
    if (!this.room.memory.sourceRoads[source.id] || Game.time % 1000 === 0){
      this.room.memory.sourceRoads[source.id] = false;
      const miningSpot = new RoomPosition(source.miningSpot.x, source.miningSpot.y, this.room.name);
      var path = PathFinder.search(this.home.storage.pos, miningSpot, {
        ignoreCreeps: true,
        swampCost: 2,
        plainCost: 2,
        roomCallback(name){
          const room = Game.rooms[name];
          if (!room) return;
          let costs = new PathFinder.CostMatrix;

          var roads = room.find(FIND_STRUCTURES, {
            filter: (i) => {
              return i.structureType === STRUCTURE_ROAD
            }
          })
          for (const sInd in roads){
            const struct = roads[sInd];
            costs.set(struct.pos.x, struct.pos.y, 1);
          }

          // don't step in leafs
          for (const leaf of room.leafs){
            for (const step of leaf.noWalk){
              costs.set(step.x, step.y, 50);
            }
          }

          for (const source of room.sources){
            const spot = source.miningSpot;
            costs.set(spot.x, spot.y, 255);
          }

          return costs;
        }
      });
      if (this.createRoad(path)){
        return;
      }
      this.room.memory.sourceRoads[source.id] = true;
    }
  }
}

Object.defineProperty(RemoteRoom.prototype, 'memory', {
  configurable: true,
  get: function() {
    if(_.isUndefined(Memory.myRemoteRoomMemory)) {
      Memory.myRemoteRoomMemory = {};
    }
    if(!_.isObject(Memory.myRemoteRoomMemory)) {
      return undefined;
    }
    return Memory.myRemoteRoomMemory[this.id] =
      Memory.myRemoteRoomMemory[this.id] || {};
  },
  set: function(value) {
    if(_.isUndefined(Memory.myRemoteRoomMemory)) {
      Memory.myRemoteRoomMemory = {};
    }
    if(!_.isObject(Memory.myRemoteRoomMemory)) {
      throw new Error('Could not set remote room memory');
    }
    Memory.myRemoteRoomMemory[this.id] = value;
  }
});


module.exports = RemoteRoom;


