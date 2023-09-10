import { getSortedPostsData } from "@/lib/serverPosts";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const data = await getSortedPostsData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching posts data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}