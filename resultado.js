import React from "react";

const Resultado = (props) => {
    if (!!props.dados) {
        return (
            <div>
                <h1>{props.dados?.name}</h1>
                <img src={props.dados?.sprites?.front_default} />
            </div>
        )
    }
    
}

export default Resultado