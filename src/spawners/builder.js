var builderSpanwer = {
  run(room){
    var builderNum = Math.ceil(room.constructionSites.length / 3);
    if (builderNum > 3){
      builderNum = 3;
    }
    if (room.builders.length < builderNum){
      if (room.bestSpawner){
        room.bestSpawner.spawnBuilder();
      }
    }

  }
}

module.exports = builderSpanwer;