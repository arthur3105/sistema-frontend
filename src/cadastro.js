window.onload = function (e) {

    var btnCadastrar = document.getElementById("btnCadastrar");

    var txtNome = document.getElementById("txtNome");

    var txtSobrenome = document.getElementById("txtSobrenome");

    var txtEmail = document.getElementById("txtEmail");

    var txtTelefone = document.getElementById("txtTelefone");

    var slcGenero = document.getElementById("slcGenero");

    var txtSenha = document.getElementById("txtSenha");

    txtNome.focus();

    btnCadastrar.onclick = function (e) {

        e.preventDefault();

        var nome = txtNome.value;

        var sobrenome = txtSobrenome.value;

        var email = txtEmail.value;

        var telefone = txtTelefone.value;

        var genero = slcGenero.value;

        var senha = txtSenha.value;

        if (nome == "") {
            exibirMensagemErro("Campo Nome obrigatório!");
        }
        else if (sobrenome == "") {
            exibirMensagemErro("Campo Sobrenome obrigatório!");
        } else if (email == "") {
            exibirMensagemErro("Campo E-mail obrigatório!");
        } else if (telefone == "") {
            exibirMensagemErro("Campo Telefone obrigatório!")
        } else if (senha == "") {
            exibirMensagemErro("Campo Senha obrigatório!")
        } else {
            realizarCadastro(nome, sobrenome, email, telefone, genero, senha);
        }

    }

    function exibirMensagemErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);

    }

    function realizarCadastro(nome, sobrenome, email, telefone, genero, senha) {

        var data = JSON.stringify({
            "nome": nome,
            "sobrenome": sobrenome,
            "email": email,
            "telefone": telefone,
            "genero": genero,
            "senha": senha
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var cadastroResult = JSON.parse(this.responseText);

                if (cadastroResult.sucesso) {

                    localStorage.setItem("usuarioGuid", cadastroResult.usuarioGuid);

                    window.location.href = 'home.html';
                }
                else {

                    exibirMensagemErro(cadastroResult.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44317/api/usuario/cadastro");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

}