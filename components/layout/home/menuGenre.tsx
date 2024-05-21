"use client";

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const MenuGenre = ({ href, name }) => {
  const [showGenreList, setShowGenreList] = useState(false)
  const genreListRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        genreListRef.current &&
        !genreListRef.current.contains(event.target)
      ) {
        setShowGenreList(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const toggleGenreList = () => {
    setShowGenreList(!showGenreList)
  }
  return (
    <div className="relative group inline-block" ref={genreListRef}>
      <button
        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        onClick={toggleGenreList}
      >
        {name}
      </button>
      <div
        className={`absolute z-10 mt-2 w-96 rounded-md shadow-lg glass ring-1 ring-black ring-opacity-5 ${
          showGenreList ? 'block' : 'hidden'
        } delay-150`}
      >
        <div
          className="py-1 grid grid-flow-row-dense grid-cols-3 grid-rows-3 w-full"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {[
            'All',
            'Action',
            'Adventure',
            'Animation',
            'Comedy',
            'Crime',
            'Documentary',
            'Drama',
            'Family',
            'Fantasy',
            'Horror',
            'Mystery',
            'Romance',
            'Science Fiction',
            'Thriller',
            'War',
            'Slice of Life',
            'Sports',
          ].map((genre) => (
            <div key={genre}>
              <Link
                href={`${href}?genre=${genre}`}
                className="block px-4 py-2 text-sm text-white hover:bg-gray-500"
                role="menuitem"
                //   style={{ flex: '1 0 20%' }}
              >
                {genre}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MenuGenre
