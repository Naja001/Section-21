import { json, useRouteLoaderData, redirect } from "react-router-dom";
import EventItem from "../components/EventItem.js";
export default function EventDetailPage() {
  const data = useRouteLoaderData("event-details");

  return (
    <>
      <EventItem event={data.event} />
    </>
  );
}

export async function loader({ request, params }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);

  if (response.ok) {
    return response;
  } else {
    throw json(
      { message: "Couldnt fetch detail for selected event" },
      { status: 500 }
    );
  }
}

export async function action({ params, request }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Couldnt delete  selected event" }, { status: 500 });
  }

  return redirect("/events");
}
