class ViewController {
    private _converterToBinary: ConverterToBinary;
    private _type: string = '';
    private _inputData: string = '';
    private _introduceError: boolean = false;
    private _encoderDecoder: EncoderDecoder;
    private _outputField: any;
    private _logger: Logger;
    private _converterFromBinary: ConverterFromBinary;
    constructor(converterToBinary: ConverterToBinary, converterFromBinary: ConverterFromBinary, encoderDecoder: EncoderDecoder, logger: Logger) {
        this._converterToBinary = converterToBinary
        this._converterFromBinary = converterFromBinary
        this._encoderDecoder = encoderDecoder
        this._logger = logger
    }
    public initialize() {
        let inputField = (<HTMLInputElement>document.getElementById('inputData'))
        inputField.addEventListener("keyup", function (event) {
            console.log(event.keyCode)
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("buttonStart")!.click();
            }
        });
    }
    private start (): void {
        let inputField = (<HTMLInputElement>document.getElementById('inputData'))
        this._outputField = document.getElementById('output-field')
        this._logger.setOutputField(this._outputField)
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