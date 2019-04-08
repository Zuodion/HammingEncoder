class ViewController {
    private _converterToBinary: ConverterToBinary;
    private _type: string = '';
    private _inputData: string = '';
    private _introduceError: boolean = false;
    private _encoderDecoder: EncoderDecoder;
    private _logs: any;
    private _logger: Logger;
    private _converterFromBinary: ConverterFromBinary;
    private _outputField: any;
    constructor(converterToBinary: ConverterToBinary, converterFromBinary: ConverterFromBinary, encoderDecoder: EncoderDecoder, logger: Logger) {
        this._converterToBinary = converterToBinary
        this._converterFromBinary = converterFromBinary
        this._encoderDecoder = encoderDecoder
        this._logger = logger
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
        this._introduceError = (<HTMLInputElement>document.getElementById('introduceError')).checked

        this._converterFromBinary.initializeType(this._type)
        this._encoderDecoder.defineIntroduceError(this._introduceError)
        this._converterToBinary.initializeConverter(this._inputData, this._type)
    }
}