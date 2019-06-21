Creep.prototype.queen = function(){
  this.isWorking();
  if (this.working){
    if (this.fillExtensions()){
      return;
    }
    if (this.fillSpawns()){
      return;
    }
    if (this.fillTowers()){
      return;
    }
    if (this.fillUpgrader()){
      return;
    }
  } else {
    this.speak("☀️");
    if (this.withdraw(this.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
      this.moveTo(this.room.storage);
    }
  }
}