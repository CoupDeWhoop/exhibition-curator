import { http, HttpResponse } from "msw";
import { chicagoHome } from "./data/chicago.data";

export const handlers = [
  http.get("https://api.artic.edu/api/v1/artworks", ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const topic = url.searchParams.get("topic");

    return HttpResponse.json(chicagoHome);
  }),
];
