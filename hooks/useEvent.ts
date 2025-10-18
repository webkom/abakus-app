import { useQuery } from "@tanstack/react-query";
import { Event } from "../lib/types/types";

function useEvent(id: string) {
  return useQuery<Event>({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await fetch(
        `https://lego-staging.abakus.no/api/v1/events/${id}/`
      );

      if (!res.ok) {
        const text = await res.text();
        console.log("Fetch failed:", res.status, text);
        throw new Error(`Failed to fetch event`);
      }

      const data = await res.json();
      return data; 
    },
  });
}

export default useEvent;
