var canvas = document.querySelector('canvas');
//console.log(canvas);

var container = window;

canvas.width = container.innerWidth;
canvas.height = container.innerHeight;
var c = canvas.getContext('2d');

//c.fillRect(100,100,100,100);
var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 40;
//var minRadius = 4;

var colorArray = [
    '#2C3E50',
    '#E74C3C',
    '#ECF8F1',
    '#3498DB',
    '#2980B9' ];

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  //console.log(mouse);

})

window.addEventListener('resize', function(){
    canvas.width = container.innerWidth;
    canvas.height = container.innerHeight;

    init();
});

function Circle(x,y,dx,dy,radius){
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.originalRadius = radius;
    this.color = colorArray[ Math.floor(Math.random() * colorArray.length) ];

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
        //c.strokeStyle = 'blue';
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(){
        if (this.x + this.radius > innerWidth 
            || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > innerHeight 
            || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x +=this.dx;
        this.y +=this.dy;

        // interaction
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50 ) {
            if(this.radius < maxRadius){
                this.radius +=1;
            }
        }
        else if ( this.radius  > this.originalRadius){
            this.radius -=1;
        }

        this.draw();
    }
}


var circleArray = [];



function init(){
    circleArray = [];
    for (var i =0; i< 500; i++){
    
        var radius = Math.random() * 10 + 1;
    
        var x = Math.random() * (innerWidth - 2 *radius) + radius;
        var y = Math.random() * (innerHeight - 2 *radius) + radius;
        var dx = (Math.random() - 0.5) * 5;
        var dy = (Math.random() - 0.5) * 5;
    
        circleArray.push(new Circle(x,y,dx,dy,radius))
    
    }
}
function animate(){

    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);


    for (var i =0;i<circleArray.length;i++){
        circleArray[i].update();
    }

    //timer();



}
function timer(){
    currentTime = new Date();
    current = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
    c.beginPath();
    c.fillStyle = 'red';
    var midWid = container.innerWidth/2;
    var midHit = container.innerHeight/2;


    c.fillRect(midWid - 75 , midHit - 50, 150,100);
    c.fillStyle = 'black';
    c.font = "20px Georgia";
    c.fillText(current,midWid + 50 - 75 ,midHit)
}


init();
animate();