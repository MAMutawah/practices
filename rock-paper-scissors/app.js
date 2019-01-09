var userScore = 0;
var computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
const smallUserWord = "User".fontsize(3).sub();
const smallCompWord = "Comp".fontsize(3).sub();


function getComputerChoice(){
    const choice = ['r', 'p', 's'];
    const randomChoice = Math.floor(Math.random()*choice.length);
    return (choice[randomChoice]);
}

function updateScore(){
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
}
function fullName(shortcut){
    if(shortcut=='r'){
        return "Rock"
    }
    else if(shortcut=='p'){
        return "Paper"
    }
    else if(shortcut=='s'){
        return "Scissors"
    }
    else{
        return null;
    }


}
function glowing(userChoice, choiceClass){
    document.getElementById(userChoice).classList.add(choiceClass);
    setTimeout(() => {
        document.getElementById(userChoice).classList.remove(choiceClass);
    }, 300);
}
function win(userChoice,computerChoise){
    userScore++;
    updateScore();
    result_p.innerHTML = `${fullName(userChoice)}${smallUserWord} beats ${fullName(computerChoise)}${smallCompWord}. You win! 🔥`;
    glowing(userChoice,'green-glow');
}

function lose(userChoice,computerChoise){
    computerScore++;
    updateScore();
    result_p.innerHTML = `${fullName(userChoice)}${smallUserWord} loses to ${fullName(computerChoise)}${smallCompWord}. You lose! 💩`;
    //result_p.innerHTML = `${fullName(computerChoise)}${smallCompWord} beats ${fullName(userChoice)}${smallUserWord}. 😿`;
    glowing(userChoice,'red-glow');
}

function draw(userChoice,computerChoise){
    result_p.innerHTML = "Its a draw! 🤪";
    glowing(userChoice,'gray-glow');
}


function game(userChoice){
    const computerChoise = getComputerChoice()

    //console.log(userChoice + ' ' + computerChoise);
    switch(userChoice+computerChoise){
        case "rs":
        case "pr":
        case "sp":
            win(userChoice,computerChoise);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice,computerChoise);
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice,computerChoise);
            break;
    }
}

function main(){
    rock_div.addEventListener('click', () =>{
        game('r');
    });
    paper_div.addEventListener('click', () =>{
        game('p');
    });
    scissors_div.addEventListener('click', () =>{
        game('s');
    });
    
}

main();
