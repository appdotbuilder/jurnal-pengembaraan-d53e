import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Waypoint {
    id: number;
    name: string;
    type: string;
    description?: string;
    latitude?: number;
    longitude?: number;
}

interface DailyReport {
    id: number;
    report_date: string;
    day_number: number;
    description: string;
    terrain_condition: string;
    important_notes?: string;
    challenges?: string;
    photos?: string[];
}

interface Media {
    id: number;
    type: string;
    file_path?: string;
    video_url?: string;
    title?: string;
    description?: string;
}

interface Expedition {
    id: number;
    title: string;
    subtitle?: string;
    summary: string;
    location: string;
    start_date: string;
    end_date: string;
    duration: number;
    team_members?: string[];
    hero_image?: string;
    main_objectives?: string;
    map_embed_link?: string;
    status: string;
    user: {
        id: number;
        name: string;
    };
    waypoints: Waypoint[];
    daily_reports: DailyReport[];
    media: Media[];
}

interface Props {
    expedition: Expedition;
    [key: string]: unknown;
}

const waypointTypeIcons = {
    start_point: '🚀',
    water_source: '💧',
    camp_location: '⛺',
    danger_point: '⚠️',
    landmark: '🗿',
    end_point: '🏁',
};

const waypointTypeLabels = {
    start_point: 'Start Point',
    water_source: 'Water Source',
    camp_location: 'Camp Location',
    danger_point: 'Danger Point',
    landmark: 'Landmark',
    end_point: 'End Point',
};

export default function ExpeditionShow({ expedition }: Props) {
    return (
        <AppShell>
            <Head title={`${expedition.title} - Jurnal Pengembaraan`} />
            
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50 dark:from-emerald-950 dark:via-sky-950 dark:to-amber-950">
                {/* Hero Section */}
                <div className="relative h-96 bg-gradient-to-r from-emerald-600 to-sky-600">
                    {expedition.hero_image && (
                        <img
                            src={`/storage/${expedition.hero_image}`}
                            alt={expedition.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-6">
                            <div className="max-w-4xl">
                                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                                    {expedition.title}
                                </h1>
                                {expedition.subtitle && (
                                    <p className="text-xl lg:text-2xl text-white/90 mb-6">
                                        {expedition.subtitle}
                                    </p>
                                )}
                                <div className="flex flex-wrap items-center gap-6 text-white/80">
                                    <span className="flex items-center">
                                        📍 {expedition.location}
                                    </span>
                                    <span className="flex items-center">
                                        📅 {new Date(expedition.start_date).toLocaleDateString()} - {new Date(expedition.end_date).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center">
                                        ⏱️ {expedition.duration} days
                                    </span>
                                    <span className="flex items-center">
                                        👤 By {expedition.user.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Summary */}
                            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                                <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                                    📋 Expedition Summary
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {expedition.summary}
                                </p>
                            </section>

                            {/* Main Objectives */}
                            {expedition.main_objectives && (
                                <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                                    <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                                        🎯 Main Objectives
                                    </h2>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {expedition.main_objectives}
                                    </p>
                                </section>
                            )}

                            {/* Daily Reports */}
                            {expedition.daily_reports.length > 0 && (
                                <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                                    <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-100 mb-6">
                                        📝 Daily Reports
                                    </h2>
                                    <div className="space-y-6">
                                        {expedition.daily_reports.map((report) => (
                                            <div key={report.id} className="border-l-4 border-emerald-500 pl-6">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                        Day {report.day_number}
                                                    </h3>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(report.report_date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                                    {report.description}
                                                </p>
                                                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <span className="font-medium text-emerald-600 dark:text-emerald-400">Terrain:</span>
                                                        <span className="ml-2 text-gray-600 dark:text-gray-400">{report.terrain_condition}</span>
                                                    </div>
                                                </div>
                                                {report.important_notes && (
                                                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                                        <span className="font-medium text-yellow-800 dark:text-yellow-200">📌 Important Notes: </span>
                                                        <span className="text-yellow-700 dark:text-yellow-300">{report.important_notes}</span>
                                                    </div>
                                                )}
                                                {report.challenges && (
                                                    <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                                        <span className="font-medium text-red-800 dark:text-red-200">⚡ Challenges: </span>
                                                        <span className="text-red-700 dark:text-red-300">{report.challenges}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Media Gallery */}
                            {expedition.media.length > 0 && (
                                <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                                    <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-100 mb-6">
                                        📸 Media Gallery
                                    </h2>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {expedition.media.map((media) => (
                                            <div key={media.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                                {media.type === 'photo' && media.file_path ? (
                                                    <img
                                                        src={`/storage/${media.file_path}`}
                                                        alt={media.title || 'Expedition photo'}
                                                        className="w-full h-32 object-cover rounded-lg mb-2"
                                                    />
                                                ) : media.type === 'video' && media.video_url ? (
                                                    <div className="w-full h-32 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg flex items-center justify-center mb-2">
                                                        <span className="text-3xl text-white">🎥</span>
                                                    </div>
                                                ) : null}
                                                {media.title && (
                                                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">
                                                        {media.title}
                                                    </h4>
                                                )}
                                                {media.description && (
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                        {media.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Team Members */}
                            {expedition.team_members && expedition.team_members.length > 0 && (
                                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                                        👥 Team Members
                                    </h3>
                                    <ul className="space-y-2">
                                        {expedition.team_members.map((member, index) => (
                                            <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                                                <span className="mr-2">👤</span>
                                                {member}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Waypoints */}
                            {expedition.waypoints.length > 0 && (
                                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                                        🗺️ Route Waypoints
                                    </h3>
                                    <div className="space-y-3">
                                        {expedition.waypoints.map((waypoint) => (
                                            <div key={waypoint.id} className="flex items-start">
                                                <span className="text-lg mr-3">
                                                    {waypointTypeIcons[waypoint.type as keyof typeof waypointTypeIcons] || '📍'}
                                                </span>
                                                <div>
                                                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                                        {waypoint.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {waypointTypeLabels[waypoint.type as keyof typeof waypointTypeLabels] || waypoint.type}
                                                    </p>
                                                    {waypoint.description && (
                                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                                            {waypoint.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Map */}
                            {expedition.map_embed_link && (
                                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                                        🗺️ Route Map
                                    </h3>
                                    <Link
                                        href={expedition.map_embed_link}
                                        target="_blank"
                                        className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-200"
                                    >
                                        🔗 View Map
                                    </Link>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                                    ⚙️ Actions
                                </h3>
                                <div className="space-y-3">
                                    <Link
                                        href={route('expeditions.index')}
                                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200"
                                    >
                                        ← Back to Expeditions
                                    </Link>
                                    <Link
                                        href={route('expeditions.edit', expedition.id)}
                                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-200"
                                    >
                                        ✏️ Edit Expedition
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}