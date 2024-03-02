import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <main className='text-center'>
      <h2 className="text-3xl">We hit a brick wall.</h2>
      <p>Ticket you were looking for could not be found.</p>
      <p>Go back to <Link href='/'>Dashboard</Link></p>
    </main>
  )
}
