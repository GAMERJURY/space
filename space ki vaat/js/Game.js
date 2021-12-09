class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      'gameState': state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var CraftCountRef = await database.ref('CraftCount').once("value");
      if (CraftCountRef.exists()) {
        CraftCount = CraftCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
   
    backGround = createSprite( displayWidth - 40, displayHeight - 30)
    backGround.addImage(groundImage);
    backGround.velocityX = -3;
   
    craft1 = createSprite(130, 500);
    craft1.addImage(craft1Image);
    craft1.scale = 0.5
    craft1.visible=false
    craft1.debug = true
    craft1.setCollider("rectangle",0,0,250,110)
    craft2 = createSprite(130, 500);
    craft2.addImage(craft2Image);
    craft2.scale = 0.5
    craft2.visible=false
    craft2.debug = true
    craft2.setCollider("rectangle",0,0,250,110)
    crafts = [craft1, craft2]; 
    
    
  }

  play() {
    form.hide();
    
     if (backGround.x <0) {
      backGround.x = backGround.width / 1;
     }
     dushmanFun();
    
    

    Player.getPlayerInfo();
    //  player.getCarsAtEnd();

    

    if (allPlayers !== undefined) {

      //index of the array
      var index = 0;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;
         if (index === player.index) {
          crafts[index-1].visible=true
        }
        if (keyCode ===DOWN_ARROW && player.index !== null) {
          soundPlay.play();
          crafts[index-1].velocityY = 3
          craft1.addImage(craftD);
          craft2.addImage(craftD);
         

        
        }
      
        if (keyCode ===UP_ARROW && player.index !== null) {
          soundPlay.play();
          crafts[index-1].velocityY = -3
          craft1.addImage(craftD);
          craft2.addImage(craftD);
        

        
      }


  
  
  }
    


    }
   drawSprites();
   if(dushmanGroup.isTouching(craft1)){
    gameState = 2;
    this.end();
    
    
    
  }
  if(dushmanGroup.isTouching(craft2)){
     
    
  }
  }

  end() {
    console.log("game end")
   loose = createSprite(width/2,height/2,width,height)
    loose.addImage(looseImage)
    loose.scale = 1.5
    dushmanGroup.destroyEach();
    dushman.visible  = false;
    endSound.play();
  }



}
