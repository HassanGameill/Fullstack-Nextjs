"use client"
import Link from 'next/link'
import React from 'react'


interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

const ErrorPage = ({error, reset}: ErrorPageProps ) => {


  return (
    <div className='p-20 text-center'>
        <div className="container">
            Something Went Wrong

        </div>

        <h2 className="">
            Error Message: {error.message}
        </h2>

        <button
         onClick={() => reset()}
         className="bg-blue-500  py-2 px-4 pt-3 rounded-lg">
            Try Again
        </button>

        <Link href={"/"} className='text-xl underline text-blue-600 block mt-6' >
            Go To Home Page
        </Link>
    </div>
  )
}

export default ErrorPage