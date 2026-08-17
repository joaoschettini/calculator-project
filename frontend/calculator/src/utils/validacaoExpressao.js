export function mensagemErro(valor) {
  let mensagem = valor;
  return mensagem;
}

export function tipoDoCaractere(char) {
  if (/[0-9]/.test(char)) return "NUMERO";
  if (/[+\-*/]/.test(char)) return "OPERADOR";
  if (char === "(") return "ABRE_PARENTESE";
  if (char === ")") return "FECHA_PARENTESE";
  if (char === ".") return "PONTO";
  return "DESCONHECIDO";
}

export function podeAdicionar(expressaoAtual, novoChar) {
  const ultimoChar = expressaoAtual.slice(-1);
  const tipoUltimo = ultimoChar ? tipoDoCaractere(ultimoChar) : "INICIO";
  const tipoNovo = tipoDoCaractere(novoChar);

  if (tipoNovo === "DESCONHECIDO") {
    return mensagemErro("Caractere desconhecido!");
  };

  if (tipoUltimo === "OPERADOR" && tipoNovo === "OPERADOR") {
    return mensagemErro("Dois operadores consecutivos não são permitidos!");
  } 

  if (tipoUltimo === "INICIO" && tipoNovo === "OPERADOR" && novoChar !== "-") {
    return mensagemErro("Expressão não pode começar com um operador ou parêntese fechado!");
  } 

  if (tipoUltimo === "INICIO" && tipoNovo === "FECHA_PARENTESE") {
    return mensagemErro("Expressão não pode começar com um operador ou parêntese fechado!");
  }

  if (tipoUltimo === "FECHA_PARENTESE" && (tipoNovo === "NUMERO" || tipoNovo === "ABRE_PARENTESE")) {
    return mensagemErro("Operandor necessário após parêntese fechado!");
  }

  if (tipoUltimo === "ABRE_PARENTESE" && novoChar !== "-" && (tipoNovo === "OPERADOR" || tipoNovo === "FECHA_PARENTESE")) {
    return mensagemErro("Não é permitido operador ou parêntese vazio!");
  }

  if (tipoNovo === "FECHA_PARENTESE") {
    const abertos = (expressaoAtual.match(/\(/g) || []).length;
    const fechados = (expressaoAtual.match(/\)/g) || []).length;
    if (fechados >= abertos) {
      return mensagemErro("Parênteses desbalanceados!");
    }
  }

  if (tipoNovo === "PONTO") {
    const ultimoNumero = expressaoAtual.split(/[\+\-\*\/\(\)]/).pop();
    if (ultimoNumero.includes(".")) {
      return mensagemErro("Número já possui um ponto decimal!");
    }
  }

  return null;
}

export function expressaoValida(expressao) {
  if (expressao === "") {
    return mensagemErro("Expressão vazia!");
  }

  const ultimoChar = expressao.slice(-1);
  const tipoUltimo = tipoDoCaractere(ultimoChar);

  if (tipoUltimo === "OPERADOR" || tipoUltimo === "PONTO" || tipoUltimo === "ABRE_PARENTESE") {
    return mensagemErro("Expressão inválida!");
  } 

  const abertos = (expressao.match(/\(/g) || []).length;
  const fechados = (expressao.match(/\)/g) || []).length;
  if (abertos !== fechados) {
    return mensagemErro("Parênteses desbalanceados!");
  }
  
  return null;
}

export function formatarResultado(numero) {
   const valorNumerico = Number(numero); // força conversão pra number de verdade, mesmo se vier como string
  
  if (isNaN(valorNumerico)) {
    return mensagemErro("Não é um número válido"); // proteção caso venha algo que não é número
  }
  
  const arredondado = parseFloat(valorNumerico.toFixed(10)); // corrige imprecisão de float
  return arredondado.toString();
}