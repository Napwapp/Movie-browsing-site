import { MovieTambahan } from "@/types/MovieTambahan";

export async function fetchMovieTambahan(): Promise<MovieTambahan[]> {
  const res = await fetch("/api/movietambahan");
  if (!res.ok) throw new Error("Gagal mengambil data film tambahan");
  const data = await res.json();
  return data;
}


const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
export async function fetchMovieTambahanById(id: number): Promise<MovieTambahan | null> {
  try {
    const res = await fetch(`${baseURL}/api/movietambahan/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("Gagal fetch data:", err);
    return null;
  }
}