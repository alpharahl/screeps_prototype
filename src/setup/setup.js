require('setup_prototype_creep');
require('setup_prototype_room');
require('setup_prototype_source');
require('setup_prototype_game');
require('setup_prototype_structureSpawn')
require('setup_prototype_structureContainer')
require('setup_prototype_controller')
require('setup_prototype_storage');
require('setup_prototype_link');
require('setup_prototype_road');

for (var name in Memory.creeps){
  if (!Game.creeps[name]){
    delete Memory.creeps[name];
    console.log("Clearing out old creeps memory:", name);
  }
}