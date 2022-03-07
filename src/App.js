import React,{useState,useEffect} from 'react';

//import axios to bring in the post
import axios from "axios";

//import posts component
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  //set our state
  const [posts,setPosts] = useState([]);
  //loading porposes state
  const [loading,setLoading] = useState(false);
  //pagination state
  const [currentPage,setCurrentPage] = useState(1);
  //post per page state 
  const [postPerPage] = useState(10);

  //get posts from the API
  useEffect(() =>{
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    }
    fetchPosts();
  },[]);
  // console.log(posts);

  //get current post
  const indexOfLastPage = currentPage * postPerPage;
  // console.log(indexOfLastPage);
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  // console.log(indexOfFirstPage);
  const currentPosts = posts.slice(indexOfFirstPage,indexOfLastPage);

  //change page 

  const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

  return ( 
    <div className="container mt-5">
      <h1 className='text-primary mb-3'>My Blog Posts</h1>
      <Posts posts={currentPosts } loading={loading}/>
     < Pagination postPerPage={postPerPage} totalPosts={posts.length} paginate={paginate}/>
    </div>
  );
}

export default App;
