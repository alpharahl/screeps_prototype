StructureLink.prototype.sendToBase = function(){
  if (this.energy > 700){
    var links = this.room.leaf1.links;
    if ( links.length > 0){
      var link = links[0];
      if (link.energy < 100){
        this.transferEnergy(link);
      }
    }
  }
}