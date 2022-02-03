const cartas = [ 'unicornparrot','unicornparrot','tripletsparrot','tripletsparrot','revertitparrot','revertitparrot','metalparrot','metalparrot', 'fiestaparrot', 'fiestaparrot', 'explodyparrot','explodyparrot', 'bobrossparrot', 'bobrossparrot']

let numCartas = parseInt(prompt("quantas cartas?"));
while (numCartas%2!==0 || numCartas<4 || numCartas>14){
    numCartas = parseInt(prompt("quantas cartas?"));
}
let deck = cartas.slice(0,numCartas);
deck.sort(() => Math.random() - 0.5); // Após esta linha, a minhaArray estará embaralhada

let conteudo=''
for (let i=0;i<deck.length;i++){
    conteudo+=`<div class="carta" onclick="viraCarta(this)"><div class="cartaFrente"><img src='./gif/${deck[i]}.gif'></div><div class="cartaTras"><img src="./img/front.png"></div></div>`
}
document.querySelector("main").innerHTML=conteudo

let primeiraCarta=null;
let segundaCarta=null;
let contador = 0;
lock=false;

function viraCarta (carta) {
    if(!carta.classList.contains("match") && !lock){
        carta.classList.toggle("flip")
        if (!primeiraCarta){
            primeiraCarta = carta.querySelector(".cartaFrente img");
        }else if(!segundaCarta){
            segundaCarta = carta.querySelector(".cartaFrente img");
            if (primeiraCarta.src == segundaCarta.src){
                // console.log("deu match");
                primeiraCarta.parentNode.parentNode.classList.add("match");
                segundaCarta.parentNode.parentNode.classList.add("match");
                primeiraCarta=null;
                segundaCarta=null;
                contador++;
                if (verificaFim()){
                    setTimeout( () => {
                        alert(`acabou em ${contador} jogadas`) 
                    },100);     
                }
            }else{
                // console.log("nao");
                lock=true;
                setTimeout( () => {
                    primeiraCarta.parentNode.parentNode.classList.remove("flip");
                    segundaCarta.parentNode.parentNode.classList.remove("flip");
                    primeiraCarta=null;
                    segundaCarta=null;
                    lock=false;
                },1000);
                contador++;
            }
        }
        // console.log(verificaFim());
    }
}

function verificaFim () {
    let fim = true;
    let cartas = document.querySelectorAll(".carta");
    for (carta of cartas){
        if (!carta.classList.contains("flip")){
            fim=false
        }
    }
    return fim
}
