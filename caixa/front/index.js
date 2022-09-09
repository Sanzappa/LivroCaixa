function carregarTabela(){
    let linhamodelo = document.querySelector(".linhamodelo");

    let saldo = 0


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

            saldo += Lancamento.valor

            if(Lancamento.tipo === "C"){
                colunas[4].innerHTML = "credito"
                document.querySelector("#tab-cre").appendChild(linha);
            }else{
                colunas[4].innerHTML = "debito"
                document.querySelector("#tab-deb").appendChild(linha);
            }
        });
        document.querySelector("#saldo").innerHTML = saldo
    });
}

function carregarDatas() {
    let select = document.querySelector("#felipe")
    fetch("http://localhost:5000/livrocaixa/lancamentos")
        .then(res => { return res.json() })
        .then(lancamentos => {
            let data = []
            lancamentos.forEach(datas => {
                dat = new Date(datas.data)
                dataFormatada = dat.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

                data.push(dataFormatada)

            })
            const filteredArray = data.filter(function (ele, pos) {
                return data.indexOf(ele) == pos
            })

            console.log(filteredArray)

            filteredArray.forEach(dt => {
                let op = document.createElement("option")
                op.value = dt
                op.innerHTML = dt

                select.appendChild(op)
        })  
    }) 
}

function filtrarDatas(e) {
    let modelo = document.querySelector(".linhamodelo")

    let tab1 = document.querySelector("#tab-deb")
    let tab2 = document.querySelector("#tab-cre")

    tab1.innerHTML = ""
    tab2.innerHTML = ""

    tab1.appendChild(modelo)

    fetch("http://localhost:5000/livrocaixa/lancamentos")
        .then(res => { return res.json() })
        .then(lancamentos => {
            lancamentos.forEach(Lancamento => {
                data = new Date(Lancamento.data)
                dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

                if (e == dataFormatada) {
                    let linha = modelo.cloneNode(true)
                    linha.classList.remove("model")

                    let colunas = linha.querySelectorAll("td")
                    colunas[0].innerHTML = Lancamento.n_lancamento
                    colunas[1].innerHTML = dataFormatada
                    colunas[2].innerHTML = Lancamento.descricao
                    colunas[3].innerHTML = "R$ " + Lancamento.valor

                    if (Lancamento.tipo === "C") {
                        colunas[4].innerHTML = "Crédito"
                        document.querySelector("#tab-cre").appendChild(linha)
                    } else {
                        colunas[4].innerHTML = "Débito"
                        document.querySelector("#tab-deb").appendChild(linha)
                    }
                } else if (e == "todos") {
                    tab1.innerHTML = ""
                    tab2.innerHTML = ""

                    tab1.appendChild(modelo)
                    carregarTabela()
                }
            })
        })
}

function cadastrar(){
    let desc = document.querySelector("#desc").value
    let tipo = document.querySelector("#sel").value
    let val = document.querySelector("#val").value

    let dados = {
        "descricao": desc,
        "valor": val,
        "tipo": tipo
    }

    fetch("http://localhost:5000/livrocaixa/lancamentos", {
        "method":"Post",
        "headers":{
            "Content-Type":"application/json"
        },
        "body":JSON.stringify(dados)
    })
    .then(res => {return res.json()})
    .then(resp => {
        if(resp.descricao !== undefined){
            alert("Produto Cadastrado com Sucesso !")
            window.location.reload()
        } else{
            alert("Não foi possivél cadastrar o produto")
        }
    })
}

function showModal(){
    let btn = document.querySelector(".modal")

    btn.classList.toggle("model")
}