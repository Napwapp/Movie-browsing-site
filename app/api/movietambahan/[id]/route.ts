import { NextResponse } from "next/server";
import { movieTambahan } from "@/lib/MovieData";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const movieId = parseInt(id, 10);
  const movie = movieTambahan.find((m) => m.id === movieId);

  if (!movie) {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });
  }

  return NextResponse.json(movie);
}