var PLAY = 1;
var END = 0;
var gameState = PLAY;
var cloud,trex, trex_running, test,trex_collided,ground, invisibleGround, groundImage,cloud, cloudsGroup, cloudImage,obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
function preload(){
    trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
    trex_collided = loadAnimation("trex_collided.png");
    groundImage = loadImage("ground2.png");
    cloudImage = loadImage("cloud.png");
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
}
function setup() {
    createCanvas(600, 200);
    trex = createSprite(50,180,20,50);
    trex.setCollider("rectangle",0,0,50,50)
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided" , trex_collided);
    trex.scale = 0.5;
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;
    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;
    obstaclesGroup = new Group();
    CloudsGroup = new Group();
    score = 0;
}
function draw() {
    background("yellow");
    textSize(20)
    fill("black")
    score = score + 1;  
    var final_score = score - 1;
    text("Score: "+ score, 400,50);
    if(gameState === PLAY)
    {
    ground.velocityX = -4
    if(keyDown("space") && trex.collide(invisibleGround)){
        trex.velocityY = -13;
    }
    trex.velocityY = trex.velocityY + 0.8;
    if (ground.x < 0){
        ground.x = ground.width/2;
    }
    trex.visible = true;
    spawnClouds();
    spawnObstacles();
    }
    if (trex.isTouching(obstaclesGroup))
        {
        gameState = END;
        }
    if(gameState === END){
        trex.visible = true;
        fill("red")
        textSize(40)
        text("GAME OVER!!",130,40)
        fill("darkblue");
        textSize(30)
        text("Press S to restart!",20,100)
        if (keyDown("S")){
            score = 0;
            final_score = 0
            gameState =PLAY
        }
        score = final_score;
        ground.velocityX = 0;}
    trex.collide(invisibleGround); 
    drawSprites();
}

function spawnObstacles(){
    if (frameCount % 60 === 0){
        var obstacle = createSprite(400,165,10,40);
        obstacle.velocityX = -6;
        var rand = Math.round(random(1,6));
        switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        case 4: obstacle.addImage(obstacle4);
                break;
        case 5: obstacle.addImage(obstacle5);
                break;
        case 6: obstacle.addImage(obstacle6);
                break;
        default: break;
        }        
        obstacle.scale = 0.5;
        obstacle.lifetime = 300;
        obstaclesGroup.add(obstacle);
    }
}
function spawnClouds() {
    if (frameCount % 60 === 0) {
        cloud = createSprite(600,100,40,10);
        cloud.y = Math.round(random(10,60));
        cloud.addImage(cloudImage);
        cloud.scale = 0.5;
        cloud.velocityX = -3;
        cloud.lifetime = 134;
        cloud.depth = trex.depth;
        trex.depth = trex.depth + 1;
        CloudsGroup.add(cloud);
    }
}
