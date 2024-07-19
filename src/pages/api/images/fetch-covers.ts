import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { resources } = await cloudinary.v2.api.resources_by_asset_folder(
      "Cover Images",
      {
          tags: true,
      }
  )
  res.status(200).json({ resources });
}
