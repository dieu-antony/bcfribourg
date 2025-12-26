import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";
import type { CloudinarySearchResult } from "~/lib/types";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const folder = req.query.folder as string;

  if (!folder) {
    return res.status(400).json({ error: "Missing folder" });
  }

  try {
    const data: { public_id: string; folder: string }[] = [];

    const result = (await cloudinary.v2.search
      .expression(`asset_folder:${folder}/*`)
      .execute()) as CloudinarySearchResult;

    result.resources.forEach((asset) => {
      data.push({
        public_id: asset.public_id,
        folder: asset.asset_folder.split("/").pop() ?? "",
      });
    });

    res.status(200).json({ data });
  } catch (err) {
    const error = err instanceof Error ? err : new Error("Unknown Cloudinary error");
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
