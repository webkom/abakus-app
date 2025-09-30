import { useQuery } from "@tanstack/react-query";
import { EventSlug } from "../../lib/types";
import { getToken } from "../../services/auth-service";

function useEventSlug(slug: string) {
  const result = useQuery<EventSlug>(
    ["event"],
    async () => {
      const token = await getToken();

      return fetch(`https://lego-staging.abakus.no/api/v1/events/${slug}/`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Accept-Language": "nb-NO,nb;q=0.9",
        },
      })
        .then((res) => res.json())
        .then((res) => res);
    },
    {
      refetchOnWindowFocus: true, // ✅ added this line
      staleTime: 0,
      cacheTime: 1000 * 60 * 5, // 5 minutes
    }
  );

  return result;
}

export default useEventSlug;
