const criaController =  jogo => {

    const $entrada = $('#entrada');
    const $lacunas = $('.lacunas');

    // consulta jogo.getLacunas() e exibe para o usuário cada lacuna 

    const exibeLacunas =  () => {
        $lacunas.empty(); // Remove todos os elementos filhos dos elementos pais
        jogo.getLacunas().forEach(lacuna => { //jogo.getLacunas() retorna o array de lacunas
            $("<li>")
            .addClass("lacuna")
            .text(lacuna)
            .appendTo($lacunas); //Adiciona uma <li class="lacuna">valorDoChute</li> na <ul class="lacunas">
        });
    };

    // muda o texto do placeHolder do campo de entrada    
    const mudaPlaceHolder = texto => $entrada.attr("placeholder", texto);

    // passa para jogo.setPalavraSecreta() o valor digitado pelo jogador e chama o a função `exibeLacunas()` e `mudaPlaceHolder()` definidas no controller. 

    const guardaPalavraSecreta = () => {
        try {
            const inputPalavra = $entrada.val().trim();
            jogo.setPalavraSecreta(inputPalavra);
            mudaPlaceHolder('chute');
            exibeLacunas();
            $entrada.val('');
        } catch(err) {
            alert(err.message);
        }
    };

    const leChute = () => {
        try {
            jogo.processaChute($entrada.val().trim().substr(0,1)); //substr() pega o texto do index 0 ao index 1
            exibeLacunas();
            $entrada.val('');
    
            if(jogo.ganhouOuPerdeu()){
                setTimeout(() => {
                    if(jogo.ganhou()){
                        alert("Ganhou!!!");
                    }
                    else if(jogo.perdeu()){
                        alert("Uma pena, você perdeu");
                    }
                    reinicia();
                },300);
            }  
        } catch (err) {
            alert(err.message);
        }
    };

    // faz a associação do evento keypress para capturar a entrada do usuário toda vez que ele teclar ENTER
    const inicia = () => {
        $entrada.keypress(event => {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });
    };

    const reinicia = () => {
        $lacunas.empty();
        mudaPlaceHolder('Palavra secreta');
        jogo.reinicia();
    };

    // retorna um objeto com a propriedade inicia, que deve ser chamada assim que o controller for criado. 
    return { inicia };
};
