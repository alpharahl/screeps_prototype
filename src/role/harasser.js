module.exports = {
  run(creep){
    if (creep.room.name === creep.memory.targetRoom){
      var creeps = creep.room.find(FIND_HOSTILE_CREEPS, {
        filter: (i) => {
          return i.name.includes('repair');
        }
      })
      if (creeps.length > 0){
        for (const i of creeps[0].body){
          if (i.type === WORK && i.hits > 0){

            if (creep.attack(creeps[0]) === ERR_NOT_IN_RANGE){
              creep.moveTo(creeps[0])
            }
            return;
          }
        }
      }
      var spawns = creep.room.find(FIND_HOSTILE_SPAWNS)
      if (spawns.length > 0){
        if (creep.attack(spawns[0]) === ERR_NOT_IN_RANGE){
          creep.moveTo(spawns[0])
        }
      }
    } else {
      creep.moveTo(new RoomPosition(25,25,creep.memory.targetRoom))
    }
  }
}