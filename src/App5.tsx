import './App.css';
import {useEffect,  useState } from 'react';
import { post } from './types/post';

function App() {
  const [posts, setPosts] = useState<post[]>([]);
  const [loading,setLoading] = useState(false);
  const [addTitletext, setAddTitletext] = useState('');
  const [addBodytext, setAddBodytext] = useState('');


  let url : string = 'https://jsonplaceholder.typicode.com/posts/';

  //modelo 1 de load
  const loadPostFetch  = () => {
    fetch(url)
    .then((response)=>{
      return response.json();
    })
    .then((json)=>{
      setPosts(json);
    })
    .catch((e) => {
      setLoading(false);
      setPosts([]);
      console.error(e);
    })
  }
  //modelo 2 de load
  const loadPostsAsync  = async () => {
    try{
      setLoading(true);
      let response = await fetch(url)
      let json = await response.json();
      setPosts(json);
      setLoading(false);
    } catch(e){
      setLoading(false);
      console.error(e);
    }
  }

  const handleAddClick =async() =>{
    if (addTitletext && addBodytext) {
      let response = await fetch(url,{
        method: 'POST',
        body : JSON.stringify({
          title: addTitletext,
          body : addBodytext,
          userId : 1
        }),
        headers:{
          'Content-type': 'application/json'
        }
      });
      let json = await response.json();
      console.log(json);
      if (json.id) {
        alert("Post adicionado com sucesso!")
      }
    }else{
      alert('preencha os dados')  ;
    }
    
  }
  useEffect(() =>{
    //loadMoviesFetch();
    loadPostsAsync();
  },[]);

  return (
    <div className='p-5'>
      {loading && <div className='p-2'>carregando...</div>}
      <fieldset className='border-2  mb-3'>
        <legend>Adicionar novo post</legend>
        <input 
          value={addTitletext} 
          onChange={e => setAddTitletext((e.target.value))} 
          className='block border rounded m-2 p-1' 
          type='text' 
          placeholder='Digite um título' />
        <textarea 
          value={addBodytext} 
          onChange={e => setAddBodytext((e.target.value))} 
          className='block border rounded m-2 p-1' />
        <button 
          onClick={handleAddClick}
          className='bg-blue-400 block border rounded m-2 p-2'>Adicionar
        </button>
      </fieldset>
      {!loading && posts.length > 0 &&
      <>
        <div className='p-2'>Total de Posts: {posts.length} </div> 
        <hr className='mb-1' /> 
        <div >
          {posts.map((item,index)=>(
            <div className='my-4' key={index}>
              <h4 className='font-bold'>{item.title}</h4>
              <small> #{item.id} - Usuario: {item.userId}</small>
              <p>{item.body}</p>
            
            </div>
          ))}
        </div>        
        </>
      }
      {!loading && posts.length == 0 && 
      <div>Tente novamente mais tarde!</div>}      

    </div>
  )
}

export default App
