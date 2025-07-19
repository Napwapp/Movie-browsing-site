// app/api/movietambahan/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('API called with ID:', id);
    
    const movieId = parseInt(id, 10);
    
    if (isNaN(movieId)) {
      return NextResponse.json(
        { error: "Invalid ID format" }, 
        { status: 400 }
      );
    }
    
    // Query database menggunakan Prisma
    const movie = await prisma.movieTambahan.findUnique({
      where: {
        id: movieId
      }
    });
    
    console.log('Movie found:', movie);
    
    if (!movie) {
      return NextResponse.json(
        { error: "Movie not found" }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(movie);
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}