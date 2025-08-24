import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import type { SharedData } from '@/types';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    return (
        <AppShell>
            <Head title="Dashboard - Jurnal Pengembaraan" />
            
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50 dark:from-emerald-950 dark:via-sky-950 dark:to-amber-950">
                <div className="container mx-auto px-6 py-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-100 mb-2">
                                🏠 Welcome back, {user?.name}!
                            </h1>
                            <p className="text-emerald-600 dark:text-emerald-300">
                                Your expedition management dashboard
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-emerald-100 dark:border-emerald-900">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Your Role</p>
                                        <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-100">
                                            {user?.role === 'admin' ? '👑 Admin' : 
                                             user?.role === 'editor' ? '✏️ Editor' : 
                                             '👁️ Viewer'}
                                        </p>
                                    </div>
                                    <div className="text-3xl">
                                        {user?.role === 'admin' ? '⚙️' : 
                                         user?.role === 'editor' ? '📝' : 
                                         '👀'}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-sky-100 dark:border-sky-900">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Expeditions</p>
                                        <p className="text-2xl font-bold text-sky-800 dark:text-sky-100">View All</p>
                                    </div>
                                    <div className="text-3xl">🏔️</div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-amber-100 dark:border-amber-900">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Documentation</p>
                                        <p className="text-2xl font-bold text-amber-800 dark:text-amber-100">Complete</p>
                                    </div>
                                    <div className="text-3xl">📚</div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-rose-100 dark:border-rose-900">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Community</p>
                                        <p className="text-2xl font-bold text-rose-800 dark:text-rose-100">Active</p>
                                    </div>
                                    <div className="text-3xl">🤝</div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                                <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                                    🚀 Quick Actions
                                </h2>
                                
                                <div className="space-y-4">
                                    <Link
                                        href={route('expeditions.index')}
                                        className="flex items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors duration-200"
                                    >
                                        <div className="text-2xl mr-4">🏔️</div>
                                        <div>
                                            <h3 className="font-medium text-emerald-800 dark:text-emerald-100">
                                                Browse Expeditions
                                            </h3>
                                            <p className="text-sm text-emerald-600 dark:text-emerald-300">
                                                Explore documented mountain adventures
                                            </p>
                                        </div>
                                    </Link>

                                    {(user?.role === 'admin' || user?.role === 'editor') && (
                                        <Link
                                            href={route('expeditions.create')}
                                            className="flex items-center p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors duration-200"
                                        >
                                            <div className="text-2xl mr-4">➕</div>
                                            <div>
                                                <h3 className="font-medium text-sky-800 dark:text-sky-100">
                                                    Create New Expedition
                                                </h3>
                                                <p className="text-sm text-sky-600 dark:text-sky-300">
                                                    Document your next mountain adventure
                                                </p>
                                            </div>
                                        </Link>
                                    )}

                                    <Link
                                        href={route('settings.profile.index')}
                                        className="flex items-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors duration-200"
                                    >
                                        <div className="text-2xl mr-4">⚙️</div>
                                        <div>
                                            <h3 className="font-medium text-amber-800 dark:text-amber-100">
                                                Profile Settings
                                            </h3>
                                            <p className="text-sm text-amber-600 dark:text-amber-300">
                                                Manage your account preferences
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Features Overview */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                                <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                                    ✨ Available Features
                                </h2>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="text-lg mr-3">📋</div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                                Expedition Management
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Create and manage complete expedition documentation
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <div className="text-lg mr-3">🗺️</div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                                Maps & Waypoints
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Track routes with detailed waypoint management
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <div className="text-lg mr-3">📝</div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                                Daily Reports
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Document daily progress and observations
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <div className="text-lg mr-3">📸</div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                                Media Gallery
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Upload photos and embed videos from your adventures
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* User Role Information */}
                        <div className="mt-8 bg-gradient-to-r from-emerald-600 to-sky-600 rounded-xl p-6 text-white">
                            <h2 className="text-xl font-bold mb-4">
                                Your Access Level: {user && typeof user.role === 'string' ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Unknown'}
                            </h2>
                            
                            {user?.role === 'admin' && (
                                <div>
                                    <p className="mb-2">👑 <strong>Admin privileges:</strong></p>
                                    <ul className="list-disc list-inside space-y-1 text-emerald-100">
                                        <li>Full CRUD access to all expeditions</li>
                                        <li>View and manage all user accounts</li>
                                        <li>Access to system administration features</li>
                                        <li>Can publish/unpublish any expedition</li>
                                    </ul>
                                </div>
                            )}
                            
                            {user?.role === 'editor' && (
                                <div>
                                    <p className="mb-2">✏️ <strong>Editor privileges:</strong></p>
                                    <ul className="list-disc list-inside space-y-1 text-emerald-100">
                                        <li>Create and manage your own expeditions</li>
                                        <li>Add daily reports and upload media</li>
                                        <li>Manage waypoints and route information</li>
                                        <li>Collaborate with expedition team members</li>
                                    </ul>
                                </div>
                            )}
                            
                            {user?.role === 'viewer' && (
                                <div>
                                    <p className="mb-2">👁️ <strong>Viewer access:</strong></p>
                                    <ul className="list-disc list-inside space-y-1 text-emerald-100">
                                        <li>Browse and view published expeditions</li>
                                        <li>Access expedition reports and media</li>
                                        <li>View maps and route information</li>
                                        <li>Contact expedition teams for inquiries</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}