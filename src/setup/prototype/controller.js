Object.defineProperty(StructureController.prototype, 'storage', {
  get (){
    if (!this._storage){
      if (this.room.ownedByMe()) {
        if (!this.room.memory.controllerStorage){
          var pos = this.pos.findPathTo(this.room.spawns[0])[1];
          var roomPos = new RoomPosition(pos.x, pos.y, this.room.name);
          if (roomPosPos.createConstructionSite(STRUCTURE_CONTAINER) === OK){
            this.room.memory.controllerStorage = 'building';
            this.room.memory.controllerStoragePos = pos;
          }
        } else if (this.room.memory.controllerStorage === 'building'){
          var  pos;
        }
      }
    }
    return this._storage
  },
  enumerable: false,
  configurable:true
})