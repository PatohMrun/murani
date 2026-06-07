'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAndroid, FaChevronDown, FaHistory } from 'react-icons/fa';
import { MdDownload, MdInfoOutline } from 'react-icons/md';
import Image from 'next/image';

// App releases data structure supporting versioning
type AppRelease = {
    id: string;
    name: string;
    iconUrl?: string;
    iconBg?: string;
    description: string;
    latestRelease: {
        version: string;
        size: string;
        date: string;
        downloadUrl: string;
        whatsNew: string[];
    };
    previousVersions: {
        version: string;
        size: string;
        date: string;
        downloadUrl: string;
    }[];
};

const apps: AppRelease[] = [
    {
        id: 'freqvox',
        name: 'Freqvox',
        iconUrl: '/assets/FV_White_Compact.svg',
        description: 'Frequency + Voice — your library, alive. A premium, offline-first Android music player featuring dynamic dark synthwave theming that reacts to your album art, smart deterministic tagging, and gapless playback.',
        latestRelease: {
            version: '1.32',
            size: '5.8 MB',
            date: 'June 6, 2026',
            downloadUrl: '/apks/Freqvox1.32.apk',
            whatsNew: ['Initial release', 'Performance optimizations']
        },
        previousVersions: []
    }
];

export default function APKsPage() {
    const [expandedApp, setExpandedApp] = useState<string | null>(apps.length > 0 ? apps[0].id : null);
    const [stats, setStats] = useState<Record<string, number>>({});

    React.useEffect(() => {
        fetch('/api/stats')
            .then(res => res.json())
            .then(data => {
                const newStats: Record<string, number> = {};
                data.forEach((stat: { appId: string; downloads: number }) => {
                    newStats[stat.appId] = (newStats[stat.appId] || 0) + stat.downloads;
                });
                setStats(newStats);
            })
            .catch(console.error);
    }, []);

    const toggleExpand = (id: string) => {
        setExpandedApp(expandedApp === id ? null : id);
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-[#0a1014] pt-24 pb-12 font-inter text-gray-900 dark:text-gray-100">
            <div className="container mx-auto px-4 max-w-4xl">
                
                {/* Header Section */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
                    <div>
                        <h1 className="text-3xl font-bold font-oswald text-gray-900 dark:text-white">
                            Android <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Releases</span>
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Direct APK downloads. Enable &quot;Install from Unknown Sources&quot; on your device to install.
                        </p>
                    </div>
                </div>

                {/* Apps List */}
                <div className="grid gap-4">
                    {apps.length > 0 ? (
                        apps.map((app, index) => (
                            <motion.div 
                                key={app.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm"
                            >
                                {/* Compact App Header */}
                                <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shrink-0 relative overflow-hidden shadow-sm ${app.iconUrl ? 'bg-transparent' : (app.iconBg || 'bg-gradient-to-br from-green-400 to-green-600')}`}>
                                            {app.iconUrl ? (
                                                <Image src={app.iconUrl} alt={`${app.name} icon`} fill className="object-cover" />
                                            ) : (
                                                <FaAndroid size={28} />
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h2 className="text-lg font-bold font-oswald">{app.name}</h2>
                                                <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold">
                                                    v{app.latestRelease.version}
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold flex items-center gap-1">
                                                    <MdDownload size={12} />
                                                    {stats[app.id] || 0} {(stats[app.id] || 0) === 1 ? 'Download' : 'Downloads'}
                                                </span>
                                            </div>
                                            <p className={`text-sm text-gray-500 dark:text-gray-400 mt-0.5 ${expandedApp === app.id ? '' : 'line-clamp-1'}`}>
                                                {app.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <a 
                                            href={`/api/download?appId=${app.id}&version=${app.latestRelease.version}&fileUrl=${encodeURIComponent(app.latestRelease.downloadUrl)}`}
                                            className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                                            download
                                        >
                                            <MdDownload size={18} />
                                            Download
                                        </a>
                                        <button 
                                            onClick={() => toggleExpand(app.id)}
                                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                                            aria-label="Toggle details"
                                        >
                                            <FaChevronDown className={`transition-transform duration-300 ${expandedApp === app.id ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded Content (What's New & Version History) */}
                                <AnimatePresence>
                                    {expandedApp === app.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="border-t border-gray-100 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-900/50"
                                        >
                                            <div className="p-4 sm:p-5 flex flex-col md:flex-row gap-6">
                                                
                                                {/* What's New Section */}
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                                                        <MdInfoOutline className="text-purple-500" />
                                                        What&apos;s new in v{app.latestRelease.version}
                                                    </h4>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
                                                        <div className="flex items-center gap-3 mb-2 text-xs font-mono bg-gray-100 dark:bg-gray-800 inline-block px-2 py-1 rounded">
                                                            <span>{app.latestRelease.size}</span>
                                                            <span className="text-gray-300 dark:text-gray-600">|</span>
                                                            <span>{app.latestRelease.date}</span>
                                                        </div>
                                                        <ul className="space-y-1">
                                                            {app.latestRelease.whatsNew.map((feature, i) => (
                                                                <li key={i} className="flex items-start gap-2">
                                                                    <span className="w-1 h-1 rounded-full bg-blue-500 mt-2 shrink-0" />
                                                                    {feature}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Previous Versions Section */}
                                                {app.previousVersions && app.previousVersions.length > 0 && (
                                                    <div className="flex-1 md:border-l md:border-gray-200 md:dark:border-gray-800 md:pl-6 pt-6 md:pt-0 border-t border-gray-200 dark:border-gray-800 md:border-t-0">
                                                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                                                            <FaHistory className="text-blue-500 text-xs" />
                                                            Previous Versions
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {app.previousVersions.map((v, i) => (
                                                                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-sm">
                                                                    <div className="flex flex-col">
                                                                        <span className="font-medium text-gray-900 dark:text-gray-200">v{v.version}</span>
                                                                        <span className="text-xs text-gray-500 dark:text-gray-400">{v.date} • {v.size}</span>
                                                                    </div>
                                                                    <a 
                                                                        href={`/api/download?appId=${app.id}&version=${v.version}&fileUrl=${encodeURIComponent(v.downloadUrl)}`}
                                                                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-xs px-3 py-1.5 rounded bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                                                                        download
                                                                    >
                                                                        Download
                                                                    </a>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                            <p className="text-gray-500 dark:text-gray-400 text-sm">No APKs uploaded yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
