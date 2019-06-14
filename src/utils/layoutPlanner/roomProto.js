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