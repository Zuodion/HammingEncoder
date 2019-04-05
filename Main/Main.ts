class Main {
    private _matrix: Matrix = new Matrix();
    private _logger = new Logger();
    private _converterFromBinary: ConverterFromBinary = new ConverterFromBinary(this._logger)
    private _encoderDecoder = new EncoderDecoder(this._matrix, this._converterFromBinary, this._logger);
    private _converterToBinary: ConverterToBinary  = new ConverterToBinary(this._encoderDecoder, this._logger);
    private _viewController: ViewController = new ViewController(this._converterToBinary, this._converterFromBinary, this._encoderDecoder, this._logger);
    public initialize(){
        let inputField = (<HTMLInputElement>document.getElementById('inputData'))
        inputField.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("buttonStart")!.click();
            }
        });
    }
}

let main: Main = new Main()
main.initialize()
