import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'


const PostsRQ = () => {

  const { data, isLoading, isError, error, isFetching, refetch }
    = useQuery({
      queryKey: ['posts'],
      queryFn: () => {
        return axios.get('http://localhost:4000/posts')
      },
      enabled: false
      // staleTime:20000,
      // refetchInterval: 10000, // Automatically refetch data every 10 seconds
    })

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error has occurred: {error.message}</div>
  }
  console.log(isLoading, isFetching)
  return <div>
    <div className='post-list'>
      <button onClick={refetch}>Refech</button>
      {data?.data.map(post => (
        <Link to={`/rq-posts/${post.id}`} key={post.id}>
          <div className='post-item' key={post.id}>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-body'>{post.body}</p>
          </div>
        </Link>
      ))}


      {/* 
      <Link to={`/rq-posts/${post.id}`}>

        <div>
          title

        </div>
      </Link> */}


    </div>

  </div>
}

export default PostsRQ
