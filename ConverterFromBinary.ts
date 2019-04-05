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
        if (this._type === 'decimalRadio') {
            this.fromBinaryToDecimal(fourBitsArray)
        }
        else if (this._type === 'stringRadio') {
            this.fromBinaryToString(fourBitsArray)
        } else {
            this._originalData = fourBitsArray
            this._logger.notice(`Далі числа поєднюються конкатенацією: ${fourBitsArray.join('')}`)
        }
    }
    private fromBinaryToDecimal (fourBitsArray: any) {
        let originalData = ''
        for (let fourBitsItem = 0; fourBitsItem < fourBitsArray.length; fourBitsItem++) {
            originalData += parseInt(fourBitsArray[fourBitsItem], 2);
        }
        this._logger.notice(`Далі переводиться з двійкової системи посимвольно назад в десяткову і поєднюється конкатенацією: ${originalData}`)
        this._originalData = originalData;
    }
    private fromBinaryToString (fourBitsArray: any) {
        let decimalArray = []
        let originalData = ''
        let twelveBitsCode = fourBitsArray.join('').match(/.{12}/g)
        this._logger.notice(`Далі дані діляться по 12 бітів ${twelveBitsCode}`)
        for (let i = 0; i < twelveBitsCode.length; i++) {
            originalData += String.fromCharCode(parseInt(twelveBitsCode[i], 2))
            decimalArray.push(parseInt(twelveBitsCode[i], 2))
        }
        this._logger.notice(`Переводиться з двійкового коду у десятковий: ${decimalArray}`)
        this._logger.notice(`І переводяться назад через UTF-12 в символи: ${originalData}`)
        this._originalData = originalData;
    }
}