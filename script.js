let cartas = [ 'unicornparrot','unicornparrot','tripletsparrot','tripletsparrot','revertitparrot','revertitparrot','metalparrot','metalparrot', 'fiestaparrot', 'fiestaparrot', 'explodyparrot','explodyparrot', 'bobrossparrot', 'bobrossparrot']
let verificar = false;
while (!verificar){
    let numCartas = parseInt(prompt("quantas cartas?"));
    if (numCartas%2==0 && numCartas>=4 && numCartas<=14){
        verificar=true;
        
        let deck = cartas.slice(0,numCartas);
        deck.sort(() => Math.random() - 0.5); // Após esta linha, a minhaArray estará embaralhada

        let conteudo=''
        for (let i=0;i<deck.length;i++){
            conteudo+=`<div class="carta" onclick="viraCarta(this)"><div class="cartaFrente"><img src='./gif/${deck[i]}.gif'></div><div class="cartaTras"><img src="./img/front.png"></div></div>`
        }
        document.querySelector("main").innerHTML=conteudo
    }
}

function viraCarta (elemento) {
    elemento.classList.toggle("flip")
}
