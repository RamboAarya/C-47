var spaceShip,spaceShipimg,starryNight,starryNightimg,spaceMarineEnemy,spaceMarineEnemyimg;
var Bullet,Bulletimg,BulletGroup,EnemyGroup,score=0;
var PLAY=1;
var END=0;
var gameState = PLAY;


function preload() {
  spaceShipimg=loadImage("space ship.png")
  starryNightimg=loadImage("starry-night.png")
  spaceMarineEnemyimg=loadImage("SpaceMarine Enemy.png")
  Bulletimg=loadImage("Bullet.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  starryNight=createSprite(width/2,height/2,width,height)
  starryNight.addImage("stars",starryNightimg)
  starryNight.scale=2.2
  spaceShip=createSprite(width/2,height-100,10,10)
  spaceShip.addImage("Ship",spaceShipimg)
  spaceShip.scale=0.3
  BulletGroup=new Group()
  EnemyGroup=new Group()
}

function draw() {
  background(220);
  drawSprites()
  if (gameState===PLAY){
    if(keyDown(UP_ARROW)){
      spaceShip.y=spaceShip.y-4
    }
    if(keyDown(DOWN_ARROW)){
      spaceShip.y=spaceShip.y+4
    }
    if(keyDown(LEFT_ARROW)){
      spaceShip.x=spaceShip.x-4
    }
    if(keyDown(RIGHT_ARROW)){
      spaceShip.x=spaceShip.x+4
    }
    if(keyDown("space")){
      Bullet=createSprite(spaceShip.x,spaceShip.y-85)
      Bullet.addImage("Bullet",Bulletimg)
      Bullet.scale=0.1
      Bullet.velocityY=-5
      Bullet.lifetime=height/5
      BulletGroup.add(Bullet)
    }
    if (BulletGroup.isTouching(EnemyGroup)){
      EnemyGroup.destroyEach()
      BulletGroup.destroyEach()
      score=score+1
    }
    if (EnemyGroup.isTouching(spaceShip)){
    gameState=END
    }
    spawnEnemies()
  }
  else if (gameState===END){
    textSize(50)
    text("Game Over",width/2,height/2)
    EnemyGroup.setVelocityYEach(0)
    spaceShip.velocityY=0
  }








  textSize(20)
  fill("red")
  text(score,width-60,50)

}
   function spawnEnemies(){
     if (frameCount%150===0){
    spaceMarineEnemy=createSprite(random(50,width-50),0,10,10)
    spaceMarineEnemy.addImage("Enemy",spaceMarineEnemyimg)
    spaceMarineEnemy.scale=0.16
    spaceMarineEnemy.velocity.y=2
    spaceMarineEnemy.lifetime=height/2
    EnemyGroup.add(spaceMarineEnemy)
     }
   }