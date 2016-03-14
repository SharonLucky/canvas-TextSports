var WINDOW_WIDTH = 900;
var WINDOW_HEIGHT = 600;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 120;
var switchy=false;
var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    document.addEventListener("mousemove",mousemove,false);
    render( context );
    sporting(context);
}
function sporting(context){
        setInterval(function(){
            console.log(12);
            renderBall( context );
            updateBalls();
        },90);
}
function render( cxt ) {
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    for(var i=0;i<digit.length;i++){
        renderHello(MARGIN_LEFT + 16 * (RADIUS + 1)*i, MARGIN_TOP, i, cxt);
        addBalls(MARGIN_LEFT + 16 * (RADIUS + 1)*i, MARGIN_TOP, i);
    }
}
function renderHello( x , y , num , cxt ){
    cxt.fillStyle = "rgb(0,102,194)";
    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
                cxt.closePath();
                cxt.fill();
            }
}
function addBalls(x,y,num){
    console.log(33);
    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }
                balls.push( aBall );
            }
}
function renderBall(cxt){
    if(switchy){
        cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        for( var i = 0 ; i < balls.length ; i ++ ){
            cxt.fillStyle=balls[i].color;
            cxt.beginPath();
            cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
            cxt.closePath();
            cxt.fill();
        }
    }
}

function updateBalls(){
    if(switchy){
        for( var i = 0 ; i < balls.length ; i ++ ){
            balls[i].x += balls[i].vx;
            balls[i].y += balls[i].vy;
            balls[i].vy += balls[i].g;

            if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
                balls[i].y = WINDOW_HEIGHT-RADIUS;
                balls[i].vy = - balls[i].vy*0.75;
            }
        }

        var cnt = 0;
        for( var i = 0 ; i < balls.length ; i ++ )
            if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH )
                balls[cnt++] = balls[i];
        while( balls.length > cnt ){
            balls.pop();
        }
    }
}

function mousemove(e){
    //鼠标发生移动
    if(e.offsetX||e.layerX){
        var px=e.offsetx==undefined?e.layerX:e.offsetx;
        var py=e.offsety==undefined?e.layerY:e.offsety;

        if(px>100&&px<900&&py>50&&py<550){
            switchy=true;
            //console.log("true");
        }else{
            switchy=false;
           // console.log("false");
        }
    }
}
