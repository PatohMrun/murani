import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming prisma is instantiated in lib/prisma.ts

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const appId = searchParams.get('appId');
    const version = searchParams.get('version');
    const fileUrl = searchParams.get('fileUrl');

    if (!appId || !version || !fileUrl) {
        return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    try {
        // Increment download count (create the stat record if it doesn't exist)
        await prisma.apkStat.upsert({
            where: {
                appId_version: {
                    appId: appId,
                    version: version,
                }
            },
            update: {
                downloads: { increment: 1 }
            },
            create: {
                appId: appId,
                version: version,
                downloads: 1
            }
        });
    } catch (error) {
        console.error('Failed to log download:', error);
        // We still continue to redirect so the user doesn't fail to download the file
        // just because our database tracking failed.
    }

    // Redirect user to the actual APK file
    return NextResponse.redirect(new URL(fileUrl, request.url));
}
