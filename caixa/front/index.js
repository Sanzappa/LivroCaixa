function carregarTabela(){
    let linhamodelo = document.querySelector(".linhamodelo");

    fetch("http://localhost:5000/livrocaixa/lancamentos")
    .then(res => { return res.json() })
    .then(lancamentos => {
        lancamentos.forEach(Lancamento => {
            let linha = linhamodelo.cloneNode(true);
            linha.classList.remove("model");

            data = new Date(Lancamento.data);
            dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

            let colunas = linha.querySelectorAll("td");
            colunas[0].innerHTML = Lancamento.n_lancamento;
            colunas[1].innerHTML = dataFormatada;
            colunas[2].innerHTML = Lancamento.descricao;
            colunas[3].innerHTML = "R$ " + Lancamento.valor;

            if(Lancamento.tipo === "C"){
                colunas[4].innerHTML = "credito"
                document.querySelector("#tab-cre").appendChild(linha);
            }else{
                colunas[4].innerHTML = "debito"
                document.querySelector("#tab-deb").appendChild(linha);
            }
        });
    });
}

function carregarDatas(){
    let select = document.querySelector("#felipe")
    fetch("http://localhost:5000/livrocaixa/lancamentos")
    .then(res => { return res.json() })
    .then(lancamentos => {
        lancamentos.forEach(datas => {
            
        })
    })
}