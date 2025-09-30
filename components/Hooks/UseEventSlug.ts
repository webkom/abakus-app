import { useQuery } from "@tanstack/react-query";
import { EventSlug } from "../../lib/types";
import { getToken } from "../../services/auth-service";

function useEventSlug(slug: string) {
  return useQuery<EventSlug>({
    queryKey: ["event", slug], // unique cache per slug
    queryFn: async () => {
      const token = await getToken();

      const res = await fetch(`https://lego-staging.abakus.no/api/v1/events/${slug}/`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Accept-Language": "nb-NO,nb;q=0.9",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch event slug: ${slug}`);
      }

      return (await res.json()) as EventSlug;
    },
    refetchOnWindowFocus: true, // ✅ same as your v4 option
    staleTime: 0,
    enabled: !!slug, // only fetch if slug exists
  });
}

export default useEventSlug;
