import { useEffect, useState } from 'react'
import  {Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import './favoritos.css'

function Favoritos(){

    const [ filmes, setFilmes ] = useState([])
    //const [ loading, setLoading ]  =  useState(true)

    useEffect(() => {
      
        const minhaLista = localStorage.getItem("@primeflix")
        setFilmes(JSON.parse(minhaLista) || [])

    }, [])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item) =>{
            return (item.id !== id)
        })

        setFilmes(filtroFilmes)
        localStorage.setItem('@primeflix',JSON.stringify(filtroFilmes))
        toast.success("Filme removido da sua lista!")
    }

    return(
        <div className="meus-favoritos">
            <h1>Meus favoritos</h1>

            {filmes.length === 0 && <span> Tem favoritos ainda não :( </span>}

            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link> 
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;