class ConverterToBinary {
    private _inputData: any;
    private _type: string = '';
    private _encoderDecoder: EncoderDecoder;
    private _logger: Logger;
    constructor(encoderDecoder: EncoderDecoder, logger: Logger) {
        this._encoderDecoder = encoderDecoder
        this._logger = logger
    }
    public initializeConverter (inputData: string, type: string): void {
        this._inputData = inputData
        this._type = type
        if (this._inputData === '') return alert('Please enter the number or string')
        if (this._type === 'decimalRadio') {
            if (!Number(this._inputData)) {
                return alert('You should enter the decimal number or change the data type');
            }
            this.fromDecimalToBinary()
        } else if (this._type === 'stringRadio') {
            if (Number(this._inputData)) return alert('You should enter the string or change the data type');
            this.fromStringToBinary()
        } else {
            if (this._inputData.length%4 !== 0) return alert('You should enter the binary number multiple to 4')
        }
        console.log(this._inputData)
        this._encoderDecoder.encoder(this._inputData)
    }
    private fromDecimalToBinary (): void {
        let binary: string = '';
        for (let i = 0; i < this._inputData.length; i++) {
            let fourBitsNumber: string = (Number(this._inputData[i]).toString(2))
            if (fourBitsNumber.length < 4) {
                let fourBitsArray: any = String(fourBitsNumber).split('')
                while (fourBitsArray.length !== 4) {
                    fourBitsArray.unshift('0')
                }
                fourBitsNumber = fourBitsArray.join('')
            }
            binary += fourBitsNumber
        }
        this._inputData = binary;
    }
    private fromStringToBinary (): void {
        let binaryArray: Array<String> = []
        let decimalArray: Array<Number> = []
        for (let i = 0; i < this._inputData.length; i++) {
            let decimalCode = this._inputData.charCodeAt(i)
            decimalArray.push(decimalCode)
            let binaryCode = decimalCode.toString(2)
            if (binaryCode.length < 12) {
                let newBinaryCode: any = String(binaryCode).split('')
                while (newBinaryCode.length !== 12) {
                    newBinaryCode.unshift('0')
                }
                newBinaryCode = newBinaryCode.join('')
                binaryArray.push(newBinaryCode)
            }
        }
        console.log(decimalArray)
        this._inputData = binaryArray.join('')
    }
}