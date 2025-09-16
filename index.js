
let countryList = {}
let countryArray=[];
let correctAnswer = "";
let keyIndex=0;
let correctAns="";

let score=0;
let highscore=0;

function updateScore(){
    document.getElementById("score").textContent="Score: "+score;
     document.getElementById("highscore").textContent="High Score: "+highscore;

}



async function init(gametype){
    countryList=await getData();
    countryArray = Object.keys(countryList);
    showGame(gametype);
}

function randomizeNumber(minimumVal, maximumVal){
    return Math.floor(Math.random() * (maximumVal-minimumVal) + minimumVal);
}


async function getData(){
    try{
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,capital,flags');
    const countries = await response.json();
    const countryLib={}
    for (const country of countries){
       
        
            const name = country.name.common
            const cca2 = country.cca2
            const capital = country.capital?.[0] || null;
            const outlineurl =`https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${cca2.toLowerCase()}/1024.png`;
            const flag=country.flags.svg;
            
        if (capital && outlineurl && flag && cca2){
            countryLib[name]={
                cca2: cca2,
                capital: capital,
                outline: outlineurl,
                flag: flag
             
            }
        }
            
    }
    return countryLib;
 }
 catch{
    console.log("ERROR FINDING DATA")
 }
}


function showGame(name){ //show the country
 
    
    if (name==="outlines"){
        document.getElementById("country-outline").style.filter = "brightness(0) invert(1)";
        correctAnswer=randomizeCountry(countryArray);
        
         //choose the answer
        document.getElementById("outline-game").class="game-active";
        document.getElementById("flag-game").class="game-hidden";
        document.getElementById("capital-game").class="game-hidden";

        document.getElementById("country-outline").src=countryList[correctAnswer].outline;
        document.getElementById("country-name").textContent="";
        document.getElementById("input").placeholder="Enter country name...";
        gametype="outlines";
         
    }
    else if (name==="flags"){
        document.getElementById("country-outline").style.filter = "";
        correctAnswer=randomizeCountry(countryArray);

        document.getElementById("flag-game").class="game-active";
        document.getElementById("outline-game").class="game-hidden";
        document.getElementById("capital-game").class="game-hidden";

        document.getElementById("country-outline").src=countryList[correctAnswer].flag;
        document.getElementById("country-name").textContent="";
        document.getElementById("input").placeholder="Enter country name...";
        gametype="flags";
    }
    else if (name==="capitals"){
        document.getElementById("country-outline").style.filter = "brightness(0) invert(1)";

        //choose the answer
        correctCountry=randomizeCountry(countryArray);
        correctAnswer=countryList[correctCountry].capital;

        

        document.getElementById("capital-game").class="game-active";
        document.getElementById("outline-game").class="game-hidden";
        document.getElementById("flag-game").class="game-hidden";

        document.getElementById("country-outline").src=countryList[correctCountry].outline;
        document.getElementById("country-name").textContent=correctCountry;
        document.getElementById("input").placeholder="Enter capital name..."
        gametype="capitals";

    }


    }
   

function checkGuess(){ //check the guess
    
    const userGuess=document.getElementById("input").value.trim();

    if (userGuess.toLowerCase() === correctAnswer.toLowerCase()){
        document.querySelector(".feedback").innerHTML = "Correct";
        document.querySelector(".feedback").style.color = "green";
        score+=1;
        if (score>highscore){
            highscore=score;
        }

        updateScore();
        init(gametype);
    }
    else {
        document.querySelector(".feedback").innerHTML = "Try Again";
        document.querySelector(".feedback").style.color = "red";
    }
    document.getElementById("input").value = "";
   
}

function giveup(){
    document.querySelector(".feedback").textContent="The correct answer was "+correctAnswer;
    document.querySelector(".feedback").style.color = "red"
    score=0;
    updateScore();
    init(gametype);
}


function randomizeCountry(countryArray){

let keyIndex=randomizeNumber(0, countryArray.length);
let correctAnswer = countryArray[keyIndex];
 return correctAnswer;
}


init('outlines');

document.getElementById("input").addEventListener("keydown", function(event){
 if (event.key==="Enter"){
    event.preventDefault();
    checkGuess();
 }
});