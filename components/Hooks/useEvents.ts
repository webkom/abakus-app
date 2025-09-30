import { useQuery } from "@tanstack/react-query";
import { Event } from "../../lib/types";

function useEvents() {
  const time = new Date();

  const day = time.getDate();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  const result = useQuery<Event[]>({
    queryKey: ["events", formattedDate], // include date in the key for caching
    queryFn: async () => {
      const res = await fetch(
        `https://lego-staging.abakus.no/api/v1/events/?date_after=${formattedDate}`
      );
      const data = await res.json();
      return data.results as Event[];
    },
  });

  return result;
}

export default useEvents;

