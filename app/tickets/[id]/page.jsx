import { notFound } from "next/navigation";

export const dynamicParams = true // default val = true

export async function generateStaticParams() {
  const res = await fetch('http://localhost:4000/tickets')

  const tickets = await res.json()
 
  return tickets.map((ticket) => ({
    id: ticket.id
  }))
}

/**
 * revalidate -> lets say the value is 30
 * before 30 seconds everything will be served from cache,
 * after 30 seconds the first request will be served from cache, but cache will be refreshed
 * the subsequent requests will show the update
 */
const getTickets = async (id) => { 
  await new Promise(resolve => setTimeout(resolve, 1000));

  const res = await fetch( `http://localhost:4000/tickets/${id}` , {
    next: {
      revalidate: 0
    }
  });

  if (!res?.ok) {
    notFound();
  }

  return res.json();
};

const TicketDetails = async ({ params }) => {
  const ticket = await getTickets(params?.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket?.title}</h3>
        <small> Created by: {ticket?.user_email}</small>
        <p>{ticket?.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}

export default TicketDetails;