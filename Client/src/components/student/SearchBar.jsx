import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {

  const navigate= useNavigate()
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/course-list/' + input)
  }

  return (
    <form
      className='max-w-xl md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded'
      onSubmit={handleSubmit}
    >
      <img src={assets.search_icon} alt="search-icon" className='md:w-auto w-10 px-3' />
      <input
        type="text"
        placeholder='Search for courses'
        className='w-full h-full outline-none text-gray-500/80'
        onChange={e => setInput(e.target.value)}  value={input}
      />
      <button type='submit' className='bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1'>
        Search
      </button>
    </form>
  )
}

export default SearchBar