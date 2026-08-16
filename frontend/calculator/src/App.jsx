import "./App.css";
import { useState } from "react";
import ButtonPad from "./components/ButtonPad.jsx";
import Display from "./components/Display.jsx";
import {
  podeAdicionar,
  expressaoValida
} from "./utils/validacaoExpressao";

function App() {
  const [expressao, setExpressao] = useState("");
  const [erro, setErro] = useState(null);

  function handleButtonClick(valor) {
    if (valor === "C") {
      setExpressao("");
      setErro(null);
    } else if (valor === "<-") {
      setExpressao(expressao.slice(0, -1));
    } else if (valor === "=") {
      const resultado = expressaoValida(expressao);

      if (resultado !== null) {
        setErro(resultado);
      } else {
        setErro(null);
        // logica louca
      }
    } else {
      const resultado = podeAdicionar(expressao, valor);

      if (resultado !== null) {
        // deu erro! "resultado" é a mensagem
        setErro(resultado);
      } else {
        // sem erro, pode adicionar
        setErro(null);
        setExpressao(expressao + valor);
      }
    }
  }

  function handleButtonColor(valor) {
    if (valor === "=" || valor === "C") {
      return "bg-orange-600 text-white px-6 py-2 rounded";
    }

    if (valor >= "0" && valor <= "9") {
      return "bg-blue-800 text-white px-6 py-2 rounded";
    }

    return "bg-gray-700 text-white px-6 py-2 rounded";
  }

  return (
    <>
      <div className="bg-zinc-900 p-4 rounded-lg shadow-md flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl text-white font-bold justify-center items-center m-2 flex">
          Calculadora
        </h1>
        <Display expressao={expressao} />
        {erro && <p className="text-red-500 m-4 mt-0">{erro}</p>}
        <ButtonPad
          onButtonClick={handleButtonClick}
          buttonColor={handleButtonColor}
        />
      </div>
    </>
  );
}

export default App;
