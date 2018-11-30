export class Audio {

    constructor(_id = "", bitrate = 0,
        contentSize = 0, contentURI = "",
        encodingFormat = "", uploadDate = "",
        label = "", duration = 0) {

        this._id = _id;
        this.bitrate = bitrate;
        this.contentSize = contentSize;
        this.contentURI = contentURI;
        this.encodingFormat = encodingFormat;
        this.uploadDate = uploadDate;
        this.duration = duration;
        this.label = label;
    }

    _id: string;
    bitrate: number;
    contentSize: number;
    contentURI: string;
    /* location: { X: { type: Number }, Y: { type: Number } }, */
    encodingFormat: string;
    uploadDate: string;
    duration: number;
    label: string;
    file: File;
}