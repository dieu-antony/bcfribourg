import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';
import { SearchResult } from '~/lib/types';


// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { resources } = await cloudinary.v2.search
        .expression("resource_type:image")
        .sort_by("created_at", "desc")
        .with_field("tags")
        .max_results(100)
        .execute() as { resources: SearchResult[] };
    res.status(200).json({ resources });
}