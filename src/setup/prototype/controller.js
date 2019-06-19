Object.defineProperty(StructureController.prototype, 'storage', {
  get (){
    if (!this._storage){
      if (this.room.ownedByMe()) {
        if (!this.room.memory.controllerStorage){
          var pos = this.pos.findPathTo(this.room.spawns[0])[1];
          var roomPos = new RoomPosition(pos.x, pos.y, this.room.name);
          if (roomPosPos.createConstructionSite(STRUCTURE_CONTAINER) === OK){
            this.room.memory.controllerStorage = 'building';
            this.room.memory.controllerStoragePos = roomPos;
          }
        } else if (this.room.memory.controllerStorage === 'building'){
          var posMem = this.room.memory.controllerStoragePos;
          console.log('1')
          var pos = new RoomPosition(posMem.x, posMem.y, this.room.name);
          console.log('2')
          var containers = pos.lookFor(LOOK_STRUCTURES);
          if (containers.length > 0){
            var container = containers[0];
            this.room.memory.controllerStorage = container.id;
          }
        }
      }
    }
    return this._storage
  },
  enumerable: false,
  configurable:true
})