Creep.prototype.buildRun = function(){
  this.isWorking();
  if (this.working){
    this.speak('🚧')
    if (this.room.constructionSites.length > 0){
      this._target = this.room.constructionSites[0]
      if (this.build(this._target) === ERR_NOT_IN_RANGE){
        this.moveTo(this._target);
      }
    }
  } else {
    this.speak('☀️')
    this.getEnergy();
  }
}