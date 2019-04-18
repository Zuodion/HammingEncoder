class ViewController {
    private _converterToBinary: ConverterToBinary;
    private _type: string = '';
    private _inputData: string = '';
    private _introduceError: boolean = false;
    private _introduceDoubleError: boolean = false;
    private _encoderDecoder: EncoderDecoder;
    private _logs: any;
    private _logger: Logger;
    private _converterFromBinary: ConverterFromBinary;
    private _errorStatus: string = 'noError';
    constructor(converterToBinary: ConverterToBinary, converterFromBinary: ConverterFromBinary, encoderDecoder: EncoderDecoder, logger: Logger) {
        this._converterToBinary = converterToBinary
        this._converterFromBinary = converterFromBinary
        this._encoderDecoder = encoderDecoder
        this._logger = logger
    }
    public setViewEvents (): void {
        let inputField = (<HTMLInputElement>document.getElementById('inputData'))
        inputField.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("buttonStart")!.click();
            }
        });

        let randomErrorBlock = (<HTMLInputElement>document.getElementById('randomError'))
        let determinedErrorBlock = (<HTMLInputElement>document.getElementById('determinedError'))

        let noError = (<HTMLInputElement>document.getElementById('noError'))
        let introduceRandomError = (<HTMLInputElement>document.getElementById('introduceRandomError'))
        let introduceDeterminedError = (<HTMLInputElement>document.getElementById('introduceDeterminedError'))

        noError.addEventListener('click', () => {
            randomErrorBlock.style.display = 'none'
            determinedErrorBlock.style.display = 'none'
            this._errorStatus = 'noError'
        })

        introduceRandomError.addEventListener('click', () => {
            randomErrorBlock.style.display = 'block'
            determinedErrorBlock.style.display = 'none'
            this._errorStatus = 'randomError'
        })

        introduceDeterminedError.addEventListener('click', () => {
            randomErrorBlock.style.display = 'none'
            determinedErrorBlock.style.display = 'block'
            this._errorStatus = 'determinedError'
        })
    }

    private start (): void {
        let outputField = (<HTMLDivElement>document.getElementById('outputField'))
        let logs = (<HTMLDivElement>document.getElementById('logs'))
        if (logs) {
            this._logger.counter = 1;
            outputField!.removeChild(logs)
        }
        logs = document.createElement('div')
        logs.id = 'logs'
        this._logs = logs
        outputField!.appendChild(logs)

        let inputField = (<HTMLInputElement>document.getElementById('inputData'))
        this._logger.setOutputField(this._logs)
        let radioButtons: Array<HTMLInputElement> = Array.prototype.slice.call(document.getElementsByName('type'), 0)
        let checked: Array<HTMLInputElement> = radioButtons.filter(radio => radio.checked)
        this._type = checked[0].value
        this._inputData = inputField.value
        if (this._errorStatus === 'randomError') {
            this._introduceError = (<HTMLInputElement>document.getElementById('introduceError')).checked
            this._introduceDoubleError = (<HTMLInputElement>document.getElementById('introduceDoubleError')).checked
        } else {
            this._introduceError = false
            this._introduceDoubleError = false
        }

        let inputError = (<HTMLInputElement>document.getElementById('inputError')).value
        if (!inputError.match(/^[1-7\s,.-]*$/g)) {
            return alert('Будь ласка введіть коректно куди вставити помилку')
        }

        inputError = this.textErrorHandler(inputError)
        if (this._errorStatus !== 'determinedError') inputError = ''
        this._converterFromBinary.initializeType(this._type)
        this._encoderDecoder.defineIntroduceError(this._introduceError, this._introduceDoubleError, inputError)
        this._converterToBinary.initializeConverter(this._inputData, this._type)
    }

    private textErrorHandler (inputError: any) {
        inputError = inputError.replace(/[\s,.]/g, '')
        if (inputError.match(/\d[-]\d/g)) {
            let intervalArray = inputError.match(/\d[-]\d/g)
            let newInputError = ''
            for (let i = 0; i < intervalArray.length; i++) {
                let intervalString = ''
                let begin: any = intervalArray![i][0]
                let end: any = intervalArray![i][2]
                if (begin > end) {
                    begin = end;
                    end = intervalArray![i][0];
                }

                while (!(begin > end)) {
                    intervalString += begin;
                    begin++;
                }
                newInputError += intervalString;
            }

            newInputError += inputError.replace(/\d[-]\d/g, '')

            inputError = newInputError;
        }
        for (let i: any = 0; i < 8; i++) {
            let regex = new RegExp(i, 'g')
            if (!inputError.match(regex)) continue;
            if (inputError.match(regex).length%2 === 0){
                inputError = inputError.replace(regex, '')
            }
        }
        return inputError;
    }
}