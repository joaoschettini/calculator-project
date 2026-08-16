function Display({ expressao }) {

    return (
        <>
            <input 
                className="w-auto h-12 text-right font-bold bg-green-100 p-2 border border-gray-600 rounded m-5 ml-0 mr-0"
                type="text"
                value={expressao}
             />
        </>
    ) 
}

export default Display