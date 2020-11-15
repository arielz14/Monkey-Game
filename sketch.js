var monkey, bananagrp, bg, invground, obs, stonegrp, monkeycol, speed;

var monkeyimg, bananaimg, bgimg, obsimg, collided;

var score, gamestate, PLAY, END, INITIAL, col;

function preload() {

  monkeyimg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bgimg = loadImage("jungle.jpg");

  bananaimg = loadImage("banana.png");

  obsimg = loadImage("stone.png");
  
  collided = loadImage("Monkey_05.png");

}

function setup() {
  createCanvas(600, 400);

  bg = createSprite(200, 150);
  bg.addImage("bgimg", bgimg);
  bg.scale =1.2

  invground = createSprite(width / 2, 390, width, 10);
  invground.visible = false;

  
  monkey = createSprite(80, 340);
  monkey.addAnimation("collided",collided);
  monkey.addAnimation("monkeyimg", monkeyimg);
  
  monkey.scale = 0.13;

  score = 0;

  gamestate = 1;
  PLAY = 1;
  END = 0;

  bananagrp = createGroup();
  stonegrp = createGroup();

  speed = -8;

  col = 0;
}

function draw() {
  background(220);


  if (gamestate === PLAY) {
    
    monkey.changeAnimation("monkeyimg");

    bg.velocityX = -5;

    if (bg.x < 0) {
      bg.x = bg.width / 2;
    }

    if (keyWentDown("space") && monkey.collide(invground)) {
      monkey.velocityY = -20;
    }

    monkey.velocityY = monkey.velocityY + 1;

    bananas();
    obstacles();

    score = score + Math.round((getFrameRate() / 30));

  }

  monkey.collide(invground);

  if (gamestate === END) {
    bg.velocityX = 0;

    stonegrp.setVelocityXEach(0);
    stonegrp.setLifetimeEach(-1);

    bananagrp.setVelocityXEach(0);
    bananagrp.setLifetimeEach(-1);

    monkey.velocityY = 0;
    
    monkey.changeAnimation("collided",collided);

  }

  if (keyWentDown("r") && gamestate === END) {
    stonegrp.destroyEach();
    bananagrp.destroyEach();
    score = 0;
    gamestate = PLAY;
    speed = -6;
    monkey.scale = 0.13;
    col = 0;
  }

  if (monkey.isTouching(bananagrp)) {
    bananagrp.destroyEach();
    speed = speed - 0.5;
    monkey.scale = monkey.scale + 0.02;
    score = score + 20;
    col = 0;

  }

  if (score % 100 === 0) {
    monkey.scale = monkey.scale + 0.01;
  }

  if (col === 2) {
    gamestate = END;
  }

  if (stonegrp.isTouching(monkey)) {
    stonegrp.destroyEach();
    monkey.scale = 0.13;
    score = score - 100;
    col += 1;
  }

  drawSprites();

  if (gamestate === END) {

    fill(250);
    textSize(22);
    stroke(0);
    strokeWeight(2);
    text("Game Over!", width / 2 - width / 10, height / 2);
    text("Press R to Restart", width / 2 - width / 6.7, height / 2 + 30);
  }

  fill("Black");
  textSize(22);
  stroke("white");
  strokeWeight(2);
  text("Score: " + score, 40, height / 8);
}