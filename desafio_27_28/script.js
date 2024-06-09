// selecionando elementos
const fomulario = document.querySelector('#form')
const nameInput = document.querySelector('#name')
const sobrenomeInput = document.querySelector('#lastName')
const emailInput = document.querySelector('#email')
const cepInput = document.querySelector('#cep')
const mensagem = document.querySelector('#mensagem')

// evento para controlar após a submissão
fomulario.addEventListener('submit', function (event) {
  event.preventDefault();

  const nome = nameInput.value;
  const email = emailInput.value;
  const sobrenome = sobrenomeInput.value;
  const cep = cepInput.value;

  //validar
  const validEmail = validaEmail(email);
  const validNome = validaNome(nome);
  const validSobrenome = validaSobrenome(sobrenome);
  const validCep = validaCep(cep);


  if (validEmail && validNome && validSobrenome && validCep) {
    mensagem.textContent = 'Dados válidos'
    mensagem.style.color = 'green';
  } else {
    mensagem.textContent = 'Dados inválidos'
    mensagem.style.color = 'red'
  }
})

// função de validar o nome
const validaNome = function (nome) {
  const regexNome = /^[a-zA-Zà-úÀ-Ú]+$/;
  return regexNome.test(nome);
}

// função de validar sobrenome
const validaSobrenome = function (sobrenome) {
  const regexSobrenome = /^[a-zA-Zà-úÀ-Ú]+$/;
  return regexSobrenome.test(sobrenome);
}

// função de validar o email
const validaEmail = function (email) {
  const regexEmail = /^[^\s]+@[^\s]+\.[^\s]+$/;
  return regexEmail.test(email)
} 

// função para pesquisar cep
const pesquisarCep = async() => {
  const cep = document.getElementById('cep').value;
  const url = `http://viacep.com.br/ws/${cep}/json/`;
  const dados = await fetch(url)
  const endereco = await dados.json();

  preencherFormulario(endereco);
}

const validaCep = function (cep) {
  const regexCep = /^[0-9]+$/;
  const tamanhoCep = cep.length == 8;
  return regexCep.test(cep) && tamanhoCep;
}


// função para preencher o formulário
const preencherFormulario = (endereco) => {
  document.getElementById('rua').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
}


// adiciona evendo focusout no cep
document.getElementById('cep').addEventListener('focusout', pesquisarCep);
