
export default class FileService {

    static validateCell(header, value) {
        switch (header) {
            case "Full Name":
              return value === undefined ? false : !!value.trim();
                break;
            case "full Name":
                return value === undefined ? false : !!value.trim();
                break;
            case "Email":
                return value === undefined ? false : !!value.trim();
                break;
            case "Phone":
                return value === undefined ? false : !!value.trim();
                break;
            default:
                return true;
        }
    }

    /**
     * @description Convert File
     * @param {string} file
     */
    async convertFIle(str) {
        let data = str.split('\n').map(i => i.split(';'));
        let headers = data.shift();
        let output = data.map(d => {
            let obj;
            obj = {};
            headers.map((h, i) => {
                if (headers[i].includes("\r") || d[i].includes("\r")){
                    headers[i] = headers[i].replace("\r","")
                    d[i] = d[i].replace("\r","");
                }
                if (FileService.validateCell(headers[i], d[i])) {
                    return obj[headers[i]] = d[i];
                } else {
                   throw new Error(`Can not parse a file. Your file is not valid! Field ${headers[i]} is required`)
                }
            });
            return obj;
        });
        return output;
    }

}