import './App.css';
import {useEffect,  useState } from 'react';
import { movie } from './types/movie';

function App() {
  const [movies, setMovies] = useState<movie[]>([]);
  const [loading,setLoading] = useState(false);

  const loadMovies  = async () => {
    setLoading(true);
    let response = await fetch('https://api.b7web.com.br/cinema/')
    let json = await response.json();
    setMovies(json);
    setLoading(false);
    
  }

  useEffect(() =>{
    loadMovies();
  },[]);

  return (
    <div >
      {loading && <div className='p-2'>carregando...</div>}
      {!loading && 
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

    </div>
  )
}

export default App
