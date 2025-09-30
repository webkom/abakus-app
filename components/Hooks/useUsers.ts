import { useQuery } from "@tanstack/react-query";
import { User } from "../../lib/types";
import { getToken } from "../../services/auth-service";

function useLoggedInUser() {
  const result = useQuery<User>(["user"], async () => {
    const token = await getToken();

    return fetch(`https://lego-staging.abakus.no/api/v1/users/me/`, {
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

  return result;
}

export default useLoggedInUser;
