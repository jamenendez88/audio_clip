export class Audio {

    constructor(_id = "",
        bitrate = 0,
        contentSize = 0,
        contentURI = "",
        latitude = 0,
        longitude = 0,
        encodingFormat = '',
        uploadDate = '',
        duration = 0,
        label = '') {
        this._id = _id;
        this.bitrate = bitrate;
        this.contentSize = contentSize;
        this.contentURI = contentURI;
        this.latitude = latitude;
        this.longitude = longitude;
        this.encodingFormat = encodingFormat;
        this.uploadDate = uploadDate;
        this.duration = duration;
        this.label = label;
    }

    _id: String;
    bitrate: number;
    contentSize: number;
    contentURI: string;
    latitude: number;
    longitude: number;
    encodingFormat: string;
    uploadDate: string;
    duration: number;
    label: string;
}