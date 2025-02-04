import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const {query , url} = await req.json()

  const response = await fetch(
    `${url}?query=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/sparql-query",
        Accept: "application/sparql-results+json",
      },
    }
  )

  if (!response.ok) {
    return NextResponse.json(
      { error: `${response.status} - ${response.statusText}` },
      { status: response.status }
    )
  }

  const json = (await response.json())

  return NextResponse.json(json)
}
