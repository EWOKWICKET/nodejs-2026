// Automatically reads CLOUDINARY_URL from environment
import { v2 as cloudinary } from 'cloudinary';

const avatarsFolder = 'avatars';

export function uploadToCloudinary(buffer: Buffer, publicId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: avatarsFolder, public_id: publicId, overwrite: true, resource_type: 'image' },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result.secure_url);
        },
      )
      .end(buffer);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(`${avatarsFolder}/${publicId}`);
}
