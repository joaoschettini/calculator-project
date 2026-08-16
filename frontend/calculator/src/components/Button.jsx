
function Button({label, onClick, style}) {

    return (
        <>
            <button className={style} onClick={onClick}>
                {label}
            </button>
        </>
    )
}

export default Button