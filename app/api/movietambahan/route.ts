import { MovieTambahan } from "@/types/MovieTambahan";
import { writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { movieTambahan } from "@/lib/MovieData";

// Add Movies
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const vote_average = parseFloat(formData.get("vote_average") as string);
    const release_date = formData.get("release_date") as string;
    const genreString = formData.get("genres") as string;
    const genres = genreString.split(",").map((name) => ({ name: name.trim() }));
    const overview = formData.get("overview") as string;

    const file = formData.get("poster_path") as File;
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(
      process.cwd(),
      "public",
      "images",
      "poster-movie",
      fileName
    );
    await writeFile(filePath, buffer);

    const newMovie: MovieTambahan = {
      id: Date.now(),
      title,
      vote_average,
      release_date,
      overview,
      genres,
      poster_path: `/images/poster-movie/${fileName}`,
    };

    movieTambahan.push(newMovie);

    return NextResponse.json({
      message: "Film berhasil ditambahkan",
      data: newMovie,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { message: "Gagal menambahkan film di server." },
      { status: 500 }
    );
  }
}

// Read Movies
export async function GET() {
  return NextResponse.json(movieTambahan);
}

// Edit Movies
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updatedData } = body;

    const index = movieTambahan.findIndex((movie) => movie.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    movieTambahan[index] = { ...movieTambahan[index], ...updatedData };

    return NextResponse.json({ message: "Movie updated", data: movieTambahan[index] });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { message: "Gagal mengedit film di server." },
      { status: 500 }
    );
  }
}

