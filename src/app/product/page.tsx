"use client"

import { useState, useEffect } from "react"
import { fetchJoke } from "./action"
import { useQuery } from "@tanstack/react-query"

interface Data {
  message: string
}

export default function ProductPage() {
  // const [data, setData] = useState<Data | null>(null)
  // const [error, setError] = useState<string | null>(null)
  // const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string>("")
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true)
  //     setError(null)
  //     try {
  //       const result = await fetchJoke()
  //       if (result instanceof Error) {
  //         throw result
  //       }
  //       setData(result)
  //     } catch (err: any) {
  //       setError(err.message || "An unexpected error occurred.")
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchData()
  // }, [])
  const { data, error, isLoading, isError } = useQuery<Data, Error>({
    queryKey: ["joke"],
    queryFn: fetchJoke,
  })
  // Set Cookie
  const setCookie = async () => {
    try {
      const response = await fetch("http://localhost:4000/setCookie", {
        method: "POST",
        credentials: "include", // Include credentials for cross-origin cookies
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorDetails = await response.json().catch(() => null)
        throw new Error(errorDetails?.message || "Failed to set cookie.")
      }

      const result = await response.json()
      setMessage(result.message)
    } catch (err: any) {
      setMessage(err.message || "Failed to set cookie.")
    }
  }

  // Delete Cookie
  const deleteCookie = async () => {
    try {
      const response = await fetch("http://localhost:4000/deleteCookie", {
        method: "POST",
        credentials: "include", // Include credentials for cross-origin cookies
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorDetails = await response.json().catch(() => null)
        throw new Error(errorDetails?.message || "Failed to delete cookie.")
      }

      const result = await response.json()
      setMessage(result.message)
    } catch (err: any) {
      setMessage(err.message || "Failed to delete cookie.")
    }
  }

  return (
    <div>
      {/* Show loading indicator */}
      {isLoading && <div style={{ color: "gray" }}>Loading...</div>}

      {/* Show error message */}
      {isError && <div style={{ color: "red" }}>{error.message}</div>}

      {/* Show fetched data */}
      {!isLoading && data && (
        <div style={{ color: "black" }}>Data: {data.message}</div>
      )}

      {/* Buttons for setting and deleting cookies */}
      <button onClick={setCookie} style={{ marginRight: "10px" }}>
        Set Cookie
      </button>
      <button onClick={deleteCookie}>Delete Cookie</button>

      {/* Show response message */}
      {message && (
        <div style={{ marginTop: "10px", color: "blue" }}>{message}</div>
      )}
    </div>
  )
}
