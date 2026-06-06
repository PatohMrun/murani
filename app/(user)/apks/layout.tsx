import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Android App Releases | Murani',
    description: 'Download the latest Android applications including Freqvox, a premium offline-first music player featuring dynamic synthwave theming and gapless playback.',
    openGraph: {
        title: 'Android App Releases | Murani',
        description: 'Download premium Android applications directly. Discover Freqvox, the offline-first music player.',
        siteName: 'Murani',
        images: [
            {
                url: '/assets/FV_White_Compact.svg',
                width: 800,
                height: 600,
                alt: 'Freqvox Android App Logo',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Android App Releases | Murani',
        description: 'Download the latest Android applications including Freqvox, a premium offline-first music player.',
        images: ['/assets/FV_White_Compact.svg'],
    },
};

export default function APKsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
