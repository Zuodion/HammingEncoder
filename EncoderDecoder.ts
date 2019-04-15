class EncoderDecoder {
    private _matrix: Array<number>;
    private _converterFromBinary: ConverterFromBinary;
    private _introduceError: boolean = false;
    private _introduceDoubleError: boolean = false;
    private _logger: Logger;
    constructor(matrix: Matrix, converterFromBinary: ConverterFromBinary, logger: Logger) {
        this._matrix = matrix.defineMatrix()
        this._converterFromBinary = converterFromBinary
        this._logger = logger
    }

    public defineIntroduceError (introduceError: boolean, introduceDoubleError: boolean): void {
        this._introduceError = introduceError;
        this._introduceDoubleError = introduceDoubleError
    }
    public encoder (binaryCode: string): void {
        let fourBitsArray: any = binaryCode.match(/.{1,4}/g)
        this._logger.notice(`Далі данні діляться на чотирьох бітові символи ${fourBitsArray}`)
        let encodedBitsArray: Array<string> = [];
        for (let quadIndex = 0; quadIndex < fourBitsArray.length; quadIndex++) {
            let newElement: Array<string> = fourBitsArray[quadIndex].split('')
            newElement.splice(0, 0, '0')
            newElement.splice(1, 0, '0')
            newElement.splice(3, 0, '0')

            let sevenBitsString: any = newElement.join('')
            let sevenBitsArray: Array<string> = sevenBitsString.split('')
            for (let matrixRow = 0; matrixRow < this._matrix.length; matrixRow++) {
                let resultMode2: string = (Number('0b' + sevenBitsString.toString(2)) & Number('0b' + this._matrix[matrixRow].toString(2))).toString(2)
                let hvArray: Array<string> = resultMode2.split('')
                let rowSum: number = 0;
                for (let i = 0; i < hvArray.length; i++) {
                    if (hvArray[i] === '1') rowSum++
                }
                if (rowSum % 2 === 1) {
                    switch (matrixRow) {
                        case 0:
                            sevenBitsArray.splice(3, 1, '1')
                            break;
                        case 1:
                            sevenBitsArray.splice(1, 1, '1')
                            break;
                        case 2:
                            sevenBitsArray.splice(0, 1, '1')
                            break;
                    }
                }
            }
            encodedBitsArray.push(sevenBitsArray.join(''))
        }
        this._logger.notice(`Числа кодуються кодом Хемінга ${encodedBitsArray}`)
        if (this._introduceError && !this._introduceDoubleError) {
            this.errorIntroducer(encodedBitsArray)
        } else if (!this._introduceError && this._introduceDoubleError) {
            this.errorDoubleIntroducer(encodedBitsArray)
        } else if (this._introduceError && this._introduceDoubleError) {
            this.errorMixedIntroducer(encodedBitsArray)
        }
        else this.decoder(encodedBitsArray)
    }

    private randomInteger (min: number, max: number): number {
        let randomInt: number = (min - 0.5 + Math.random() * (max - min + 1))
        randomInt = Math.round(randomInt);
        return randomInt;
    }
    private errorIntroducer (encodedCode: any): void {
        let encodedCorruptedCode: Array<string> = [];
        let htmlArray: Array<string> = []
        for (let index = 0; index < encodedCode.length; index++) {
            let encodedCodeArray: Array<string> = encodedCode[index].split('')
            let randomIndex: number = (this.randomInteger(1, 7) - 1)
            encodedCodeArray[randomIndex] = String(Number(!Number(encodedCodeArray[randomIndex])));
            encodedCorruptedCode.push(encodedCodeArray.join(''))

            let htmlElement: string = this._logger.colorizeElement(encodedCodeArray, randomIndex, 'red')
            htmlArray.push(htmlElement)
        }
        this._logger.notice(`Випадковим чином вводяться однобітові помилки: ${htmlArray}`)
        this.decoder(encodedCorruptedCode)
    }

    private errorDoubleIntroducer (encodedCode: any): void {
        let encodedCorruptedCode: Array<string> = [];
        let htmlArray: Array<string> = []
        for (let index = 0; index < encodedCode.length; index++) {
            let encodedCodeArray: Array<string> = encodedCode[index].split('')
            let firstIndex: number = (this.randomInteger(1, 7) - 1)
            encodedCodeArray[firstIndex] = String(Number(!Number(encodedCodeArray[firstIndex])));

            let secondIndex: number = (this.randomInteger(1, 7) - 1)
            while (firstIndex === secondIndex) {
                secondIndex = (this.randomInteger(1, 7) - 1)
            }
            encodedCodeArray[secondIndex] = String(Number(!Number(encodedCodeArray[secondIndex])));
            encodedCorruptedCode.push(encodedCodeArray.join(''))

            let htmlElement: string = this._logger.colorizeElement(encodedCodeArray, firstIndex, 'red')
            htmlElement = this._logger.colorizeElement(encodedCodeArray, secondIndex, 'red')
            htmlArray.push(htmlElement)
        }
        this._logger.notice(`Випадковим чином вводяться двобітові помилки: ${htmlArray}`)
        this.decoder(encodedCorruptedCode)
    }

    private errorMixedIntroducer (encodedCode: any): void {
        let encodedCorruptedCode: Array<string> = [];
        let htmlArray: Array<string> = []
        for (let index = 0; index < encodedCode.length; index++) {
            if (this.randomInteger(1, 2) - 1) {
                let encodedCodeArray: Array<string> = encodedCode[index].split('')
                let firstIndex: number = (this.randomInteger(1, 7) - 1)
                encodedCodeArray[firstIndex] = String(Number(!Number(encodedCodeArray[firstIndex])));

                let secondIndex: number = (this.randomInteger(1, 7) - 1)
                while (firstIndex === secondIndex) {
                    secondIndex = (this.randomInteger(1, 7) - 1)
                }
                encodedCodeArray[secondIndex] = String(Number(!Number(encodedCodeArray[secondIndex])));
                encodedCorruptedCode.push(encodedCodeArray.join(''))

                let htmlElement: string = this._logger.colorizeElement(encodedCodeArray, firstIndex, 'red')
                htmlElement = this._logger.colorizeElement(encodedCodeArray, secondIndex, 'red')
                htmlArray.push(htmlElement)
            } else {
                let encodedCodeArray: Array<string> = encodedCode[index].split('')
                let randomIndex: number = (this.randomInteger(1, 7) - 1)
                encodedCodeArray[randomIndex] = String(Number(!Number(encodedCodeArray[randomIndex])));
                encodedCorruptedCode.push(encodedCodeArray.join(''))

                let htmlElement: string = this._logger.colorizeElement(encodedCodeArray, randomIndex, 'red')
                htmlArray.push(htmlElement)
            }
        }
        this._logger.notice(`Випадковим чином вводяться однократні і двократні помилки: ${htmlArray}`)
        this.decoder(encodedCorruptedCode)
    }

    public decoder (encodedCode: Array<string>): void {
        let htmlArray: Array<string> = []
        let decodedCode: Array<string> = [];

        for (let codeIndex = 0; codeIndex < encodedCode.length; codeIndex++) {
            let sevenBitsCode: any = encodedCode[codeIndex]
            let errorIndex: number = 0;

            // Block correction error
            if (this._introduceError || this._introduceDoubleError) {
                for (let matrixRow = 0; matrixRow < this._matrix.length; matrixRow++) {
                    let resultMode2: string = (Number('0b' + sevenBitsCode.toString(2)) & Number('0b' + this._matrix[matrixRow].toString(2))).toString(2)

                    let hvArray: Array<string> = resultMode2.split('')
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
            let fixedCode: Array<string> = sevenBitsCode.split('')
            if (fixedCode[errorIndex - 1]) {
                fixedCode[errorIndex - 1] = String(Number(!Number(fixedCode[errorIndex - 1])))
            }
            decodedCode.push(fixedCode.join(''))

            let htmlElement: string = this._logger.colorizeElement(fixedCode, errorIndex - 1, 'aqua')
            htmlArray.push(htmlElement)
        }
        if (this._introduceError || this._introduceDoubleError) {
            this._logger.notice(`За допомогою декодування знаходяться помилки і виправляються: ${htmlArray}`)
        }

        let fourBitsArray: Array<string> = [];
        for (let decodedCodeIndex = 0; decodedCodeIndex < decodedCode.length; decodedCodeIndex++) {
            let fourBits: Array<string> = decodedCode[decodedCodeIndex].split('')
            fourBits.splice(0, 1);
            fourBits.splice(0, 1);
            fourBits.splice(1, 1);
            fourBitsArray.push(fourBits.join(''))
        }

        this._logger.notice(`Забирається перевірочна частина ${fourBitsArray}`)
        this._converterFromBinary.convertToOriginalData(fourBitsArray)
    }
}