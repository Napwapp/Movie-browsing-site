export default function CreditsPage() {
  const tech = [
    { name: "Next.js" },
    { name: "Tailwind CSS" },
    { name: "TMDb API" },
    { name: "Lucide React" },
    { name: "TypeScript" },
  ];

  const CodeAssistent = [{ name: "ChatGPT" }, { name: "Claude.AI" }];

  return (
    <>
    <div className="max-w-4xl mx-auto px-9 my-8 border-x-3 border-gray-300 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Credits</h1>
        <p className="text-gray-600 mb-8">
          Berikut ini adalah resource-resource yang digunakan dalam pengembangan
          website Movie Browsing App ini.
        </p>

        {/* Sumber Data */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Sumber Data :
          </h2>
          <p className="text-gray-700">
            Data film, poster, trailer, dan data-data lainnya disediakan oleh:
            <br />
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:underline"
            >
              The Movie Database (TMDb)
            </a>
          </p>
        </section>

        {/* Teknologi */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Teknologi yang Digunakan :
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {tech.map((tech) => (
              <li key={tech.name}>{tech.name}</li>
            ))}
          </ul>
        </section>

        {/* AI Assistant */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Code Assistant :
          </h2>
          <p className="text-gray-700">
            Proyek ini dikembangkan dengan bantuan AI untuk mempercepat
            penulisan kode dan debugging:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
            {CodeAssistent.map((ca) => (
              <li key={ca.name}>{ca.name}</li>
            ))}
          </ul>
        </section>
      </div>
      {/* Note Penutup */}
      <p className="text-gray-500 my-3 py-8 border-t-2 border-gray-400 text-center">
        Movie Browsing App adalah proyek latihan. Semua konten yang ditampilkan
        hanya untuk tujuan pembelajaran dan untuk menyelesaikan tugas-tugas yang
        diberikan sesuai dengan ketentuannya .
      </p>
    </>
  );
}
