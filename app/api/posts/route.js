import { getSortedPostsData } from "@/lib/serverPosts";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const data = await getSortedPostsData(page);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching posts data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}