-- CreateTable
CREATE TABLE "MovieTambahan" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,
    "vote_average" DOUBLE PRECISION NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "genres" JSONB NOT NULL,
    "overview" TEXT NOT NULL,

    CONSTRAINT "MovieTambahan_pkey" PRIMARY KEY ("id")
);
