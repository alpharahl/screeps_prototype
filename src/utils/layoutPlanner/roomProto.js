var Leaf = require('setup_prototype_leaf');
var Road = require('setup_prototype_road');

Object.defineProperty(Room.prototype, 'towers', {
  get(){
    if (!this._towers){
      this._towers = this.find(FIND_MY_STRUCTURES, {
        filter: (i) => {
          return i.structureType === STRUCTURE_TOWER
        }
      })
    }
    return this._towers;
  }
})

Object.defineProperty(Room.prototype, 'towerSites',  {
  get(){
    if (!this._towerSites){
      this._towerSites = this.find(FIND_CONSTRUCTION_SITES ,{
        filter: (i) => {
          return i.structureType === STRUCTURE_TOWER
        }
      })
    }
    return this._towerSites;
  }
})

Object.defineProperty(Room.prototype, 'avoidArray', {
  get(){
    if (!this._avoidArray){
      this._avoidArray = [];
      if (!this.memory.avoidArray){
        var avoidArray = [];
        for (const leaf of this.leafs){
          avoidArray = avoidArray.concat(leaf.noWalk);
        }
        // add in room storage location and above that
        avoidArray.push(new RoomPosition(this.baseLocation.x, this.baseLocation.y - 1, this.name));
        avoidArray.push(new RoomPosition(this.baseLocation.x, this.baseLocation.y - 2, this.name));
        this.memory.avoidArray = avoidArray;
      }
      this._avoidArray = this.memory.avoidArray;
    }
    return this._avoidArray;
  }
})

Object.defineProperty(Room.prototype, 'cMatrix', {
  get(){
    if (!this._cMatrix){
      if (!this.memory.cMatrix){
        const cMatrix = function(roomName, costMatrix) {
          for (const pos of avoidArray) {
            costMatrix.set(pos.x, pos.y, 100);
          }

          for (const ind in this.sources) {
            const source = this.sources[ind]
            if (source.link) {
              var pos = source.link.pos;
              costMatrix.set(pos.x, pos.y, 1);
            }
          }
        }
        this.memory.cMatrix = cMatrix.serialize();
      }
      this._cMatrix = PathFinder.CostMatrix.deserialize(this.memory.cMatrix);
    }
    return this._cMatrix;
  }
})

Room.prototype.idealPath = function(item1, item2){
  var avoidArray = this.avoidArray
  const path = this.findPath(item1, item2, {
    costCallback: this.cMatrix,
    ignoreCreeps: true,
    swampCost: 1
  });
  return path;
}

Object.defineProperty(Room.prototype, 'roads', {
  get(){
    if (!this._roads){
      this._roads = {}
      for (const source of this.sources){
        const road = new Road(source.pos, this.storageLocation, this);
        this._roads[source.id] = road;
      }
      if (this.controller.storage){
        const road = new Road(this.controller.storage.pos, this.storageLocation, this);
        this._roads[this.controller.storage.id] = road;
      }
    }
    return this._roads;
  }
})

Object.defineProperty(Room.prototype, 'extensions', {
  get(){
    if (!this._extensions){
      this._extensions = this.find(FIND_MY_STRUCTURES, {
        filter: (i) => {
          return i.structureType === STRUCTURE_EXTENSION
        }
      })
    }
    return this._extensions;
  }
})

Object.defineProperty(Room.prototype, 'extensionSites', {
  get(){
    if (!this._extensionSites){
      this._extensionSites = this.find(FIND_CONSTRUCTION_SITES, {
        filter: (i) => {
          return i.structureType === STRUCTURE_EXTENSION
        }
      })
    }
    return this._extensionSites;
  }
})

Object.defineProperty(Room.prototype, 'leafs', {
  get(){
    if (!this._leafs){
      this._leafs = [];
      if (this.controller.level > 1){
        this._leafs = [
          this.leaf1,
          this.leaf2
        ]
      }
      if (this.controller.level > 5){
        this._leafs = this._leafs.concat([
          this.leaf3,
          this.leaf4
        ])
      }
    }
    return this._leafs;
  }
})

Object.defineProperty(Room.prototype, 'leaf1', {
  get(){
    if (!this._leaf1){
      this._leaf1 = new Leaf(this, this.baseRoot, 1);
    }
    return this._leaf1;
  }
})
Object.defineProperty(Room.prototype, 'leaf2', {
  get(){
    if (!this._leaf2){
      this._leaf2 = new Leaf(this, new RoomPosition(this.baseRoot.x + 6, this.baseRoot.y, this.name), 2);
    }
    return this._leaf2;
  }
})
Object.defineProperty(Room.prototype, 'leaf3', {
  get(){
    if (!this._leaf3){
      this._leaf3 = new Leaf(this, new RoomPosition(this.baseRoot.x, this.baseRoot.y + 6, this.name), 3);
    }
    return this._leaf3;
  }
})
Object.defineProperty(Room.prototype, 'leaf4', {
  get(){
    if (!this._leaf4){
      this._leaf4 = new Leaf(this, new RoomPosition(this.baseRoot.x + 6, this.baseRoot.y + 6, this.name), 4);
    }
    return this._leaf4;
  }
})

Object.defineProperty(Room.prototype, 'links', {
  get(){
    if (!this._links){
      this._links = this.find(FIND_MY_STRUCTURES, {
        filter: (i) => {
          return i.structureType === STRUCTURE_LINK
        }
      })
    }
    return this._links;
  }
})

Object.defineProperty(Room.prototype, 'linkSites', {
  get(){
    if (!this._linkSites){
      this._linkSites = this.find(FIND_CONSTRUCTION_SITES, {
        filter: (i) => {
          return i.structureType === STRUCTURE_LINK
        }
      })
    }
    return this._linkSites;
  }
})



