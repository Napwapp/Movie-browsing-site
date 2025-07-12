import { Film } from 'lucide-react';

export default function Footer() {
    return (
        <>
            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <Film className="h-6 w-6 text-red-500" />
                            <span className="text-lg font-semibold">MovieApp</span>
                        </div>

                        <div className="text-center md:text-right">
                            <p className="text-gray-400">
                                Powered by{' '}
                                <a
                                    href="https://www.themoviedb.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-500 hover:text-red-400"
                                >
                                    The Movie Database
                                </a>
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                                © 2024 MovieApp. Built with Next.js
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}