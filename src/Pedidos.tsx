import './App.css';
import {useEffect,  useState } from 'react';
import { pedido } from './types/pedidos';

function App() {
  const [pedidos, setPedidos] = useState<pedido[]>([]);
  const [loading,setLoading] = useState(false);

  const loadPedidos  = async () => {
   // setLoading(true);
    let response = await fetch('http://54.156.146.196:8084/GetListaPedidos/')
    let json = await response.json();
    setPedidos(json);
   // setLoading(false);
    
  }

  useEffect(() =>{
    loadPedidos();
  },[]);

  return (
    <div >
      {loading && <div className='p-2'>carregando...</div>}
      {!loading && 
      <>
        <div className='p-2'>Total de pedidos: {pedidos.length} </div> 
        <hr className='mb-1' /> 
{/*         <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-6">
          {movies.map((item,index)=>(
            <div key={index}>
              <img src={item.avatar} className="w-32 block" />
              {item.titulo}
              
            </div>
          ))}
        </div>        
 */}        </>
      }

    </div>
  )
}

export default App
