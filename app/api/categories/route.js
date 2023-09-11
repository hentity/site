import { getCategories } from "@/lib/serverPosts";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const data = await getCategories();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}