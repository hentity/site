export async function fetchSortedPostsData(page = 1) {
  try {
    const res = await fetch(`/api/posts?page=${page}`);
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.statusText);
    }
    const data = await res.json();
    console.log(data);
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