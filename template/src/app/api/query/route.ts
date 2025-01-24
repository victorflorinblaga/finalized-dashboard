import { NextResponse } from "next/server";

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

export async function POST(req: Request) {
  const url = process.env.SPARQL_ENDPOINT;
  if (!url) {
    console.error("SPARQL_ENDPOINT is not set.");
    return NextResponse.json(
      { error: "SPARQL_ENDPOINT environment variable is not defined." },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }

  try {
    const body = await req.json();
    if (!body.query) {
      console.error("Query parameter missing from request body.");
      return NextResponse.json(
        { error: "Query parameter is required." },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const { query } = body;
    console.log("Received query:", query);

    const response = await fetch(`${url}?query=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/sparql-query",
        Accept: "application/sparql-results+json",
      },
    });

    if (!response.ok) {
      console.error("Error from SPARQL endpoint:", response.status, response.statusText);
      return NextResponse.json(
        { error: `${response.status} - ${response.statusText}` },
        { status: response.status, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const json = await response.json();
    console.log("SPARQL endpoint response:", json);

    return NextResponse.json(json, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
