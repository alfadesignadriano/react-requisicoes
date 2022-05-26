import './App.css';
import {useEffect,  useState } from 'react';
import { post } from './types/post';

function App() {
  const [posts, setPosts] = useState<post[]>([]);
  const [loading,setLoading] = useState(false);

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

  useEffect(() =>{
    //loadMoviesFetch();
    loadPostsAsync();
  },[]);

  return (
    <div className='p-5'>
      {loading && <div className='p-2'>carregando...</div>}
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
