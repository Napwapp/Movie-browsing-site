import { NextResponse } from "next/server";
import { movieTambahan } from "@/lib/MovieData";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const movie = movieTambahan.find((m) => m.id === id);

  if (!movie) {
    return NextResponse.json({ message: "Movie not found" }, { status: 404 });
  }

  return NextResponse.json(movie);
}
