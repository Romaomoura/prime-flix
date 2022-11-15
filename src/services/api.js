import axios from 'axios'

//https://api.themoviedb.org/3/movie/550?api_key=6383febf9488fa6d247387522e055fec
const api = axios.create({
    baseURL:"https://api.themoviedb.org/3/"
    });

export default api;