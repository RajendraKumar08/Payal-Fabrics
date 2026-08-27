import { v2 as cloudinary } from 'cloudinary'

// cloudinary config

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


export const uploadImageToCloudinary = (fileBuffer: Buffer): Promise<string> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'image',
                folder: 'payal_fabrics_img',
                format: 'webp', // Convert all images to WebP for better compression
                transformation: [
                    { width: 1920, crop: 'limit' }, // Resize if larger than 1920px width
                    { quality: 'auto' } // Automatically compress the image
                ],
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result?.secure_url || '');
            }
        );
        uploadStream.end(fileBuffer);
    });
};