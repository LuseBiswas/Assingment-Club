export const fetchContests = async () => {
  const cachedContests = localStorage.getItem("contests");
  if (cachedContests) {
    return JSON.parse(cachedContests);
  }

  try {
    const response = await fetch("https://codeforces.com/api/contest.list");
    const data = await response.json();

    // Cache the data
    localStorage.setItem("contests", JSON.stringify(data.result));

    return data.result;
  } catch (err) {
    console.error("Error fetching contests:", err);
    return [];  // Return an empty array in case of an error
  }
};