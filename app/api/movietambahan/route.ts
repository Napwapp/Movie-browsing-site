// import { MovieTambahan } from "@/types/MovieTambahan";
// import { movieTambahan } from "@/lib/MovieData";
// import { unlink } from "fs/promises";

import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { prisma } from "@/lib/prisma";
import path from "path";
import { unlink } from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const vote_average = parseFloat(formData.get("vote_average") as string);
    const release_date = formData.get("release_date") as string;
    const overview = formData.get("overview") as string;

    const genreString = formData.get("genres") as string;
    const genres = genreString.split(",").map((g) => g.trim());

    const file = formData.get("poster_path") as File;
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public", "images", "poster-movie", fileName);
    await writeFile(filePath, buffer);

    const newMovie = await prisma.movieTambahan.create({
      data: {
        title,
        vote_average,
        release_date: new Date(release_date),
        overview,
        genres,
        poster_path: `/images/poster-movie/${fileName}`,
      },
    });

    return NextResponse.json({ message: "Film berhasil ditambahkan", data: newMovie });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ message: "Gagal menambahkan film." }, { status: 500 });
  }
}

// Read Movies
export async function GET() {
  try {
    const movies = await prisma.movieTambahan.findMany();
    return NextResponse.json(movies);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ message: "Gagal mengambil data film." }, { status: 500 });
  }
}

// Edit Movies
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, release_date, ...rest } = body;

    const updated = await prisma.movieTambahan.update({
      where: { id },
      data: {
        ...rest,
        release_date: new Date(release_date),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { message: "Gagal mengupdate data film." },
      { status: 500 }
    );
  }
}

// Delete Movie
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const existing = await prisma.movieTambahan.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Film tidak ditemukan" }, { status: 404 });
    }

    const posterPath = path.join(process.cwd(), "public", existing.poster_path || "/images/no-preview-image.webp");
    await prisma.movieTambahan.delete({ where: { id } });

    try {
      await unlink(posterPath);
    } catch (err) {
      console.warn("Gagal menghapus poster:", err);
    }

    return NextResponse.json({ message: "Film berhasil dihapus" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ message: "Gagal menghapus film." }, { status: 500 });
  }
}