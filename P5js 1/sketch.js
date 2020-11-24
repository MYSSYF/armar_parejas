
let l;
let cebollat;
var img;





function setup() {
  createCanvas(600, 800);

cebollat = false;
l=100;

}

function preload(){
  img=loadImage("C.jpg");
}



function draw() { 
background(100);
rectMode(CENTER);


fill(0);
rect(100,100,100,50)
rect(300,750,500,100)


for (var i = 0; i < 4; i ++) {
  for (var j = 0; j < 4; j ++) {

    fill(0);
    rectMode(CENTER);
    imageMode(CENTER);
    rect(100+(i*133),200+(j* 133),l,l);


  
    if((i==2 && j==1 || i==0 && j==1)&&cebollat==true){
    image(img,100+(i*133),200+(j* 133),l,l);
  }
}
}
print(mouseX+","+mouseY);

}

function mouseClicked() {
  if(dist(mouseX,mouseY,100,200)<50){
    
    cebollat=true;
  }


}