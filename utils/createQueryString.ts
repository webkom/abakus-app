export default function createQueryString(params: Record<string, any>): string {
  return Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map((key) => {
      const value = params[key];

      if (Array.isArray(value)) {
        return value
          .map(
            (item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
          )
          .join("&");
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");
}
