/*  var getCep = fetch("https://viacep.com.br/ws/01001000/json/")
        .then(resposta => resposta.json())
        .then(resp => {
            if(resp.erro){
            throw Error("Esse cep Não existe!") 
            }else{
                console.log(resp)
            }
        })
        .catch(erro => console.log(erro))
        .finally(mensagem => console.log("processamento concluido", mensagem));

    console.log(getCep)
*/

async function buscaEndereco(objetoCep){
    var cep = objetoCep.value

    objetoCep.style.border = "1px solid black"
    
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ""
    try{
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();

        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }

        console.log(consultaCEPConvertida);

        var bairro = document.getElementById('bairro');
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');


        bairro.value = consultaCEPConvertida.bairro;
        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;

        return consultaCEPConvertida;
    }catch(erro){
        mensagemErro.innerHTML = "<p> Preencha corretamente este campo! </p>"
        objetoCep.style.border = "2px solid red"
    }
    
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep));

