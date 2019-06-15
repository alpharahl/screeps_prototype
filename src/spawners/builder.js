var builderSpanwer = {
  run(){
    for (const room of ROOMS){
      if (room.constructionSites.length > 0){
        if (room.builders.length < 1){
          if (room.bestSpawner()){
            room.bestSpawner().spawnBuilder();
          }
        }
      }
    }
  }
}

module.exports = builderSpanwer;