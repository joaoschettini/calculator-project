import Button from './Button.jsx'

const botoes = [
    "C", "<-", ".", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "+",
    "1", "2", "3", "-",
    "0", "(", ")", "=", 
]


function ButtonPad({ onButtonClick, buttonColor }) {
    return (
        <div className="grid grid-cols-4 gap-2 m-5 mt-0 shadow-md shadow-black/20">
            {botoes.map((valor) => (
                <Button
                    key={valor}
                    label={valor}
                    onClick={() => onButtonClick(valor)}
                    style={buttonColor(valor)}
                />
            ))}
        </div>
    )
} 

export default ButtonPad