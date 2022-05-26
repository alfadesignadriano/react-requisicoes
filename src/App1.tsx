import './App.css';
import {useEffect,  useState } from 'react';
import { movie } from './types/movie';

function App() {
  const [movies, setMovies] = useState<movie[]>([]);
  const loadMovies  = async () => {
    let response = await fetch('https://api.b7web.com.br/cinema/')
    let json = await response.json();
    setMovies(json);
    
  }

  useEffect(() =>{
    loadMovies();
  },[]);

  return (
    <div >
{/*       <button onClick={loadMovies} className="block bg-blue-400 p-2 rounded">carregar filmes</button> */}
      <div className='p-2'>Total de Filmes: {movies.length} </div>
      <hr className='mb-1' />
      <div className="grid grid-cols-6 gap-6">
        {movies.map((item,index)=>(
          <div key={index}>
            <img src={item.avatar} className="w-32 block" />
            {item.titulo}
            
          </div>
        ))}
      </div>        
    </div>
  )
}

export default App
