import { useLoaderData, json } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  // const events = useLoaderData();
  const data = useLoaderData();

  // if(data.isError){
  //   return <p>{data.message}</p>
  // }
  const events = data.events;
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;



export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (response.ok) {
    // const resData = await response.json();
    // return resData.events;
    return response;
  } else {
    // return { isError: true, message: "Could not fetch an event" };
    return json({ message: "Could not fetch an event" }, { status: 500 });
  }
}
