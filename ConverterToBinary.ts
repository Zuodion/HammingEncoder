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
        this._logger.notice(`Було введено: ${inputData}`)

        this._inputData = inputData
        this._type = type

        if (inputData === '') return alert('Будь ласка введіть число або строку')

        if (type === 'decimalRadio') {
            if (!Number(inputData)) return alert('Вам потрібно ввести десяткове число або змінити тип даних');
            this.fromDecimalToBinary()
        } else if (type === 'stringRadio') {
            if (Number(inputData)) return alert('Вам потрібно ввести текст або змінити тип даних');
            this.fromStringToBinary()
        } else {
            if (!Number('0b' + inputData)) return alert('Вам потрібно ввести двійкове число')
            if (inputData.length % 4 !== 0) return alert('Довжина двійкового числа мусить бути кратним чотирьом')
        }

        this._logger.notice(`Далі все передається у вигляді двійкового коду на кодер ${this._inputData}`)

        this._encoderDecoder.encoder(this._inputData)
    }

    private fromDecimalToBinary (): void {
        let binaryString: string = '';
        let binaryArray: Array<string> = []
        for (let i = 0; i < this._inputData.length; i++) {
            let fourBitsString: string = (Number(this._inputData[i]).toString(2))
            if (fourBitsString.length < 4) {
                let fourBitsArray: any = String(fourBitsString).split('')
                while (fourBitsArray.length !== 4) {
                    fourBitsArray.unshift('0')
                }
                fourBitsString = fourBitsArray.join('')
            }
            binaryArray.push(fourBitsString)
            binaryString += fourBitsString
        }
        this._logger.notice(`Десяткове число поциферно переводиться в чотирьохбітовий двійковий код: ${binaryArray}`)
        this._inputData = binaryString;
    }

    private fromStringToBinary (): void {
        let binaryArray: Array<String> = []
        let decimalArray: Array<Number> = []
        for (let i = 0; i < this._inputData.length; i++) {
            let decimalCode = this._inputData.charCodeAt(i)
            decimalArray.push(decimalCode)
            let binaryString = decimalCode.toString(2)
            if (binaryString.length < 12) {
                let newBinaryString: any = String(binaryString).split('')
                while (newBinaryString.length !== 12) {
                    newBinaryString.unshift('0')
                }
                newBinaryString = newBinaryString.join('')
                binaryArray.push(newBinaryString)
            }
        }
        this._logger.notice(`Кожен символ переводиться в десяткову систему по юнікоду-12: ${decimalArray}`)
        this._logger.notice(`Потім кожне десяткове число переводиться у двійкову: ${binaryArray}`)
        this._inputData = binaryArray.join('')
    }
}