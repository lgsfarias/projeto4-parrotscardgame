const cards = [ 'unicornparrot','unicornparrot','tripletsparrot','tripletsparrot','revertitparrot','revertitparrot','metalparrot','metalparrot', 'fiestaparrot', 'fiestaparrot', 'explodyparrot','explodyparrot', 'bobrossparrot', 'bobrossparrot']

let firstCard
let secondCard
let counter // number of moves
let lock // if True, the user will not be able to select cards
let time 
let clock
let myTimer

function start () {
    // this function is called as soon as the page is loaded and when the user decides to play again

    let numCards = parseInt(prompt("[PT-BR] Quantas cartas você deseja? (numeros pares de 4 a 14)\n\n[EN] How many cards do you want? (even numbers from 4 to 14)"));// The user is asked how many cards he wants to play with
    
    while (numCards%2!==0 || numCards<4 || numCards>14){
        numCards = parseInt(prompt("[PT-BR] Quantas cartas você deseja? (numeros pares de 4 a 14)\n\n[EN] How many cards do you want? (even numbers from 4 to 14)"));
    }
    
    let deck = cards.slice(0,numCards);
    deck.sort(() => Math.random() - 0.5); // After this line, deck will be scrambled

    let content=''
    for (let i=0;i<deck.length;i++){
        content+=`<div data-identifier="card" class="card" onclick="flipCard(this)">
            <div data-identifier=front-face" class="cardFront">
                <img src='./gif/${deck[i]}.gif' alt="front face">
            </div>
            <div data-identifier="back-face" class="cardBack">
                <img src="./img/front.png" alt="back face">
            </div>
        </div>`
    }

    document.querySelector("main").innerHTML=content; 
    
    firstCard=null;
    secondCard=null;
    counter = 0;
    lock=false;
    time=0;

    document.querySelector("header").innerHTML="<h1>PARROT CARD GAME</h1><p>0</p>"
    
    myTimer = setInterval(() => {
        // Creates an on-screen timer and updates every 1 second
        time++
        clock = document.querySelector("header p");
        clock.innerHTML = time
    }, 1000);

}


function flipCard (card) {
    if(!lock && !card.classList.contains("flip")){
        card.classList.add("flip")
        
        if (!firstCard){ 
            firstCard = card.querySelector(".cardFront img"); // Select the first card
        }else if(!secondCard){
            secondCard = card.querySelector(".cardFront img"); // Select the second card
            if (firstCard.src == secondCard.src){ // checks if the two cards have the same image
                firstCard.parentNode.parentNode.classList.add("match"); 
                secondCard.parentNode.parentNode.classList.add("match"); 
                firstCard=null; 
                secondCard=null;
                counter++; 
                if (checkEnd()){ // check if the game is over
                    clearInterval(myTimer); // ends the timer
                    setTimeout(finish,100);     
                }
            }else{ // if the two cards do not have the same image
                lock=true; // does not allow the player to select other cards
                setTimeout( () => {
                    firstCard.parentNode.parentNode.classList.remove("flip"); 
                    secondCard.parentNode.parentNode.classList.remove("flip"); 
                    firstCard=null;
                    secondCard=null;
                    lock=false; // allows the player to select other cards
                },1000); // the cards are flipped over for 1 second
                counter++;
            }
        }
    }
}

function checkEnd () {
    // check if the game is over
    // returns true if all cards on the board are flipped
    let end = true;
    let board = document.querySelectorAll(".card");
    for (card of board){
        if (!card.classList.contains("flip")){
            end=false
        }
    }
    return end
}

function finish () {
    alert(`[PT-BR] Acabou em ${counter*2} jogadas e em ${document.querySelector("header p").innerHTML} segundos!\n\n[EN] Finished in ${counter*2} moves and ${document.querySelector("header p").innerHTML} seconds!`);
    const againOptions = ["s","y","n",null];
    let again=prompt("[PT-BR] Quer jogar novamente? (S ou N)\n\n[EN] Want to play again? (Y or N)").toLowerCase() ;
    while (!againOptions.includes(again)){ 
        again=prompt("[PT-BR] Quer jogar novamente? (S ou N)\n\n[EN] Want to play again? (Y or N)").toLowerCase();
    }
    if(again=="s" || again=="y"){ 
        start();
    }
}


start();