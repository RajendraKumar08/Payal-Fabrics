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
                resource_type: 'image', // Taaki Cloudinary ise video treat kare
                folder: 'payal_fabrics_img', // Cloudinary folder name
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