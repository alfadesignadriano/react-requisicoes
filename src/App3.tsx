import './App.css';
import {useEffect,  useState } from 'react';
import { movie } from './types/movie';

function App() {
  const [movies, setMovies] = useState<movie[]>([]);
  const [loading,setLoading] = useState(false);

  let urlOk : string = 'https://api.b7web.com.br/cinema/';
  let urlErro : string = 'https://api.b7web.com.br/cinema';  
  //modelo 1 de load
  const loadMoviesFetch  = () => {
    fetch(urlErro)
    .then((response)=>{
      return response.json();
    })
    .then((json)=>{
      setMovies(json);
    })
    .catch((e) => {
      setLoading(false);
      setMovies([]);
      console.error(e);
    })
  }
  //modelo 2 de load
  const loadMoviesAsync  = async () => {
    try{
      setLoading(true);
      let response = await fetch(urlErro)
      let json = await response.json();
      setMovies(json);
      setLoading(false);
    } catch(e){
      setLoading(false);
      console.error(e);
    }
  }

  useEffect(() =>{
    //loadMoviesFetch();
    loadMoviesAsync();
  },[]);

  return (
    <div >
      {loading && <div className='p-2'>carregando...</div>}
      {!loading && movies.length > 0 &&
      <>
        <div className='p-2'>Total de Filmes: {movies.length} </div> 
        <hr className='mb-1' /> 
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-6">
          {movies.map((item,index)=>(
            <div key={index}>
              <img src={item.avatar} className="w-32 block" />
              {item.titulo}
              
            </div>
          ))}
        </div>        
        </>
      }
      {!loading && movies.length == 0 && 
      <div>Tente novamente mais tarde!</div>}      

    </div>
  )
}

export default App
