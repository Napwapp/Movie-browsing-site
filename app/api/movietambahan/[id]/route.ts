import { NextResponse } from "next/server";
import { movieTambahan } from "@/lib/MovieData";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id, 10);
  const movie = movieTambahan.find((m) => m.id === id);

  if (!movie) {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });
  }

  return NextResponse.json(movie);
}
