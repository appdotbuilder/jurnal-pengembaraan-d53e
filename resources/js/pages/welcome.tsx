import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Jurnal Pengembaraan - Expedition Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=poppins:400,500,600,700" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50 dark:from-emerald-950 dark:via-sky-950 dark:to-amber-950">
                {/* Header */}
                <header className="relative z-10 w-full px-6 py-4">
                    <nav className="mx-auto flex max-w-6xl items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-600 to-sky-600 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🏔️</span>
                            </div>
                            <h1 className="text-xl font-bold text-emerald-800 dark:text-emerald-200">
                                Jurnal Pengembaraan
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-200"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-4 py-2 text-emerald-700 hover:text-emerald-800 font-medium transition-colors duration-200 dark:text-emerald-300 dark:hover:text-emerald-200"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-200"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="relative px-6 py-16 lg:py-24">
                    <div className="mx-auto max-w-6xl text-center">
                        <div className="mb-8">
                            <span className="inline-block text-6xl mb-4">🏔️⛰️🗻</span>
                            <h1 className="text-4xl lg:text-6xl font-bold text-emerald-800 dark:text-emerald-100 mb-6">
                                Document Your
                                <span className="block bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                                    Mountain Adventures
                                </span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-emerald-700 dark:text-emerald-200 max-w-3xl mx-auto leading-relaxed">
                                Comprehensive expedition management for hiking communities, mountain trail managers, and adventure teams.
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <Link
                                href={route('expeditions.index')}
                                className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
                            >
                                🗺️ Explore Expeditions
                            </Link>
                            {auth.user?.role === 'admin' || auth.user?.role === 'editor' ? (
                                <Link
                                    href={route('expeditions.create')}
                                    className="inline-flex items-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white text-lg font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
                                >
                                    ➕ Create Expedition
                                </Link>
                            ) : null}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="px-6 py-16 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="text-3xl lg:text-4xl font-bold text-emerald-800 dark:text-emerald-100 text-center mb-12">
                            Everything You Need for Expedition Management
                        </h2>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-emerald-100 dark:border-emerald-900">
                                <div className="text-4xl mb-4">📋</div>
                                <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-100 mb-2">
                                    Expedition Planning
                                </h3>
                                <p className="text-emerald-600 dark:text-emerald-300">
                                    Complete CRUD operations for expeditions with team management, objectives, and scheduling
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-sky-100 dark:border-sky-900">
                                <div className="text-4xl mb-4">🗺️</div>
                                <h3 className="text-xl font-semibold text-sky-800 dark:text-sky-100 mb-2">
                                    Maps & Routes
                                </h3>
                                <p className="text-sky-600 dark:text-sky-300">
                                    Interactive maps with waypoint management for camps, water sources, and landmarks
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-amber-100 dark:border-amber-900">
                                <div className="text-4xl mb-4">📝</div>
                                <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-100 mb-2">
                                    Daily Reports
                                </h3>
                                <p className="text-amber-600 dark:text-amber-300">
                                    Track daily progress, terrain conditions, challenges, and important observations
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-rose-100 dark:border-rose-900">
                                <div className="text-4xl mb-4">📸</div>
                                <h3 className="text-xl font-semibold text-rose-800 dark:text-rose-100 mb-2">
                                    Media Gallery
                                </h3>
                                <p className="text-rose-600 dark:text-rose-300">
                                    Photo uploads and video embedding from YouTube/Vimeo for comprehensive documentation
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* User Roles Section */}
                <section className="px-6 py-16">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="text-3xl lg:text-4xl font-bold text-emerald-800 dark:text-emerald-100 text-center mb-12">
                            Built for Different User Roles
                        </h2>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-white">👑</span>
                                </div>
                                <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-100 mb-2">Admin</h3>
                                <p className="text-emerald-600 dark:text-emerald-300">
                                    Full CRUD access to all expeditions and user management capabilities
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-white">✏️</span>
                                </div>
                                <h3 className="text-xl font-semibold text-sky-800 dark:text-sky-100 mb-2">Editor</h3>
                                <p className="text-sky-600 dark:text-sky-300">
                                    Expedition team members who can add reports, upload media, and manage logistics
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-white">👁️</span>
                                </div>
                                <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-100 mb-2">Viewer</h3>
                                <p className="text-amber-600 dark:text-amber-300">
                                    Public access to view published expeditions without needing to log in
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-16 bg-gradient-to-r from-emerald-600 to-sky-600">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                            Ready to Document Your Next Adventure?
                        </h2>
                        <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                            Join expedition teams, hiking communities, and trail managers using Jurnal Pengembaraan to document their mountain adventures.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {!auth.user ? (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 text-lg font-semibold rounded-xl hover:bg-emerald-50 transition-colors duration-200"
                                    >
                                        🚀 Get Started Free
                                    </Link>
                                    <Link
                                        href={route('expeditions.index')}
                                        className="inline-flex items-center px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-xl hover:bg-white hover:text-emerald-600 transition-colors duration-200"
                                    >
                                        🔍 Browse Expeditions
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 text-lg font-semibold rounded-xl hover:bg-emerald-50 transition-colors duration-200"
                                >
                                    🏠 Go to Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="px-6 py-8 bg-emerald-900 dark:bg-emerald-950">
                    <div className="mx-auto max-w-6xl text-center">
                        <p className="text-emerald-200">
                            Built with ❤️ for mountain adventurers everywhere
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}