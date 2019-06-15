var builderSpanwer = {
  run(room){
    if (room.constructionSites.length > 0){
      if (room.builders.length < 2){
        if (room.bestSpawner()){
          room.bestSpawner().spawnBuilder();
        }
      }
    }
  }
}

module.exports = builderSpanwer;