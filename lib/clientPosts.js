export async function fetchSortedPostsData(page = 1, category = null) {
  try {
    let url = `/api/posts?page=${page}`;
    if (category) {
      url += `&selectedCategory=${category}`;
    }
    
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Fetch error: ', error);
  }
}


export async function fetchCategories() {
  try {
    const res = await fetch('/api/categories');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}