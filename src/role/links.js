module.exports = {
  run(room){
    for (const source of room.sources){
      if (source.link){
        source.link.sendToBase();
      }
    }
  }
}