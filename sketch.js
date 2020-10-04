var PLAY =1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground,invisibleground;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  obstacleGroup = new Group();
  bananaGroup = new Group();
 console.log(ground.x)
  
  
  

  
}


function draw() {
  background(180);
  
  
  
  
  
  food();
  obstacles();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  
   if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  
  if (gameState===PLAY){
    survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime,100,50);
    
    if(keyDown("space")&& monkey.y >= 100){
  monkey.velocityY = -12;
}
  monkey.velocityY = monkey.velocityY+ 0.8
  
  ground.velocityX=-4;
  
  if (ground.x < 0){
 ground.x=ground.width/2;
}
    monkey.collide(ground);
  
  }
  else if (gameState === END) {
    monkey.setvelocityX = 0;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
}

function food(){
  if(frameCount % 80 === 0){
     var banana=createSprite(600,120,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1
    banana.velocityX=-3;
    
    banana.Lifetime=200;
    bananaGroup.add(banana);
}
}

function obstacles(){
 if(frameCount % 300 === 0){
var obstacle = createSprite(600,330,10,40);
    
   obstacle.velocityX = -3;
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstaceImage);
              break;
      case 2: obstacle.addImage(obstaceImage);
              break;
      case 3: obstacle.addImage(obstaceImage);
              break;
      case 4: obstacle.addImage(obstaceImage);
              break;
      case 5: obstacle.addImage(obstaceImage);
              break;
      case 6: obstacle.addImage(obstaceImage);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   obstacleGroup.add(obstacle);
   
    obstacle.depth = monkey.depth;
    obstacle.depth = obstacle.depth + 1;
   
   
   }
}




