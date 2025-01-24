import { NextResponse } from "next/server";

export async function OPTIONS() {
  // Handle preflight requests
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST and OPTIONS
        "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow these headers
      },
    }
  );
}

export async function POST(req: Request) {
  const url = process.env.SPARQL_ENDPOINT!;
  
  try {
    // Parse the JSON body
    const { query } = await req.json();

    // Send the request to the SPARQL endpoint
    const response = await fetch(`${url}?query=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/sparql-query",
        Accept: "application/sparql-results+json",
      },
    });

    if (!response.ok) {
      // Return error response
      return NextResponse.json(
        { error: `${response.status} - ${response.statusText}` },
        { status: response.status, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Parse the JSON response
    const json = await response.json();

    // Return the data with CORS headers
    return NextResponse.json(json, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    // Handle errors
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
