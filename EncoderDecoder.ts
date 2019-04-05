class EncoderDecoder {
    private _matrix: Array<number>;
    private _converterFromBinary: ConverterFromBinary;
    private _introduceError: boolean = false;
    private _logger: Logger;
    constructor(matrix: Matrix, converterFromBinary: ConverterFromBinary, logger: Logger) {
        this._matrix = matrix.defineMatrix()
        this._converterFromBinary = converterFromBinary
        this._logger = logger
    }

    public defineIntroduceError (introduceError: boolean): void {
        this._introduceError = introduceError;
    }
    public encoder (binaryCode: string): void {
        let fourBitsArray: any = binaryCode.match(/.{1,4}/g)
        this._logger.notice(`Далі данні діляться на чотирьох бітові символи ${fourBitsArray}`)
        let encodedBitsArray: Array<string> = [];
        for (let quadIndex = 0; quadIndex < fourBitsArray.length; quadIndex++) {
            let newElement = fourBitsArray[quadIndex].split('')
            newElement.splice(0, 0, '0')
            newElement.splice(1, 0, '0')
            newElement.splice(3, 0, '0')

            newElement = newElement.join('')
            let newElementArray = newElement.split('')
            for (let matrixRow = 0; matrixRow < this._matrix.length; matrixRow++) {
                let result: string = (Number('0b' + newElement.toString(2)) & Number('0b' + this._matrix[matrixRow].toString(2))).toString(2)
                let hvArray: Array<string> = result.split('')
                let rowSum: number = 0;
                for (let i = 0; i < hvArray.length; i++) {
                    if (hvArray[i] === '1') rowSum++
                }

                if (rowSum % 2 === 1) {
                    switch (matrixRow) {
                        case 0:
                            newElementArray.splice(3, 1, '1')
                            break;
                        case 1:
                            newElementArray.splice(1, 1, '1')
                            break;
                        case 2:
                            newElementArray.splice(0, 1, '1')
                            break;
                    }
                }
            }
            encodedBitsArray.push(newElementArray.join(''))
        }
        this._logger.notice(`Числа кодуються кодом Хемінга ${encodedBitsArray}`)
        if (this._introduceError) {
            this.errorIntroducer(encodedBitsArray)
        } else {
            this.decoder(encodedBitsArray)
        }

    }

    private randomInteger (min: number, max: number) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }

    private errorIntroducer (encodedCode: any): void {
        let encodedCorruptedCode: any = [];
        let htmlArray: any = []

        for (let index = 0; index < encodedCode.length; index++) {
            let encodedCodeArray = encodedCode[index].split('')
            let randomIndex = (this.randomInteger(1, 7) - 1)
            encodedCodeArray[randomIndex] = String(Number(!Number(encodedCodeArray[randomIndex])));
            let htmlElement = this._logger.colorizeElement(encodedCodeArray.join(''), randomIndex, 'red')
            htmlArray.push(htmlElement)
            encodedCorruptedCode.push(encodedCodeArray.join(''))
        }
        this._logger.notice(`Випадковим чином вводяться однобітові помилки: ${htmlArray}`)
        this.decoder(encodedCorruptedCode)
    }

    public decoder (encodedCode: Array<string>): void {
        let htmlArray: any = []
        let decodedCode: any = [];

        for (let codeIndex = 0; codeIndex < encodedCode.length; codeIndex++) {
            let sevenBitsCode: any = encodedCode[codeIndex]
            let errorIndex: number = 0;

            // Block correction error
            if (this._introduceError) {
                for (let matrixRow = 0; matrixRow < this._matrix.length; matrixRow++) {
                    let result: string = (Number('0b' + sevenBitsCode.toString(2)) & Number('0b' + this._matrix[matrixRow].toString(2))).toString(2)

                    let hvArray: Array<string> = result.split('')
                    let rowSum: number = 0;

                    for (let i = 0; i < hvArray.length; i++) {
                        if (hvArray[i] === '1') rowSum++
                    }

                    if (rowSum % 2 === 1) {
                        switch (matrixRow) {
                            case 0:
                                errorIndex += 4
                                break;
                            case 1:
                                errorIndex += 2
                                break;
                            case 2:
                                errorIndex += 1
                                break;
                        }
                    }
                }
            }
            let fixedCode = sevenBitsCode.split('')
            if (fixedCode[errorIndex - 1]) {
                fixedCode[errorIndex - 1] = String(Number(!Number(fixedCode[errorIndex - 1])))
            }
            let htmlElement = this._logger.colorizeElement(fixedCode.join(''), errorIndex - 1, 'aqua')
            htmlArray.push(htmlElement)


            decodedCode.push(fixedCode.join(''))


        }
        if (this._introduceError) {
            this._logger.notice(`За допомогою декодування знаходяться помилки і виправляються: ${htmlArray}`)
        }

        let fourBitsArray = [];
        for (let decodedCodeIndex = 0; decodedCodeIndex < decodedCode.length; decodedCodeIndex++) {
            let fourBits: any = decodedCode[decodedCodeIndex].split('')
            fourBits.splice(0, 1);
            fourBits.splice(0, 1);
            fourBits.splice(1, 1);
            fourBitsArray.push(fourBits.join(''))
        }
        this._logger.notice(`Забирається перевірочна частина ${fourBitsArray}`)
        this._converterFromBinary.convertToOriginalData(fourBitsArray)
    }
}