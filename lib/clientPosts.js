export async function fetchSortedPostsData() {
  try {
    const res = await fetch('/api/posts');
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Fetch error: ', error);
  }
}