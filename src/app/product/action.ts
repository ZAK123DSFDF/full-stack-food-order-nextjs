export async function fetchJoke() {
  try {
    const response = await fetch("http://localhost:4000", {
      method: "GET",
      credentials: "include",
    })
    if (!response.ok) {
      const errorDetails = await response.json()
      throw new Error(errorDetails?.message || "Failed to fetch data.")
    }
    return await response.json()
  } catch (err: any) {
    throw new Error(err)
  }
}
