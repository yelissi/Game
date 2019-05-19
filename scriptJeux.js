var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// charger les images

var sousMarin = new Image();
var arrierePlan = new Image();
var piedDePlan = new Image();
var bombeHaut = new Image();
var bombeBas = new Image();

sousMarin.src = "images/sousMarin.png";
arrierePlan.src = "images/backgroundTop.png";
piedDePlan.src = "images/bkbottom.png";
bombeHaut.src = "images/bombe2.png";
bombeBas.src = "images/bombe.png";


// mes variables

var ecart = 140;
var constante;

var bX = 10;
var bY = 150;

var gravite = 1.5;

var score = 0;

// mes fichiers audio 

var sonScore = new Audio();

sonScore.src = "son/bulle.mp3";

// on appuyant sur une touche du clavier je fais monter mon soumarin

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 30;
    
}

// enregistrer les coordonées des bombes

var bombes = [];

bombes[0] = {
    x : cvs.width,
    y : 0
};

// déssiner les images

(function draw(){
    
    ctx.drawImage(arrierePlan,0,0);
    
    
    for(var i = 0; i < bombes.length; i++){
        
        constante = bombeHaut.height+ecart;
        ctx.drawImage(bombeHaut,bombes[i].x,bombes[i].y);
        ctx.drawImage(bombeBas,bombes[i].x,bombes[i].y+constante);
             
        bombes[i].x--;
        
        if( bombes[i].x == 125 ){
            bombes.push({
                x : cvs.width,
                y : Math.floor(Math.random()*bombeHaut.height)-bombeHaut.height
            }); 
        }

        // détection des collisions
        
        if( bX + sousMarin.width >= bombes[i].x && bX <= bombes[i].x + bombeHaut.width && (bY <= bombes[i].y + bombeHaut.height || bY+sousMarin.height >= bombes[i].y+constante) || bY + sousMarin.height >=  cvs.height - piedDePlan.height){
            location.reload(); // recharger  la page
        }
        
        if(bombes[i].x == 0){
            score++;
            sonScore.play();
        }
        
        
    }

    ctx.drawImage(piedDePlan,0,cvs.height - piedDePlan.height);
    
    ctx.drawImage(sousMarin,bX,bY);
    
    bY += gravite;
    
    ctx.fillStyle = "#1f22d1";
    ctx.font = "30px Verdana";
    ctx.fillText("Score : "+score,30,30);
    
    requestAnimationFrame(draw);
    // affichache du cv
    var ident = ['id1','id2','id3','id4','id5','id6','id7','id8','id9','id10','id11','id12','id13','id14','id15','id16','id17','id18','id19','id20'];
    for(var i = 0; i<ident.length;i++)
    switch(score){
        case i:
        document.getElementById(ident[i]).style.display = 'block';
        break;  
    }
   
})();




