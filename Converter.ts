class Converter {
    private _inputData: any;
    private _type: String = '';
    private _encoderDecoder: EncoderDecoder;
    constructor(encoderDecoder: EncoderDecoder){
        this._encoderDecoder = encoderDecoder
    }
    public initializeConverter (inputData: String, type: String): void {
        this._inputData = inputData
        this._type = type
        if (this._inputData === '') return alert('Please enter the number or string')
        if (this._type === 'decimalRadio') {
            if (!Number(this._inputData)){
                return alert('You should enter the number decimal number or change the data type');
            }
            this.fromDecimalToBinary()
        } else if (this._type === 'stringRadio') {
            if (Number(this._inputData)) return alert('You should enter the string or change the data type');
            this.fromStringToBinary()
        } else {
            if(!Number('0b' + this._inputData)) return alert('Please enter the binary number or change the data type')
        }
        this._encoderDecoder.encoder(this._inputData)
    }
    private fromDecimalToBinary (): void {
        this._inputData = Number(this._inputData).toString(2)
    }
    private fromStringToBinary (): void {
        let binaryArray:Array<String> = []
        for (let i = 0; i < this._inputData.length; i++) {
            let decimalCode = this._inputData.charCodeAt(i)
            console.log(decimalCode)
            let binaryCode = decimalCode.toString(2)
            console.log(binaryCode)
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