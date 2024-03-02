// this is a server component

import Link from "next/link";

/**
 * revalidate -> lets say the value is 30
 * before 30 seconds everything will be served from cache,
 * after 30 seconds the first request will be served from cache, but cache will be refreshed
 * the subsequent requests will show the update
 */
const getTickets = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const res = await fetch('http://localhost:4000/tickets', {
    next: {
      revalidate: 0
    }
  });

  return res.json();
};

const TicketList = async () => {
  const tickets = await getTickets()

  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket?.id}`}>
          <h3>{ticket.title}</h3>
          <p>{ticket.body.slice(0, 200)}...</p>
          <div className={`pill ${ticket.priority}`}>
            {ticket.priority} priority
          </div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  )
};

export default TicketList;
