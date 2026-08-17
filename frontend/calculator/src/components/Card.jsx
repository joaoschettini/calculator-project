function Card({expressao, resultado}) {
    
    return (
        <div className ="bg-zinc-900 w-90 text-white h-fit p-5 flex flex-col justify-center items-end m-2 rounded-2xl shadow-lg shadow-black/40">
            <div className="flex text-right text-2xl font-light">
                2+2
            </div>
            <div className="flex text-right text-4xl font-bold">
                4
            </div>
        </div>
    )
}

export default Card;