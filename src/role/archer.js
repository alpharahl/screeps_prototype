module.exports = {
  run(creep){
    if (creep.room.name === creep.memory.targetRoom){
      var creeps = creep.room.find(FIND_HOSTILE_CREEPS)
      if (creeps.length > 0){
        var target = creeps[0]
        var path = creep.pos.findPathTo(creep.pos, new RoomPosition(25,25,creep.memory.targetRoom))
        creep.moveTo(new RoomPosition(25,25,creep.memory.targetRoom))
        if (path.length < 2){
          console.log(path)

          // var direction = path[0].direction
          // var rand = Math.ceil(Math.random() * 10)
          // if (rand > 5){
          //   direction = 4 - direction
          // } else {
          //   direction = 3 - direction
          // }
          // if (direction < 0){
          //   direction = 8 - direction
          // }
          //
          // creep.move(direction);
        }
        console.log(creeps)
        console.log(creep.rangedAttack(creeps[0]));
      }
    }else {
      creep.moveTo(new RoomPosition(25,25,creep.memory.targetRoom))
    }
  }
}