const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage();
const bucketName = process.env.GCS_BUCKET_NAME;

async function uploadImage(image, imageId) {
  const bucket = storage.bucket(bucketName);
  const fileName = `${imageId}.jpg`;
  const file = bucket.file(fileName);

  await file.save(image, {
    metadata: { contentType: 'image/jpeg' },
    public: true,
  });

  return `https://storage.googleapis.com/${bucketName}/${file.name}`;
}

module.exports = uploadImage;
