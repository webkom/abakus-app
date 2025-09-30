import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../services/auth-service";
import { Event } from "../../lib/types";

function useEvent(id: number) {
  return useQuery<Event>({
    queryKey: ["event", id], // cache per event id
    queryFn: async () => {
      const token = await getToken();

      const res = await fetch(`https://lego-staging.abakus.no/api/v1/events/${id}/`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Accept-Language": "nb-NO,nb;q=0.9",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch event ${id}`);
      }

      return (await res.json()) as Event;
    },
    enabled: !!id, // only fetch if id exists
    staleTime: 1000 * 60 * 5, // optional cache for 5 minutes
  });
}

export default useEvent;

