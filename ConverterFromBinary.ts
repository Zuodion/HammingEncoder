class ConverterFromBinary {
    private _type: string = '';
    private _originalData: string = '';
    private _logger: Logger;
    constructor (logger: Logger){
        this._logger = logger
    }
    public initializeType(type: string){
        this._type = type
    }
    public convertToOriginalData (fourBitsArray: any) {
        this._logger.notice(fourBitsArray, 'The')
        if (this._type === 'decimalRadio') {
            this.fromBinaryToDecimal(fourBitsArray)
        }
        else if (this._type === 'stringRadio') {
            this.fromBinaryToString(fourBitsArray)
        } else {
            this._logger.notice('','')
            this._originalData = fourBitsArray
        }
        console.log(this._originalData)
    }
    private fromBinaryToDecimal (fourBitsArray: any) {
        let originalData = ''
        for (let fourBitsItem = 0; fourBitsItem < fourBitsArray.length; fourBitsItem++) {
            originalData += parseInt(fourBitsArray[fourBitsItem], 2);
        }
        this._originalData = originalData;
    }
    private fromBinaryToString (fourBitsArray: any) {
        let originalData = ''
        let twelveBitsCode = fourBitsArray.join('').match(/.{12}/g)
        console.log(twelveBitsCode)
        for (let i = 0; i < twelveBitsCode.length; i++) {
            originalData += String.fromCharCode(parseInt(twelveBitsCode[i], 2))
        }
        this._originalData = originalData;
    }
}