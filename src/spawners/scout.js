module.exports = {
  run(room){
    if (room.controller.level > 4){
      if (!room.scout && room.scoutTarget){
        if (room.bestSpawner){
          room.bestSpawner.spawnScout();
        }
      }
    }
  }
}