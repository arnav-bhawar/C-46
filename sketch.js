var play = 1;
var end = 0 ;
 var gameState = play;


var sonic,sonic_running;
var ghostGroup , ghost1, ghost2, ghost3;
var enemiesGroup,enemy1,enemy2,enemy3;

var score = 0;

var gameOver, restart ;

function preload(){

    sonic_running = loadAnimation("1.png","2.png","3.png","4.png");

    ghost1 = loadImage("ghost.png");
    ghost2 = loadImage("ghost.png");
    ghost3 = loadImage("ghost.png");    

    enemy1 = loadImage("ufo1.png");
    enemy2  = loadImage("ufo1.png");
    enemy3 = loadImage("bird.png");

    restartImg = loadImage("reset.png");
    gameOverImg = loadImage("tryagain.png");



}

function setup(){
    createCanvas(1200,500);

    ghostGroup = new Group();
    enemiesGroup = new Group();

    sonic = createSprite(50,180,20,50);

    sonic.addImage("running",sonic_running);
    sonic.scale = 0.5;

    ground = createSprite(200,180,400,20);
    ground.x = ground.width/2;
    ground.velocityX = -(6+3*score/100);

    gameOver = createSprite(300,100);
    
    
    gameOver = createSprite(300,100);
    gameOver.addImage("gameOver",gameOverImg);


    restart = createSprite(300,140);
  restart.addImage("restart",restartImg);


    gameOver.scale = 0.5;
    restart.scale = 0.5;

    gameOver.visible = false;
    restart.visible = false;

    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;

    score = 0;
}

function draw(){
    background(0);

    text("Score: ", score,500,50);

    if(gameState === play){
        score = score + Math.round(getFrameRate()/60);
        ground.velocityX = -(6+3*score/100);

        if(keyDown("space") && sonic.y >=160  ){
            sonic.velocityY = -12;
        }

        sonic.velocityY = sonic.velociytY + 0.8;

        if (ground.x < 0){
            ground.x = ground.width/2
        }

      
        spawnEnemies();
        spawnGhosts();

        if(ghostGroup.isTouching(sonic)){
            gameState = end;
        }

        if(enemiesGroup.isTouching(sonic)){
            gameState = end;
        }
    }

        else if (gameState === end){
            gameOver.visible = true;
            restart.visible = true;

            ground.velocityX = 0;
            sonic.velocityY = 0;

            ghostGroup.setVelocityXEach(0);
            ememiesGroup.setVelocityXEach(0);

            ghostGroup.setLifeTimeEach(-1);
            enemiesGroup.setLifeTimeEach(-1);
        }



        if(mousePressedOver(restart)) {
            reset();
          }
      
          sonic.collide(invisibleGround);

            drawSprites();
    
        
    }


        function spawnEnemies(){
            if(frameCount % 60 === 0){
                var enemies = createSprite(600,90,10,40);

                enemies.velocityX = -(6 + 3*score/100);

                var rand = Math.round(random(1,3));
                switch(rand){
                    case 1: enemies.addImage("enemies",enemy1);
                    break;
                case 2: enemies.addImage("enemies",enemy2);
                    break;
                 case 3: enemies.addImage("enemies",enemy3);
                    break;
                
                default: break;
                }

                enemies.scale=0.5,
                enemies.lifetime = 300;

                enemiesGroup.add(enemies);
            }
        }

        function spawnGhosts(){
            if(frameCount % 60 === 0){
                var ghosts = createSprite(600,165,10,40);

                ghosts.velocityX = -(6 + 3*score/100);

                var rand = Math.round(random(1,3));
                switch(rand){
                    case 1: ghosts.addImage("ghosts",ghost1);
                    break;
                case 2: ghosts.addImage("ghosts",ghost2);
                    break;
                 case 3: ghosts.addImage("ghosts",ghost3);
                    break;
                
                default: break;
                }

                ghosts.scale=0.5,
                ghosts.lifetime = 300;

                ghostGroup.add(enemies);
        }

    }

    
function reset(){
    gameState = play;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    
    sonic.changeAnimation("running",sonic_running);
    
    score = 0;
    
  }

