import { server } from "@/mocks/server";
import { http } from "msw";
import fetchArtworks from "../fetchArtworks";

describe("fetchArtworks lib function", () => {
  it("should return the correct chicago object", async () => {
    const chicagoResponse = await fetchArtworks(
      `https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,thumbnail,date_display,artist_title&limit=20`,
      "chicago"
    );
    expect(Array.isArray(chicagoResponse?.data)).toBe(true);

    if (Array.isArray(chicagoResponse?.data)) {
      expect(chicagoResponse.data.length).toBe(20);

      console.log(chicagoResponse.data);
      chicagoResponse.data.forEach((artwork) => {
        expect(artwork).toMatchObject({
          id: expect.any(Number),
          title: expect.toBeOneOf([expect.any(String), null, undefined]),
          imageUrl: expect.toBeOneOf([expect.any(String), null, undefined]),
          altText: expect.toBeOneOf([expect.any(String), null, undefined]),
          dateDisplay: expect.toBeOneOf([expect.any(String), null, undefined]),
          artistTitle: expect.toBeOneOf([expect.any(String), null, undefined]),
        });
      });
    }
  });
});
