class EncoderDecoder {
    private _matrix: Array<number>;
    private _converterFromBinary: ConverterFromBinary;
    private _type: string = '';
    constructor(matrix: Matrix, converterFromBinary: ConverterFromBinary) {
        this._matrix = matrix.defineMatrix()
        this._converterFromBinary = converterFromBinary
    }
    public encoder (binaryCode: string, type: string): void {
        this._type = type
        let fourBitsArray: any = binaryCode.match(/.{1,4}/g)
        let lastElement: string = fourBitsArray[fourBitsArray.length - 1]
        if (lastElement.length < 4) {
            let newLastElement: any = String(lastElement).split('')
            while (newLastElement.length !== 4) {
                newLastElement.unshift('0')
            }
            newLastElement = newLastElement.join('')
            fourBitsArray.pop()
            fourBitsArray.push(newLastElement)
        }
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
        this.errorIntroducer(encodedBitsArray)
    }

    private randomInteger (min: number, max: number) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }

    private errorIntroducer (encodedCode: any): void {
        let encodedCorruptedCode: any = [];
        for (let index = 0; index < encodedCode.length; index++) {
            let encodedCodeArray = encodedCode[index].split('')
            let randomIndex = this.randomInteger(1, 7) - 1
            encodedCodeArray[randomIndex] = String(Number(!Number(encodedCodeArray[randomIndex])));
            encodedCorruptedCode.push(encodedCodeArray.join(''))
        }
        this.decoder(encodedCorruptedCode)
    }

    public decoder (encodedCode: Array<string>): void {
        
        let decodedCode: any = [];
        for (let codeIndex = 0; codeIndex < encodedCode.length; codeIndex++) {
            let sevenBitsCode: any = encodedCode[codeIndex]
            let errorIndex: number = 0;
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
            let fixedCode = sevenBitsCode.split('')
            if (fixedCode[errorIndex - 1]) {
                fixedCode[errorIndex - 1] = String(Number(!Number(fixedCode[errorIndex - 1])))
            }
            decodedCode.push(fixedCode.join(''))
        }
        let fourBitsArray = [];
        for (let decodedCodeIndex = 0; decodedCodeIndex < decodedCode.length; decodedCodeIndex++) {
            let fourBits: any = decodedCode[decodedCodeIndex].split('')
            fourBits.splice(0, 1);
            fourBits.splice(0, 1);
            fourBits.splice(1, 1);
            fourBitsArray.push(fourBits.join(''))
        }
        this._converterFromBinary.convertToOriginalData(fourBitsArray, this._type)
    }
}