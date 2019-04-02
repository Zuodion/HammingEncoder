class Main {
    private _converter: Converter;
    private _coderEncoder: CoderEncoder;
    private _errorIntroducer: ErrorIntroducer;
    private _viewController: ViewController;
    constructor() {
        this._converter = new Converter()
        this._coderEncoder = new CoderEncoder();
        this._errorIntroducer = new ErrorIntroducer();
        this._viewController = new ViewController(this._converter);
    }
}

let main: Main = new Main()