import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PostDetailsPage = () => {

  const { postId } = useParams()


  const navigation = useNavigate()



  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => {
      return axios.get(`http://localhost:4000/posts/${postId}`)
    }
  })


  const { title, body } = data?.data || {}

  return (
    <div className='post-details-container'>
      <button onClick={()=>navigation(-1)}>Back</button>
      <h3 className='post-details-title'>{title}</h3>
      <div className='post-details-body'>{body}</div>
    </div>
  )
}

export default PostDetailsPage

