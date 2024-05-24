import * as fs from "fs";

const apiUrl = "https://api.artic.edu/api/v1/artworks";

// Function to fetch data from the API and extract unique category titles
async function fetchAndExtractCategories() {
  try {
    let pageNumber = 10;
    let totalPages = 1;
    const uniqueCategories: Set<string> = new Set();

    while (pageNumber <= 20) {
      const response = await fetch(`${apiUrl}?page=${pageNumber}&limit=100`);
      if (!response.ok) {
        console.log(
          `Failed to retrieve data for page ${pageNumber}. Status code: ${response.status}`
        );
        return;
      }

      const data = await response.json();
      const artworks = data.data;
      // Update totalPages if not already set
      if (totalPages === 1) {
        totalPages = data.pagination.total_pages;
      }

      // Extract and store unique category titles
      artworks.forEach((artwork: any) => {
        const categories: string[] = artwork.category_titles || [];
        categories.forEach((category) => uniqueCategories.add(category));
      });

      pageNumber++;
      console.log(pageNumber);
    }
    console.log(uniqueCategories);
  } catch (error) {
    // Write unique category titles to a file
    //   const categoryTitles = Array.from(uniqueCategories);
    //   fs.writeFileSync("category_titles.txt", categoryTitles.join("\n"));
    //   console.log("Category titles saved to category_titles.txt");
    console.error("An error occurred:", error);
  }
}

fetchAndExtractCategories();
