import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Expedition {
    id: number;
    title: string;
    subtitle?: string;
    summary: string;
    location: string;
    start_date: string;
    end_date: string;
    duration: number;
    hero_image?: string;
    status: string;
    user: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
}

interface Props {
    expeditions: {
        data: Expedition[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    [key: string]: unknown;
}

export default function ExpeditionsIndex({ expeditions }: Props) {
    return (
        <AppShell>
            <Head title="Expeditions - Jurnal Pengembaraan" />
            
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50 dark:from-emerald-950 dark:via-sky-950 dark:to-amber-950">
                <div className="px-6 py-8">
                    <div className="mx-auto max-w-7xl">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-100 mb-2">
                                        🏔️ Expeditions
                                    </h1>
                                    <p className="text-emerald-600 dark:text-emerald-300">
                                        Explore documented mountain adventures and expedition reports
                                    </p>
                                </div>
                                <Link
                                    href={route('expeditions.create')}
                                    className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-200"
                                >
                                    ➕ Create Expedition
                                </Link>
                            </div>
                        </div>

                        {/* Expeditions Grid */}
                        {expeditions.data.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {expeditions.data.map((expedition) => (
                                    <div
                                        key={expedition.id}
                                        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-emerald-100 dark:border-emerald-900 hover:shadow-xl transition-shadow duration-200"
                                    >
                                        {/* Hero Image */}
                                        <div className="h-48 bg-gradient-to-r from-emerald-400 to-sky-500 relative">
                                            {expedition.hero_image ? (
                                                <img
                                                    src={`/storage/${expedition.hero_image}`}
                                                    alt={expedition.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-6xl text-white/80">🏔️</span>
                                                </div>
                                            )}
                                            
                                            {/* Status Badge */}
                                            <div className="absolute top-3 right-3">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    expedition.status === 'published' 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                }`}>
                                                    {expedition.status === 'published' ? '✅ Published' : '📝 Draft'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            <div className="mb-3">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
                                                    {expedition.title}
                                                </h3>
                                                {expedition.subtitle && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                        {expedition.subtitle}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Location & Duration */}
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                                                <span className="mr-1">📍</span>
                                                <span className="mr-3">{expedition.location}</span>
                                                <span className="mr-1">⏱️</span>
                                                <span>{expedition.duration} days</span>
                                            </div>

                                            {/* Summary */}
                                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                                                {expedition.summary}
                                            </p>

                                            {/* Meta Info */}
                                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-4">
                                                <span>By {expedition.user.name}</span>
                                                <span>{new Date(expedition.start_date).toLocaleDateString()}</span>
                                            </div>

                                            {/* Action Button */}
                                            <Link
                                                href={route('expeditions.show', expedition.id)}
                                                className="w-full inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                                            >
                                                🔍 View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🏔️</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    No expeditions yet
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Be the first to document a mountain adventure!
                                </p>
                                <Link
                                    href={route('expeditions.create')}
                                    className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-200"
                                >
                                    ➕ Create First Expedition
                                </Link>
                            </div>
                        )}

                        {/* Pagination */}
                        {expeditions.meta.total > expeditions.meta.per_page && (
                            <div className="mt-8 flex justify-center">
                                <nav className="flex items-center space-x-2">
                                    {expeditions.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                                link.active
                                                    ? 'bg-emerald-600 text-white'
                                                    : link.url
                                                    ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900 border border-gray-300 dark:border-gray-600'
                                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}