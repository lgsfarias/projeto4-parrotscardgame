const cartas = [ 'unicornparrot','unicornparrot','tripletsparrot','tripletsparrot','revertitparrot','revertitparrot','metalparrot','metalparrot', 'fiestaparrot', 'fiestaparrot', 'explodyparrot','explodyparrot', 'bobrossparrot', 'bobrossparrot']

let primeiraCarta
let segundaCarta
let contador // número de jogadas
let lock // caso True o usuário não poderá selecionar cartas
let tempo 
let relogio
let myTimer

function iniciar () {
    // Esta função é invocada assim que a pagina é carregada e quando o usuário decide jogar novamente

    let numCartas = parseInt(prompt("quantas cartas você deseja? (numeros pares de 4 a 14)"));// Pergunta-se ao usuário com quantas cartas ele quer jogar 
    
    while (numCartas%2!==0 || numCartas<4 || numCartas>14){
        // Repete-se a pergunta até que o número de cartas seja válido
        numCartas = parseInt(prompt("quantas cartas você deseja? (numeros pares de 4 a 14)"));
    }
    
    let deck = cartas.slice(0,numCartas); // Cria-se a partir das cartas disponíveis um array com o número de cartas escolhido pelo usuário 
    deck.sort(() => Math.random() - 0.5); // Após esta linha, a minhaArray estará embaralhada

    let conteudo=''
    for (let i=0;i<deck.length;i++){
        conteudo+=`<div data-identifier="card" class="carta" onclick="viraCarta(this)"><div data-identifier=ront-face" class="cartaFrente"><img src='./gif/${deck[i]}.gif'></div><div data-identifier="back-face" class="cartaTras"><img src="./img/front.png"></div></div>`
    }
    document.querySelector("main").innerHTML=conteudo; // Mostra as cartas ja embaralhadas no arquivo HTML

    primeiraCarta=null;
    segundaCarta=null;
    contador = 0;
    lock=false;
    tempo=0;

    document.querySelector("header").innerHTML="<h1>PARROT CARD GAME</h1><p>0</p>" // Mostra o cabeçalho no HTML
    
    myTimer = setInterval(() => {
        // Cria um cronômetro na tela e atualiza a cada 1 segundo
        tempo++
        relogio = document.querySelector("header p");
        relogio.innerHTML = tempo
    }, 1000);

}


function viraCarta (carta) {
    if(!lock && !carta.classList.contains("flip")){ // Verifica se a carta ja está virada ou se está em lock (será explicado a frente)
        carta.classList.add("flip") // Vira a carta
        if (!primeiraCarta){ 
            primeiraCarta = carta.querySelector(".cartaFrente img"); // Seleciona a primeira carta
        }else if(!segundaCarta){
            segundaCarta = carta.querySelector(".cartaFrente img"); // Seleciona a segunda carta
            if (primeiraCarta.src == segundaCarta.src){ // verifica se as duas cartas tem a mesma imagem
                // console.log("deu match");
                primeiraCarta.parentNode.parentNode.classList.add("match"); // Guarda a informção que a carta ja tem um par
                segundaCarta.parentNode.parentNode.classList.add("match"); // Guarda a informção que a carta ja tem um par
                primeiraCarta=null; 
                segundaCarta=null;
                contador++; // adiciona 1 no contador de jogadas
                if (verificaFim()){ // verifica se o jogo já terminou
                    clearInterval(myTimer); // encerra o cronômetro na tela
                    setTimeout( () => {
                        alert(`acabou em ${contador*2} jogadas e em ${document.querySelector("header p").innerHTML} segundos!`); // emite um alerta com o numero de jogadas e o tempo que o usuário levou
                        let novamente=prompt("quer jogar novamente? (s ou n)") ; // pergunta se o usuário quer jogar novamente
                        while (novamente!=="s" && novamente !== "n" && novamente!== null){ // verifica se foi uma resposta válida
                            let novamente=prompt("quer jogar novamente? (s ou n)");
                        }
                        if(novamente=="s"){ // caso responda com "s" o jogo reinicia
                            iniciar();
                        }
                    },100);     
                }
            }else{ // caso as duas cartas não tenham a mesma imagem
                // console.log("nao");
                lock=true; // nao permite que o jogador selecione outras cartas
                setTimeout( () => {
                    primeiraCarta.parentNode.parentNode.classList.remove("flip"); // desvira as cartas
                    segundaCarta.parentNode.parentNode.classList.remove("flip"); // desvira as cartas
                    primeiraCarta=null;
                    segundaCarta=null;
                    lock=false; // permite que o jogador selecione outras cartas
                },1000); // deixa as cartas viradas por 1 segundo
                contador++;
            }
        }
        // console.log(verificaFim());
    }
}

function verificaFim () {
    // verifica se o jogo já terminou 
    // retorna true se todas as cartas do tabuleiro estiverem viradas
    let fim = true;
    let cartas = document.querySelectorAll(".carta");
    for (carta of cartas){
        if (!carta.classList.contains("flip")){
            fim=false
        }
    }
    return fim
}


iniciar(); // inicia o jogo