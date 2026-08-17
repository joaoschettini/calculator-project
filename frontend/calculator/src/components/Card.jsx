function Card({ historico }) {
  const historicoOrdenado = [...historico].sort((a, b) => b.id - a.id);

  return (
    <div className="flex flex-col max-h-96 overflow-y-auto">
      {historicoOrdenado.map((item) => (
        <div
          key={item.id}
          className="bg-zinc-900 w-90 text-white h-fit p-5 flex flex-col justify-center items-end m-2 rounded-2xl shadow-lg shadow-black/40 shrink-0"
        >
          <div className="flex text-right text-2xl font-light">
            {item.expressao}
          </div>
          <div className="flex text-right text-4xl font-bold">
            {item.resultado}
          </div>
        </div>
      ))}
    </div>
  );
}
export default Card;