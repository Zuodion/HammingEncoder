class ConverterFromBinary {
    private _type: string = '';
    private _originalData: string = '';
    public convertToOriginalData (fourBitsArray: any, type: string) {
        this._type = type
        if (this._type === 'numberRadio') {
            this.fromBinaryToNumber(fourBitsArray)
        }
        else {
            this.fromBinaryToString(fourBitsArray)
        }
        console.log(this._originalData)
    }
    private fromBinaryToNumber (fourBitsArray: any) {
        let originalData = ''
        for (let fourBitsItem = 0; fourBitsItem < fourBitsArray.length; fourBitsItem++) {
            originalData += parseInt(fourBitsArray[fourBitsItem], 2);
        }
        this._originalData = originalData;
    }
    private fromBinaryToString (fourBitsArray: any) {
        let originalData = ''
        let twelveBitsCode = fourBitsArray.join('').match(/.{12}/g)
        for (let i = 0; i < twelveBitsCode.length; i++) {
            originalData += String.fromCharCode(parseInt(twelveBitsCode[i], 2))
        }
        this._originalData = originalData;
    }
}