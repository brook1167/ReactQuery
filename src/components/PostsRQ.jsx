import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'




const PostsRQ = () => {

  const queryClient = useQueryClient()


  const { data, isLoading, isError, error, isFetching, refetch }
    = useQuery({
      queryKey: ['posts'],
      queryFn: () => {
        return axios.get('http://localhost:4000/posts')
      },
      // enabled: false
      // staleTime:20000,
      // refetchInterval: 10000, // Automatically refetch data every 10 seconds
    })

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')


  // POST METHODS --------------------------------

  const addPost = (post) => {
    return axios.post("http://localhost:4000/posts", post)
  }


  const handleSubmit = (e) => {

    e.preventDefault()
    const post = { title, body }
    addPostMutaion(post)
    setTitle("")
    setBody("")
  }


  const { mutate: addPostMutaion } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      console.log("applke")
      queryClient.invalidateQueries("posts")
    }
  })

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error has occurred: {error.message}</div>
  }
  console.log(isLoading, isFetching)
  return <div>
    <form onSubmit={handleSubmit}>
      <input

        style={{ padding: 10 }}
        type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' />
      <input style={{ padding: 10 }} type='text' value={body} onChange={e => setBody(e.target.value)} placeholder='Body' />
      <button type="submit">
        Add
      </button>
    </form>
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
