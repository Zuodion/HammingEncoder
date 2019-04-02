"use strict";
var CoderEncoder = /** @class */ (function () {
    function CoderEncoder() {
    }
    return CoderEncoder;
}());
var Converter = /** @class */ (function () {
    function Converter() {
    }
    Converter.prototype.initializeConverter = function (inputData, type) {
        console.log(inputData);
        console.log(type);
    };
    return Converter;
}());
var ErrorIntroducer = /** @class */ (function () {
    function ErrorIntroducer() {
    }
    return ErrorIntroducer;
}());
var ViewController = /** @class */ (function () {
    function ViewController(converter) {
        this.type = '';
        this.inputData = '';
        this._converter = converter;
    }
    ViewController.prototype.start = function () {
        var radioButtons = Array.prototype.slice.call(document.getElementsByName('type'), 0);
        var checked = radioButtons.filter(function (radio) { return radio.checked; });
        this.type = checked[0].value;
        this.inputData = document.getElementById('inputData').value;
        this._converter.initializeConverter(this.inputData, this.type);
    };
    return ViewController;
}());
var Main = /** @class */ (function () {
    function Main() {
        this._converter = new Converter();
        this._coderEncoder = new CoderEncoder();
        this._errorIntroducer = new ErrorIntroducer();
        this._viewController = new ViewController(this._converter);
    }
    return Main;
}());
var main = new Main();
