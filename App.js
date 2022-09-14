import React, { useState, useEffect } from "react"
import './App.css';
import Resultado from "./resultado"

function App() {
  const [texto, setTexto] = useState("")
  const [dadosExibicao, setDadosExibicao] = useState()
  const [dados, setDados] = useState()
  const [pesquisa, setPesquisa] = useState("")

  useEffect(() => {
    setDadosExibicao(dados?.filter((element) => {
      return element.nome.toLowerCase().includes(pesquisa.toLowerCase())
    }))
  }, [pesquisa])

  useEffect(() => {
    setDadosExibicao(dados)
  }, [dados])

  const salvarFormulario = (event) => {
    event.preventDefault()

    fetch("http://servicodados.ibge.gov.br/api/v1/localidades/distritos/")
      .then(response => response.json())
      .then((response) => {
        setDados(response.filter((element)=>{
          return element.nome.toLowerCase().includes(texto.toLowerCase())
        }))
      })
      .catch((erro) => {
        console.error(erro)
      })
      
  }

  const handleScroll = (event) => {
    
  }

  const handlePesquisa = (event) => 
    setPesquisa(event.target.value)

  return (
    <>
      <div class="background-image"></div>
      <div className="wrapper">
        <div className="titulo">
          <h1>
            BUSCA DE CIDADES
          </h1>
        </div>

        <div className="app">
          <form onSubmit={salvarFormulario}>         
            <input placeholder='Digite o nome da cidade desejada' value={texto} onChange={(event) => setTexto(event.target.value)} />
            <button type='submit'>Buscar</button>       
          </form>

          <ul onScroll={handleScroll}>
            {dadosExibicao?.map(({ id, nome }) => (<li>{id} - {nome}</li>))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;