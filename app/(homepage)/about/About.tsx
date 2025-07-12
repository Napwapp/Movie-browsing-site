import Link from 'next/link';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-9 my-9 border-x-3 border-gray-300">
      <h1 className="text-3xl font-bold text-red-500 mb-6">
        Tentang Movie Browsing App
      </h1>

      <p className="text-gray-700 text-lg mb-4">
        tujuan pembelajaran dalam memahami konsep-konsep dasar pengembangan web
        modern menggunakan Next.js.
      </p>

      <p className="text-gray-700 text-lg mb-4">
        Data-data movie pada website ini diperoleh dari The Movie
        Database (TMDb) API, yang menyediakan informasi lengkap seputar film
        populer, trailer, sinopsis, dan gambar poster berkualitas tinggi. Namun di website ini
        saya tidak mengambil data film series/TV Shows dari API nya.
      </p>

      <p className="text-gray-700 text-lg mb-4">
        Website ini dibangun menggunakan framework{" "}
        <Link href={"https://nextjs.org/"} className="font-medium ">Next.js</Link> versi App Router, yang
        memudahkan proses pembuatan UI, serta
        optimalisasi performa website.
      </p>

      <p className="text-gray-700 text-lg mb-4">
        Untuk tampilan antarmuka website ini, saya menggunakan{" "}
        <Link href={"https://tailwindcss.com/"} className="font-medium ">Tailwind CSS</Link>, sebuah framework
        utility-first CSS yang mempermudah pengembangan UI yang bersih,
        konsisten, dan mobile-friendly.
      </p>

      <p className="text-gray-700 text-lg mb-4">
        Selain itu, pengembangan website ini juga memanfaatkan bantuan dari AI
        seperti <Link href={"https://chat.openai.com/"} className="font-medium ">Chat GPT</Link> dan{" "}
        <Link href={"https://claude.ai/"} className='font-medium '>Claude.AI</Link>, yang
        berperan besar dalam memberikan arahan teknis, menyusun logika program,
        dan membantu dalam debugging.
      </p>

      <p className="text-gray-700 text-lg mb-4">
        Movie Browsing App memiliki beberapa fitur seperti homepage yang menampilkan
        film-film populer, pencarian film berdasarkan judul, halaman detail film
        lengkap dengan beberapa data dari film tersebut. Seperti rating, sinopsis, genre, dll.
      </p>

      <p className="text-gray-700 text-lg mb-4">
        Pengembangan Movie Browsing App merupakan bagian dari latihan untuk meningkatkan
        pemahaman terhadap konsep front-end development dan menjadi salah satu
        proyek portfolio yang dapat ditampilkan dalam kesempatan tertentu.
      </p>

      <p className="text-gray-700 text-lg mb-4">
        Movie Browsing App Ini hanyalah proyek pribadi untuk penyelesaian tugas-tugas dari kelas
        Fullstack Web Programming yang diberikan oleh para mentor kami. dan sebagai bahan latihan saya supaya bisa lebih memahami Framework{" "}
        <Link href={"https://nextjs.org/"} className="font-medium ">Next.js</Link> ini.
      </p>
    </div>
  );
}
