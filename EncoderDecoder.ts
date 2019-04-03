class EncoderDecoder {
    private _matrix: Array<number>;
    constructor(matrix: Matrix) {
        this._matrix = matrix.defineMatrix()
    }
    public encoder (binaryCode: String): void {
        let fourBitsArray: any = binaryCode.match(/.{1,4}/g)
        let lastElement: String = fourBitsArray[fourBitsArray.length - 1]
        if (lastElement.length < 4) {
            let newLastElement: any = String(lastElement).split('')
            while (newLastElement.length !== 4) {
                newLastElement.unshift('0')
            }
            newLastElement = newLastElement.join('')
            fourBitsArray.pop()
            fourBitsArray.push(newLastElement)
        }
        let encodedBitsArray: Array<number> = [];
        for (let index = 0; index < fourBitsArray.length; index++) {
            let newElement = fourBitsArray[index].split('')
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
                //console.log(rowSum)
                
                if (rowSum % 2 === 1) {
                    //console.log('hi')
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
        console.log(encodedBitsArray)
        this.decoder(encodedBitsArray)
    }
    public decoder (encodedCode: Array<number>): void {

    }
}