class ConverterToBinary {
    private _inputData: any;
    private _type: string = '';
    private _encoderDecoder: EncoderDecoder;
    constructor(encoderDecoder: EncoderDecoder) {
        this._encoderDecoder = encoderDecoder
    }
    public initializeConverter (inputData: string, type: string): void {
        this._inputData = inputData
        this._type = type
        if (this._inputData === '') return alert('Please enter the number or string')
        if (this._type === 'numberRadio') {
            if (!Number(this._inputData)) {
                return alert('You should enter the number or change the data type');
            }
            this.fromNumberToBinary()
        } else {
            if (Number(this._inputData)) return alert('You should enter the string or change the data type');
            this.fromStringToBinary()
        }
        this._encoderDecoder.encoder(this._inputData, this._type)
    }
    private fromNumberToBinary (): void {
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
        for (let i = 0; i < this._inputData.length; i++) {
            let decimalCode = this._inputData.charCodeAt(i)
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
        this._inputData = binaryArray.join('')
    }
}