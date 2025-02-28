paddle1 = 10;
paddle2 = 10;

paddle1X = 10;

paddle1Y = '';
paddle2Y = 685;

paddle1Height = 110;
paddle2Height = 70;

score1 = 0;
score2 = 0;


playerscore = 0;
pcscore = 0;

audio1 = '';


//Coordenadas x, y, raio, velocidade em x e velocidade em y
ball = {
    x:350/2,
    y:480/2,
    r:20,
    dx:3,
    dy:3
}

function setup(){
  canvas =  createCanvas(700,550);
    canvas.parent("canvas");
    instializeInSetup(Ping-Pong);
    video=createCapture(VIDEO);
    video.size(400, 200);
    video.parent("game_console");
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose",gotPoses);
}


function draw(){

  background(0); 

  fill("black");
  stroke("black");
  rect(680,0,20,700);

  fill("black");
  stroke("black");
  rect(0,0,20,700);

  //Chamar a função paddleInCanvas() 
  paddleInCanvas();

  //Raquete do jogador
  fill(250,0,0);
  stroke(0,0,250);
  strokeWeight(0.5);
  paddle1Y = mouseY; 
  rect(paddle1X,paddle1Y,paddle1,paddle1Height,100);


  //Raquete do computador
  fill("#FFA500");
  stroke("#FFA500");
  paddle2y =ball.y-paddle2Height/2;  
  rect(paddle2Y,paddle2y,paddle2,paddle2Height,100);

  //Chamar a função midline()
  midline();

  //Chamar a função drawScore() 
  drawScore();

  //Chamar a função models()  
  models();

  //Chamar a função move() (muito importante para o jogo)
  move();
}



//Função reset() para quando a bola não colidir com a raquete
function reset(){
   ball.x = width/2+100,
   ball.y = height/2+100;
   ball.dx=3;
   ball.dy =3;
   
}


//Função midline() para desenhar uma linha no centro do canvas
function midline(){
    for(i=0;i<480;i+=10) {
    y = 0;
    fill("white");
    stroke(0);
    rect(width/2,y+i,10,480);
    }
}


//Funçao drawScore() para mostra o placar
function drawScore(){
    textAlign(CENTER);
    textSize(20);
    fill("red");
    stroke(250,0,0)
    text("Jogador:",100,50)
    text(playerscore,180,50);
    text("Computador:",500,50)
    text(pcscore,595,50)
}


//Função muito importante para o jogo
function move(){
   fill(50,350,0);
   stroke(255,0,0);
   strokeWeight(0.5);
   ellipse(ball.x,ball.y,ball.r,20)
   ball.x = ball.x + ball.dx;
   ball.y = ball.y + ball.dy;
   if(ball.x+ball.r>width-ball.r/2){
       ball.dx=-ball.dx-0.5;       
   }
  if (ball.x-2.5*ball.r/2< 0){
  if (ball.y >= paddle1Y&& ball.y <= paddle1Y + paddle1Height) {
    ball.dx = -ball.dx+0.5;
    playerscore++;
  }
  else{
    pcscore++;
    reset();
    navigator.vibrate(100);
  }
}

if(pcscore ==4){
    fill("#FFA500");
    stroke(0)
    rect(0,0,width,height-1);
    fill("white");
    stroke("white");
    textSize(25)
    text("Game Over!☹☹",width/2,height/2);
    text("Recarregue a página!",width/2,height/2+30)
    noLoop();
    pcscore = 0;
}
   if(ball.y+ball.r > height || ball.y-ball.r <0){
       ball.dy =- ball.dy;
   }   
}


//Largura e altura do canvas e velocidade da bola 
function models(){
    textSize(18);
    fill('red');
    noStroke();
    text("Largura:"+width,195,15);
    text("Velocidade:"+abs(ball.dx),65,15);
    text("Altura:"+height,300,15)
}


//Esta função ajuda a evitar que a raquete saia do canvas
function paddleInCanvas(){
  if(mouseY+paddle1Height > height){
    mouseY=height-paddle1Height;
  }
  if(mouseY < 0){
    mouseY =0;
  }  
}
