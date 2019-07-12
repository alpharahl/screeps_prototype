Object.defineProperty(StructureController.prototype, 'storage', {
  get (){
    if (!this._storage){
      if (this.room.ownedByMe()) {
        if (!this.room.memory.controllerStorage){
          var pos = this.pos.findPathTo(this.room.spawns[0])[1];
          var roomPos = new RoomPosition(pos.x, pos.y, this.room.name);
          if (roomPos.createConstructionSite(STRUCTURE_CONTAINER) === OK){
            this.room.memory.controllerStorage = 'building';
            this.room.memory.controllerStoragePos = roomPos;
          }
        } else if (this.room.memory.controllerStorage === 'building'){
          var posMem = this.room.memory.controllerStoragePos;
          var pos = new RoomPosition(posMem.x, posMem.y, this.room.name);
          var containers = pos.lookFor(LOOK_STRUCTURES);
          if (containers.length > 0){
            var container = containers[0];
            this.room.memory.controllerStorage = container.id;
          }
        } else {
          this._storage = Game.getObjectById(this.room.memory.controllerStorage);
          if (!this._storage){
            this.room.memory.controllerStorage = null;
          }
        }
      }
    }
    return this._storage
  },
  enumerable: false,
  configurable:true
})