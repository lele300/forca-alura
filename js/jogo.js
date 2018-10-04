// recebe sprite como parâmetro
const criaJogo = sprite => {

    let etapa = 1;
    let lacunas = [];
    let palavraSecreta = '';

    const ganhou = () => {
        return lacunas.length //Se lacunas.length == 0, return false... se lacunas.length != 0, executa o some()
        ? !lacunas.some(function(lacuna){ //Se ele retorna true, muda o valor para false por que 
                                          // o jogador NÃO GANHOU.
            //Se a lacuna for == '', ele retorna true
            return lacuna == '';
        })
        : false;
    };
    

    const perdeu = () => sprite.isFinished();

    const ganhouOuPerdeu = () => ganhou() || perdeu();
    
    const reinicia = () => {
        etapa = 1;
        lacunas = [];
        palavraSecreta = '';
        sprite.reset();
    };

    const criaLacunas = () => {
        for(let i = 0 ; i < palavraSecreta.length; i++){
            lacunas.push("");
        }
    };

    const proximaEtapa = () => etapa = 2;

    const setPalavraSecreta = palavra => {
        if(!palavra.trim()) throw Error('Palavra secreta inválida');
        palavraSecreta = palavra;
        lacunas = [];
        criaLacunas();
        proximaEtapa();
    };

    const getLacunas = () => lacunas;


    const getEtapa = () => etapa;


    // preencher lacuna ou exibe o próximo sprite. Retorna true ou false caso o jogador tenha acertado
    const processaChute = chute => {
        if(!chute.trim()) throw Error('Chute inválido');
        const regex = new RegExp(chute,'gi');
        let resultado , acertou = false
        while (resultado = regex.exec(palavraSecreta)){
            lacunas[resultado.index] = chute;
            acertou = true;
        }
        if(!acertou) sprite.nextFrame();
    };

    // adicionou na propriedade do objeto
    return {
        setPalavraSecreta, 
        getLacunas,
        getEtapa,
        processaChute,
        ganhou,
        perdeu,
        ganhouOuPerdeu,
        reinicia
    }
};