const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const typingInput = document.querySelector(".typing-input");
const wrongletter = document.querySelector(".wrong-letter span");
const guessleft = document.querySelector(".guess-left span");


let word , corrects = [] , incorrects = [] , maxGuesses;
function randomWord(){
    //getting random object from wordlist
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word; //getting word of random object
    let hintvalue = ranObj.hint;
    maxGuesses = 8;
    corrects = []; 
    incorrects = [];
    // console.log(word,hintvalue);

    hint.innerText = hintvalue;
    guessleft.innerHTML = maxGuesses;
    wrongletter.innerText = incorrects;

    let html = "";
    for(let i = 0; i < word.length; i++){
        html += `<input type="text" disabled>`;
        
    }
    
    inputs.innerHTML = html;
   
}

randomWord();

function initGame(e){
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key} `) && !corrects.includes(key)){
        if(word.includes(key)){
            //if user letter found in the word
            // console.log("letter found");
            for(i = 0; i < word.length; i++){
                //showing matched letter in the input value
                if(word[i] === key){
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        }else{
            // console.log("letter not found")
            maxGuesses--; //decrement maxGuesses by 1
            incorrects.push(` ${key} `);
        }
        guessleft.innerText = maxGuesses;
        wrongletter.innerText = incorrects;
    }


    typingInput.value = "";

   setTimeout(()=>{
    if(corrects.length === word.length){
        alert(`Congrats! You found thd word ${word.toUpperCase()}`);
        randomWord(); 
    }else if(maxGuesses < 1){
        //if user couldn't found all letters 
        alert("Game over! You don't have remaining guesses");

        for(let i = 0; i < word.length; i++){
            //showing matched letter in the input value 
            inputs.querySelectorAll("input")[i].value = word[i];
        }
    }

   });
}

resetBtn.addEventListener("click",randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click",() => typingInput.focus());
document.addEventListener("keydown",() => typingInput.focus());