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
      if (this.controller.level <= 5){
        this._leafs = 2;
      } else {
        this._leafs = 4;
      }
    }
    return this._leafs;
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



