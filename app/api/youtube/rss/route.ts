import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';
import content from '@/data/content.json';
import { Video } from '@/types';

// Cache revalidation time (1 hour)
export const revalidate = 3600;

export async function GET() {
  try {
    const RSS_URL = content.youtube.rssUrl;

    const response = await fetch(RSS_URL, { next: { revalidate: 3600 } } as any);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
    }

    const xmlText = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    
    const xmlData = parser.parse(xmlText);
    
    // Check if feed entry exists and is an array or single object
    const entries = xmlData.feed?.entry || [];
    const entriesArray = Array.isArray(entries) ? entries : [entries];

    const videos: Video[] = entriesArray.map((entry: any) => {
      const videoId = entry['yt:videoId'];
      return {
        id: videoId,
        title: entry.title,
        link: `https://www.youtube.com/watch?v=${videoId}`,
        // YouTube RSS doesn't always give a high-res thumbnail in a clean way, 
        // constructing it manually is reliable for standard video IDs.
        thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        pubDate: entry.published,
      };
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error("Error fetching YouTube RSS:", error);
    return NextResponse.json({ error: 'Failed to load videos' }, { status: 500 });
  }
}