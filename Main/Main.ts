class Main {
    private _converterToBinary: ConverterToBinary;
    private _encoderDecoder: EncoderDecoder;
    private _viewController: ViewController;
    private _converterFromBinary: ConverterFromBinary
    private _matrix: Matrix;
    constructor() {
        this._matrix = new Matrix();
        this._converterFromBinary = new ConverterFromBinary()
        this._encoderDecoder = new EncoderDecoder(this._matrix, this._converterFromBinary);
        this._converterToBinary = new ConverterToBinary(this._encoderDecoder)
        this._viewController = new ViewController(this._converterToBinary);
    }
}

let main: Main = new Main()