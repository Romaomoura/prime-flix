import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../services/api'

import './filme.css'

function Filme(){
    const { id } = useParams();
    const navigation = useNavigate();

    const [ filme, setFilme ] = useState([]);
    const [ loading, setLoading ]  =  useState(true);

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "6383febf9488fa6d247387522e055fec",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                navigation("/", { replace:true })
                return;
            })
        }

        loadFilme();

        return () => {
            console.log("Componente desmontado");
        }
    }, [id, navigation, setFilme, setLoading])

    function salvarFilme(){
        const minhalista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhalista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id  === filme.id);

        if (hasFilme){
            toast.info("Esse Filmes já está em sua lista!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")

    }

    if(loading){
        return(
            <div className="filme-info">
                <h2>Carregando Detalhes... Aguarde!</h2>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}> Salvar </button>
                <button>
                    <a target="blank" rel="external noreferrer" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}> 
                        Teaser 
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;