/*
Logic :-
1. Highlight a random color
2. See which color user pressed
3. Store a pattern of correct colors
4. Another variable where the user is resets everytime user completes on level
5. Match every user input with with pattern
*/

// Defining global variables
var pattern = [];
var level = 0;
var userPattern = [];

// Adding Event Listeners
$(".play").on("click",function(){
    playAudio("start")
    changeText();
    startGameLoop();
})

$(".box").on("click",function(){
    let pressedColor = $(this).attr("class").split(/\s+/);
    pressedColor = pressedColor[1];
    animate(pressedColor);
    playAudio(pressedColor)
    userPattern.push(pressedColor);
    matchColor();
})


function startGameLoop(){
    highlightColor();
    $(".play",function(){
        $(this).text = "Restart";
    })
}

function highlightColor(){
    /**
     * This funciton will select a random color and add it to pattern
     */

    let colors = ["red","blue","green","yellow"];
    let randomNumber = Math.floor(Math.random() * 4);
    let color = colors[randomNumber];
    
    pattern.push(color);

    highlight(color);
}

function matchColor(){
    /**
     * This function will take a look at global variable and figure out if the user pressed color is equal to expected color
     */
    for(let  i = 0; i < userPattern.length;i++){
        if(userPattern[i] == pattern[i]){
        }else{
            gameOver();
            userPattern = []
            pattern = []
            return;
        }
    }
    if(userPattern.length == pattern.length){
        level++;
        userPattern = [];
        setTimeout(highlightColor,500);
        $("h1").html("<span class=\"redText\">Level</span>: " + "<span class=\"greenText\">" + level + "</span>");
        return;
    }
}

function highlight(color){
    /**
     * This funciton blinks the given color
     */

    $("." + color).addClass("blink");
    setTimeout(function(){
        $("." + color).removeClass("blink");
    },500);

}

function gameOver(){
    let audio = new Audio("./Sound/gameOver.mp3");
    audio.play();
    $("body").addClass("gameOver");
    setTimeout(function(){
        $("body").removeClass("gameOver");
    },500);
    $("h1").html('<span class="redText">The </span> <span class="blueText">Sim</span><span class="greenText">on </span> <span class="yellowText">Game</span>');
    $(".play").text("Start Playing Again!!")
    level= 0; 
}

function animate(className){
    console.log(className);
    $("."+className).addClass("pressed");
    setTimeout(function(){
        $("."+className).removeClass("pressed");
    },200);
    
}

function changeText(){
    $(".play").text("Restart!")
}

function playAudio(color){
    let audio = new Audio("./Sound/" + color + ".mp3");
    audio.play();
    setTimeout(function(){
        audio.pause();
    },1000)
}