import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../services/auth-service";

function useEvent(id: number) {
  return useQuery(["event"], async () => {
    const token = await getToken();

    return fetch(`https://lego-staging.abakus.no/api/v1/events/${id}/`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Accept-Language": "nb-NO,nb;q=0.9",
      },
    })
      .then((res) => res.json())
      .then((res) => res);
  });
}
export default useEvent;
