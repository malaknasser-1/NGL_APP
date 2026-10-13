import multer, { diskStorage } from "multer";

function multerUpload() {
    return multer({
        storage: diskStorage({
            destination: 'uploads',
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        })
    });
}

export function uploadSingleFile(fieldName) {
    return multerUpload().single(fieldName);
}

export function uploadFilesArray(fieldName) {
    return multerUpload().array(fieldName);
}

export function uploadFields(fields) {
    return multerUpload().fields(fields);
}