var op, pantalla;
var primerCarta = true;
var cartaPrimera, cartaSegunda;
var colorDelante="red";
var colorAtras="black";
var colorpantalla="gray";
var inicioX=30;
var inicioY=30;
var cartaMargen=30;
var cartaLon=30;
var cartaAncho=cartaLon*4;
var cartaAlto=cartaLon*4;
var cartas_array=new Array();
var iguales=false;
var cartas=0;

var imagenes=new Array(8);
function cargarImagenes(){

}

window.onload = cargarImagenes;

function cargarImagenes(){
    imagenes[cartas] = new Image();
    imagenes[cartas].src = "images/"+cartas+".jpg";
    cartas++;
    if(cartas<8){
        imagenes[cartas-1].onload = cargarImagenes;
    }else{
        imagenes[cartas-1].onload = iniciar;
    }
}

function iniciar(){
    cartas=0;
    pantalla=document.getElementById("mipantalla");
    pantalla.width=630;
    pantalla.height=700;
    if(pantalla && pantalla.getContext){
        op = pantalla.getContext("2d");
        if(op){
            pantalla.removeEventListener("click",iniciar,false);
            pantalla.addEventListener("click",selecciona,false);
            tablero();
            barajar();
            aciertos();

    }
}

function tablero(){
    var i, j;
    var carta;
    var x=inicioX;
    var y=inicioY;
    for(i=0; i<4; i++){
        for(j=0; j<4; j++){
            carta=new Carta(x,y,cartaAncho,cartaAlto,i);
            cartas_array.push(carta);
            carta.dibuja();
            
            y +=inicioY+cartaAlto;
        }
        y = inicioY;
        x+=cartaAncho+cartaMargen;
    }
}

function Carta(x,y,ancho,largo,info){
    this.x=x;
    this.y=y;
    this.ancho=ancho;
    this.largo=largo;
    this.info=info;
    this.dibuja=dibujaCarta;
}
function dibujaCarta(){
    op.fillStyle=colorAtras;
    op.fillRect(this.x,this.y,this.ancho,this.largo);
}


function barajar(){
    var i,j;
    var aTemp1= new Array();
    var aTemp2= new Array();
    var lon=cartas_array.length/2;
    for(i=0; i<lon;i++){
        do{
            j=Math.floor(Math.random()*lon);
        }while(aTemp1.indexOf(j)!=-1)
        aTemp1.push(j);
        do{
            j=Math.floor(Math.random()*lon);
        }while(aTemp2.indexOf(j)!=-1)
        aTemp2.push(j);	
    }
    aTemp1 = aTemp2.concat(aTemp1);
    for(i=0; i<lon*2; i++){
        cartas_array[i].info=aTemp1[i];
    }
}

function ajusta(xx,yy){
    var pospantalla = pantalla.getBoundingClientRect();
    var x = xx-pospantalla.left;
    var y = yy-pospantalla.top;
    return {x:x,y:y}
}
function selecciona(e){
    var pos=ajusta(e.clientX,e.clientY);
    //alert(pos.x+','+pos.y);
    
    for(var i=0; i<cartas_array.length; i++){
        var carta = cartas_array[i];
        if(carta.x>0){
            if( (pos.x>carta.x) && (pos.x<carta.x+carta.ancho) && (pos.y>carta.y) && (pos.y<carta.y+carta.largo)){
                if((primerCarta) || (i!=cartaPrimera)) {
                    break;
                }
            }
        }
    }
    if(i<cartas_array.length){
        if(primerCarta){
            cartaPrimera=i;
            primerCarta=false;
            pinta(carta);
        }else{
            pantalla.removeEventListener("click",selecciona,false);
            cartaSegunda=i;
            pinta(carta);
            primerCarta=true;
            if(cartas_array[cartaPrimera].info==cartas_array[cartaSegunda].info){
                iguales=true;
                cartas++;
                aciertos();
            }else{
                iguales=false;
            }
            setTimeout(volteaCarta,1000);
        }
    }
}
function pinta(carta){
    op.fillStyle = colorDelante;
    op.fillRect(carta.x,carta.y,carta.ancho,carta.largo);
    
    op.font="bold 40px comic";
    op.fillStyle = "black";
    //op.fillText(String(carta.info), carta.x+carta.ancho/2-10, carta.y+carta.largo/2+10);
    op.drawImage(imagenes[carta.info],carta.x,carta.y,carta.ancho,carta.largo);
}
function volteaCarta(){
    if(!iguales){
        cartas_array[cartaPrimera].dibuja();
        cartas_array[cartaSegunda].dibuja();
    }else{
        op.clearRect(	cartas_array[cartaPrimera].x,
                        cartas_array[cartaPrimera].y,
                        cartas_array[cartaPrimera].ancho,
                        cartas_array[cartaPrimera].largo);
        
        op.clearRect(	cartas_array[cartaSegunda].x,
                        cartas_array[cartaSegunda].y,
                        cartas_array[cartaSegunda].ancho,
                        cartas_array[cartaSegunda].largo);
        
        cartas_array[cartaPrimera].x = -1;
        cartas_array[cartaSegunda].x = -1;
    }
    if(cartas<8){
        pantalla.addEventListener("click",selecciona,false);
    }else{
        cartas=0;
        cartas_array=[];
        pantalla.addEventListener("click",iniciar,false);
        op.fillStyle="white";
        op.fillText("JUEGO TERMINADO",120,pantalla.height/2);
    }
}

function aciertos(){
    op.save();
    op.clearRect(0,620,pantalla.width,pantalla.height);
    op.fillStyle="gray"
    op.fillRect(0,620,pantalla.width,pantalla.height);
    op.font = "bold 40px comic";
    op.fillStyle="black";
    op.fillText("Aciertos: "+String(cartas),pantalla.width-220,660);
    op.restore();
}
}