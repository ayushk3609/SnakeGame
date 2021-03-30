const canvas = document.getElementById('canvas');
const score_canvas = document.getElementById('score');
const pen2 = score_canvas.getContext('2d');
const pen = canvas.getContext('2d');
pen.fillStyle = 'blue';


const cs = 37;
const w = 700;
const h = 555;
let food = null;
let score = 0;

const snake = {
    init_len : 5,
    direction : 'right',
    cells: [],

    createSnake : function(){
        for(let i = 0; i < this.init_len;i++){
            this.cells.push({
                x:i,
                y:0
            })
        }


    },

    drawSnake : function(){
        for(let cell of this.cells){
            pen.fillRect(cell.x*cs,cell.y*cs,cs-2,cs-2);
        }
    },

    updateSnake : function(){
        const headX = this.cells[this.cells.length -1].x;
        const headY = this.cells[this.cells.length -1].y;
        
        let nextX , nextY;

        if(headX === food.x && headY === food.y){
            food = RandomFood();
            score++;
        }else{
            this.cells.shift();
        }


        if(this.direction == 'up'){
            nextX = headX;
            nextY = headY - 1;

            if(nextY*cs < 0 ){
              
                end();
            }
        }else if(this.direction == 'down'){
            nextX = headX;
            nextY = headY + 1;

            if(nextY*cs >= h){
               
                end();
            }

            
        }else if(this.direction == 'left'){
            nextX = headX - 1;
            nextY = headY;

            if(nextX < 0){
                end();
            }
        }else{
            nextX = headX + 1;
            nextY = headY;

            if(nextX*cs >=w){
                end();
            }
        }

        

        

        this.cells.push({
           x:nextX,
           y:nextY  
        })
    }

}

function end(){
    clearInterval(id);
    pen2.fillText("Game over",50 ,90);
}

//Initialize
function init(){
   snake.createSnake();

   food = RandomFood();
   pen2.fillText(`Score : ${score}`,70,50);

   document.addEventListener('keydown',(e)=>{
            
    if(e.key === 'ArrowUp'){
        snake.direction = 'up';
    }else if(e.key === 'ArrowDown'){
        snake.direction = 'down';
    }else if(e.key === 'ArrowLeft'){
        snake.direction = 'left';
    }else{
        snake.direction ='right';
    }
})
}



//Draw
function draw(){
    pen.clearRect(0,0,w,h);
    pen2.clearRect(0,0,500,250);
    pen2.font = '30px sans-serif';
    pen2.fillText(`Score : ${score}`,70,50);
    pen.fillStyle='green';
    pen.fillRect(food.x*cs,food.y*cs,cs,cs);
    pen.fillStyle='blue';
    snake.drawSnake();
}


//Update

function update(){

    snake.updateSnake();
    

}

function gameloop(){
   
    draw();
    update();
}

function RandomFood(){
    const foodX = Math.floor(Math.random()*(w-cs)/cs);
    const foodY = Math.floor(Math.random()*(h-cs)/cs);

    const food = {
        x:foodX,
        y:foodY
    }

    return food;
}

init();

const id =setInterval(gameloop,150);