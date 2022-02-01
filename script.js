let verificar = false;
while (!verificar){
    let numCartas = parseInt(prompt("quantas cartas?"));
    if (numCartas%2==0 && numCartas>=4 && numCartas<=14){
        verificar=true;
        let conteudo=''
        for (let i=0;i<numCartas;i++){
            conteudo+='<div class="carta" onclick="viraCarta(this)"><div class="cartaFrente"><img src="./gif/unicornparrot.gif"></div><div class="cartaTras"><img src="./img/front.png"></div></div>'
        }
        document.querySelector("main").innerHTML=conteudo
    }
}

function viraCarta (elemento) {
    elemento.classList.toggle("flip")
}
