class Main {
    private _converter: Converter;
    private _encoderDecoder: EncoderDecoder;
    private _viewController: ViewController;
    private _matrix: Matrix;
    constructor() {
        this._matrix = new Matrix();
        this._encoderDecoder = new EncoderDecoder(this._matrix);
        this._converter = new Converter(this._encoderDecoder)
        this._viewController = new ViewController(this._converter);
    }
}

let main: Main = new Main()