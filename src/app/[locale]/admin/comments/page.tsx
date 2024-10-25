

import { Link } from '@/navigation'
import React from 'react'

const page = () => {
  return (
    <div className=''>
        <Link href={"/admin/comments/comments-table"}
        className='text-blue-400'
        >Comments Table</Link>
    </div>
  )
}

export default page