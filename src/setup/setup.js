require('setup_prototype_creep');
require('setup_prototype_room');
require('setup_prototype_source');
require('setup_prototype_game');
require('setup_prototype_structureSpawn')
require('setup_prototype_structureContainer')

for (var name in Memory.creeps){
  if (!Game.creeps[name]){
    delete Memory.creeps[name];
    console.log("Clearing out old creeps memory:", name);
  }
}