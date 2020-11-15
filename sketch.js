var character,ground;
var score=0;
var bullets;
var backgroundImg;
var coins;
var bombs;
var PLAY = 1;
var END = 0;
var gameState = PLAY;




function preload(){
  backgroundImg=loadImage("images/background.jpg");
  characterImg=loadImage("images/character.png");
  bulletImg=loadImage("images/bullet.png");
  coinsImg=loadImage("images/coins.png");
  coins2Img=loadImage("images/coins2.webp");
  bombsImg=loadImage("images/bomb.png");
 dieSounds = loadSound("die.mp3");
   }

function setup() {
  createCanvas(800,400);

  character = createSprite(700,350,20,50);
  character.addImage("characterImg",characterImg);
  character.scale = 0.2;
  
 coins1Group = new Group();
  coins2Group = new Group();
  bulletsGroup = new Group();
  bombsGroup = new Group();
}
 
function draw() {
  background(backgroundImg);
    fill("black");
    textStyle(BOLD);
    text("SCORE:"+score,10,20);
    textSize(45);
    
  if (gameState===PLAY){
    character.x = World.mouseX;
    
    
    spawnCoins();
    spawnBombs();
    spawnCoins2();
    spawnBullets(); 

    for(var i=0;i<coins1Group.maxDepth();i++){
      if (coins1Group.get(i)!==null && bulletsGroup.isTouching(coins1Group)){
        coins1Group.get(i).destroy();
        bulletsGroup.get(i).destroy();
        score+=5;
      }
    }
    
    for(var i=0;i<coins2Group.maxDepth();i++){
      if (coins2Group.get(i)!==null && bulletsGroup.isTouching(coins2Group)){
        coins2Group.get(i).destroy();
        bulletsGroup.get(i).destroy();
        score+=10;
      }
    }
    for(var i=0;i<bombsGroup.maxDepth();i++){
      if (bombsGroup.get(i)!==null && bulletsGroup.isTouching(bombsGroup)){
        bombsGroup.get(i).destroy();
       bulletsGroup.get(i).destroy();
       score-=10;

       fill("black");
        textStyle(BOLD);
         textSize(45);
         text("GAME OVER",200,200);

      }
   }
   
    if(bulletsGroup.isTouching(bombsGroup)){
      dieSounds.play();
        fill("black");
       textStyle(BOLD);
         textSize(45);
         text("GAME OVER",200,200);
  
      gameState = END;
      
        
 }
    
 
     else if (gameState === END){
    for(var i=0;i<bombsGroup.maxDepth();i++){
      if (bombsGroup.get(i)!==null && bulletsGroup.isTouching(bombsGroup)){
    

        fill("black");
        textStyle(BOLD);
         textSize(45);
         text("GAME OVER",200,200);

      }
    }
    
  }

  }

  drawSprites();
}


 

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var coins1 = createSprite(790,120,40,10);
    coins1.y = Math.round(random(80,200));
    coins1.addImage(coinsImg);
    coins1.scale = 0.1;
    coins1.velocityX = -4;
    
     //assign lifetime to the variable
    coins1.lifetime = 200;
    
    //add each cloud to the group
    coins1Group.add(coins1);
  }
}

function spawnCoins2() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var coins2 = createSprite(0,630,40,10);
    coins2.y = Math.round(random(50,300));
    coins2.addImage(coins2Img);
    coins2.scale = 0.2;
    coins2.velocityX = 2;
    
     //assign lifetime to the variable
    coins2.lifetime = 300;
    
    //add each cloud to the group
    coins2Group.add(coins2);
  }
}


function spawnBullets() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var bullets = createSprite(50,30,40,10);
    bullets.y = Math.round(random(80,120));
    bullets.addImage(bulletImg);
    bullets.scale =0.04;
    bullets.velocityY = -11;
    bullets.y=character.y;
    bullets.x=character.x;
 
     //assign lifetime to the variable
     bullets.lifetime = 250;

    bulletsGroup.add(bullets);
  } 
}

function spawnBombs() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var bombs = createSprite(800,120,40,10);
    bombs.y = Math.round(random(80,300));
    bombs.addImage(bombsImg);
    bombs.scale =0.1;
    bombs.velocityX = -3;
    
     //assign lifetime to the variable
     bombs.lifetime = 300;

    bombsGroup.add(bombs);
  }
  
}
