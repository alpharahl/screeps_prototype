Object.defineProperty(StructureStorage.prototype, 'energy', {
  get () {
    if (!this._energy){
      this._energy = this.store[RESOURCE_ENERGY];
    }
    return this._energy;
  }
})