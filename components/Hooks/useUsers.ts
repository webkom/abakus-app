import { useQuery } from "@tanstack/react-query";
import { User } from "../../lib/types";
import { getToken } from "../../services/auth-service";

function useLoggedInUser() {
  return useQuery<User>({
    queryKey: ["user"], // unique cache key
    queryFn: async () => {
      const token = await getToken();

      const res = await fetch(`https://lego-staging.abakus.no/api/v1/users/me/`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Accept-Language": "nb-NO,nb;q=0.9",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch logged-in user");
      }

      return (await res.json()) as User;
    },
    staleTime: 1000 * 60 * 5, // optional cache 5 minutes
    refetchOnWindowFocus: true, // optional
  });
}

export default useLoggedInUser;

