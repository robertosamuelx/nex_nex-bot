const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const { DateTime } = require('luxon')


const s3 = multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
        const fileName = file.originalname
        cb(null,fileName)
    }
})

const options = {
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    storage: s3,
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
        ]

        if(allowedMimes.includes(file.mimetype))
            cb(null, true)

        else
            cb(new Error('Invalid file type '+file.mimetype))
    }
}

module.exports = options