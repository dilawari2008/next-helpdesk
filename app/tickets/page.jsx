import React, { Suspense } from 'react'
import TicketList from './TicketList'
import Loading from '../loading'
import Link from 'next/link'

export default function page() {
  return (
    <main>
      <nav>
        <div className='flex w-full h-full'>
          <div>
            <h2>Tickets</h2>
            <p><small>Currently open tickets.</small></p>
          </div>
          <button className="btn bg-primary border-black border-2 rounded-md ml-10">
            <Link href="/tickets/create" className='text-white'>Create Ticket</Link>
          </button>
        </div>
        
      </nav>
      <Suspense fallback={<Loading/>}>
        <TicketList/>
      </Suspense>
    </main>
  )
}
