import "./App.css";
import { useState } from "react";
import ButtonPad from "./components/ButtonPad.jsx";
import Display from "./components/Display.jsx";
import Card from "./components/Card.jsx";
import { podeAdicionar, expressaoValida, formatarResultado } from "./utils/validacaoExpressao";
import { api } from "./service/api.jsx";

function App() {
  const [expressao, setExpressao] = useState("");
  const [erro, setErro] = useState(null);
  const [historico, setHistorico] = useState([]);

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
        api.post("/calcular", {
            expressao: expressao,
          })
          .then((response) => {
            console.log(response.data);
            const resultadoExpressao = response.data
            setExpressao(formatarResultado(resultadoExpressao.resultado))
            getHistorico();
          })
          .catch((error) => {
            console.error(error);
          });
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
      return "bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-400 transition-colors duration-250";
    }

    if (valor >= "0" && valor <= "9") {
      return "bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-500 transition-colors duration-250";
    }

    return "bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-500 transition-colors duration-250";
  }

  function getHistorico() {
    api.get("/historico")
    .then((response) => {
      setHistorico(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  return (
    <>
      <div className="bg-gray-900 p-4 rounded-lg shadow-md flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl text-white font-bold justify-center items-center m-2 flex">
          Calculadora
        </h1>
        <div className="flex flex-row">
          <div className="flex flex-col items-center justify-start shadow-lg bg-zinc-900 p-4 rounded-4xl shadow-black/40 h-fit">
            <Display expressao={expressao} />
            {erro && <p className="text-red-500 m-4 mt-0">{erro}</p>}
            <ButtonPad
              onButtonClick={handleButtonClick}
              buttonColor={handleButtonColor}
            />
          </div>
          <div>
            <Card historico={historico}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
