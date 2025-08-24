import React from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Expedition {
    id: number;
    title: string;
    subtitle?: string;
    summary: string;
    location: string;
    start_date: string;
    end_date: string;
    team_members?: string[];
    hero_image?: string;
    main_objectives?: string;
    map_embed_link?: string;
    status: string;
}

interface Props {
    expedition: Expedition;
    [key: string]: unknown;
}

export default function EditExpedition({ expedition }: Props) {
    const [data, setDataState] = React.useState({
        title: expedition.title,
        subtitle: expedition.subtitle || '',
        summary: expedition.summary,
        location: expedition.location,
        start_date: expedition.start_date,
        end_date: expedition.end_date,
        team_members: expedition.team_members || [],
        hero_image: null as File | null,
        main_objectives: expedition.main_objectives || '',
        map_embed_link: expedition.map_embed_link || '',
        status: expedition.status,
    });

    const [processing, setProcessing] = React.useState(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const setData = (key: string, value: string | string[] | File | null) => {
        setDataState(prev => ({ ...prev, [key]: value }));
    };

    const [teamMemberInput, setTeamMemberInput] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        
        const formData = new FormData();
        formData.append('_method', 'PUT');
        
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'team_members') {
                data.team_members.forEach((member: string, index: number) => {
                    formData.append(`team_members[${index}]`, member);
                });
            } else if (key === 'hero_image' && value instanceof File) {
                formData.append(key, value);
            } else if (value !== null && typeof value === 'string') {
                formData.append(key, value);
            }
        });
        
        router.post(route('expeditions.update', expedition.id), formData, {
            onSuccess: () => setProcessing(false),
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
        });
    };

    const addTeamMember = () => {
        const currentMembers = Array.isArray(data.team_members) ? data.team_members : [];
        if (teamMemberInput.trim() && !currentMembers.includes(teamMemberInput.trim())) {
            setData('team_members', [...currentMembers, teamMemberInput.trim()]);
            setTeamMemberInput('');
        }
    };

    const removeTeamMember = (index: number) => {
        const currentMembers = Array.isArray(data.team_members) ? data.team_members : [];
        setData('team_members', currentMembers.filter((_, i) => i !== index));
    };

    return (
        <AppShell>
            <Head title={`Edit ${expedition.title} - Jurnal Pengembaraan`} />
            
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50 dark:from-emerald-950 dark:via-sky-950 dark:to-amber-950">
                <div className="container mx-auto px-6 py-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-100 mb-2">
                                ✏️ Edit Expedition
                            </h1>
                            <p className="text-emerald-600 dark:text-emerald-300">
                                Update your mountain adventure documentation
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                                <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-100 mb-6">
                                    📋 Basic Information
                                </h2>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Title */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Expedition Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-gray-100"
                                            placeholder="e.g., Mount Rinjani Summit Expedition 2024"
                                        />
                                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                    </div>

                                    {/* Subtitle */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Subtitle
                                        </label>
                                        <input
                                            type="text"
                                            value={data.subtitle}
                                            onChange={e => setData('subtitle', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-gray-100"
                                            placeholder="A brief subtitle for your expedition"
                                        />
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Location *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.location}
                                            onChange={e => setData('location', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-gray-100"
                                            placeholder="e.g., Rinjani National Park, Lombok"
                                        />
                                        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Status
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={e => setData('status', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-gray-100"
                                        >
                                            <option value="draft">📝 Draft</option>
                                            <option value="published">✅ Published</option>
                                        </select>
                                    </div>

                                    {/* Dates */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Start Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={data.start_date}
                                            onChange={e => setData('start_date', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-gray-100"
                                        />
                                        {errors.start_date && <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            End Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={data.end_date}
                                            onChange={e => setData('end_date', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-gray-100"
                                        />
                                        {errors.end_date && <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>}
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Expedition Summary *
                                    </label>
                                    <textarea
                                        value={data.summary}
                                        onChange={e => setData('summary', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-gray-100"
                                        placeholder="Describe your expedition..."
                                    />
                                    {errors.summary && <p className="mt-1 text-sm text-red-600">{errors.summary}</p>}
                                </div>

                                {/* Main Objectives */}
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Main Objectives
                                    </label>
                                    <textarea
                                        value={data.main_objectives}
                                        onChange={e => setData('main_objectives', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-gray-100"
                                        placeholder="What are the main goals and objectives?"
                                    />
                                </div>
                            </div>

                            {/* Team Members */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                                <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-100 mb-6">
                                    👥 Team Members
                                </h2>
                                
                                <div className="mb-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={teamMemberInput}
                                            onChange={e => setTeamMemberInput(e.target.value)}
                                            onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTeamMember())}
                                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-gray-100"
                                            placeholder="Enter team member name"
                                        />
                                        <Button
                                            type="button"
                                            onClick={addTeamMember}
                                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </div>

                                {Array.isArray(data.team_members) && data.team_members.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {data.team_members.map((member, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full text-sm"
                                            >
                                                👤 {member}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTeamMember(index)}
                                                    className="ml-2 text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Media & Map */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                                <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-100 mb-6">
                                    📸 Media & Map
                                </h2>
                                
                                <div className="space-y-6">
                                    {/* Current Hero Image */}
                                    {expedition.hero_image && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Current Hero Image
                                            </label>
                                            <img
                                                src={`/storage/${expedition.hero_image}`}
                                                alt="Current hero"
                                                className="w-32 h-32 object-cover rounded-lg"
                                            />
                                        </div>
                                    )}

                                    {/* Hero Image */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Update Hero Image
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setData('hero_image', e.target.files?.[0] || null)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-gray-100"
                                        />
                                        <p className="mt-1 text-sm text-gray-500">Leave empty to keep current image</p>
                                    </div>

                                    {/* Map Link */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Map/Route Link
                                        </label>
                                        <input
                                            type="url"
                                            value={data.map_embed_link}
                                            onChange={e => setData('map_embed_link', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-gray-100"
                                            placeholder="https://maps.google.com/..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end space-x-4">
                                <Button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                                >
                                    {processing ? 'Updating...' : '💾 Update Expedition'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}