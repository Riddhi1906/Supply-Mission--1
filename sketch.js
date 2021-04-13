//declaration
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground,re,le;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	//loading images
	helicopterIMG=loadImage("helicopter.png")
	helicopter2IMG=loadImage("helicopter2.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
    //creating sprites
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale=0.2;

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale=0.6;

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255);

    re = createSprite(0,310,5,700);
	re.shapeColor=color("grey");

	le = createSprite(798,310,5,700);
	le.shapeColor=color("grey");

	engine = Engine.create();
	world = engine.world;

    packageBody_options={
		restitution : 0.6,
		isStatic:true
	}

	packageBody = Bodies.circle(width/2 , 200 , 5 ,packageBody_options );
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  packageSprite.x= packageBody.position.x ;
  packageSprite.y= packageBody.position.y; 

  packageSprite.x = helicopterSprite.x;

  //move helicopter with the arrow keys  

  if(keyDown(LEFT_ARROW)){
	helicopterSprite.addImage(helicopter2IMG);
	 helicopterSprite.x = helicopterSprite.x - 4;
   }

  if(keyDown(RIGHT_ARROW)){
	helicopterSprite.addImage(helicopterIMG);
	 helicopterSprite.x = helicopterSprite.x + 4;
  }

  helicopterSprite.collide(re);
  helicopterSprite.collide(le);

  textSize(20);
  fill("white");
  text("Left and Right Arrow for moving",485,30);
  text("Down Arrow to drop the package",480,60);

  drawSprites();
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
	Matter.Body.setStatic(packageBody,false);
    
  }
}