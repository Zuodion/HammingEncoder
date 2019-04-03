"use strict";
var Converter = /** @class */ (function () {
    function Converter(encoderDecoder) {
        this._type = '';
        this._encoderDecoder = encoderDecoder;
    }
    Converter.prototype.initializeConverter = function (inputData, type) {
        this._inputData = inputData;
        this._type = type;
        if (this._inputData === '')
            return alert('Please enter the number or string');
        if (this._type === 'decimalRadio') {
            if (!Number(this._inputData)) {
                return alert('You should enter the number decimal number or change the data type');
            }
            this.fromDecimalToBinary();
        }
        else if (this._type === 'stringRadio') {
            if (Number(this._inputData))
                return alert('You should enter the string or change the data type');
            this.fromStringToBinary();
        }
        else {
            if (!Number('0b' + this._inputData))
                return alert('Please enter the binary number or change the data type');
        }
        this._encoderDecoder.encoder(this._inputData);
    };
    Converter.prototype.fromDecimalToBinary = function () {
        this._inputData = Number(this._inputData).toString(2);
    };
    Converter.prototype.fromStringToBinary = function () {
        var binaryArray = [];
        for (var i = 0; i < this._inputData.length; i++) {
            var decimalCode = this._inputData.charCodeAt(i);
            console.log(decimalCode);
            var binaryCode = decimalCode.toString(2);
            console.log(binaryCode);
            if (binaryCode.length < 12) {
                var newBinaryCode = String(binaryCode).split('');
                while (newBinaryCode.length !== 12) {
                    newBinaryCode.unshift('0');
                }
                newBinaryCode = newBinaryCode.join('');
                binaryArray.push(newBinaryCode);
            }
        }
        this._inputData = binaryArray.join('');
    };
    return Converter;
}());
var EncoderDecoder = /** @class */ (function () {
    function EncoderDecoder(matrix) {
        this._matrix = matrix.defineMatrix();
    }
    EncoderDecoder.prototype.encoder = function (binaryCode) {
        var fourBitsArray = binaryCode.match(/.{1,4}/g);
        var lastElement = fourBitsArray[fourBitsArray.length - 1];
        if (lastElement.length < 4) {
            var newLastElement = String(lastElement).split('');
            while (newLastElement.length !== 4) {
                newLastElement.unshift('0');
            }
            newLastElement = newLastElement.join('');
            fourBitsArray.pop();
            fourBitsArray.push(newLastElement);
        }
        var encodedBitsArray = [];
        for (var index = 0; index < fourBitsArray.length; index++) {
            var newElement = fourBitsArray[index].split('');
            newElement.splice(0, 0, '0');
            newElement.splice(1, 0, '0');
            newElement.splice(3, 0, '0');
            newElement = newElement.join('');
            var newElementArray = newElement.split('');
            for (var matrixRow = 0; matrixRow < this._matrix.length; matrixRow++) {
                var result = (Number('0b' + newElement.toString(2)) & Number('0b' + this._matrix[matrixRow].toString(2))).toString(2);
                var hvArray = result.split('');
                var rowSum = 0;
                for (var i = 0; i < hvArray.length; i++) {
                    if (hvArray[i] === '1')
                        rowSum++;
                }
                //console.log(rowSum)
                if (rowSum % 2 === 1) {
                    //console.log('hi')
                    switch (matrixRow) {
                        case 0:
                            newElementArray.splice(3, 1, '1');
                            break;
                        case 1:
                            newElementArray.splice(1, 1, '1');
                            break;
                        case 2:
                            newElementArray.splice(0, 1, '1');
                            break;
                    }
                }
            }
            encodedBitsArray.push(newElementArray.join(''));
        }
        console.log(encodedBitsArray);
        this.decoder(encodedBitsArray);
    };
    EncoderDecoder.prototype.decoder = function (encodedCode) {
    };
    return EncoderDecoder;
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
var Matrix = /** @class */ (function () {
    function Matrix() {
    }
    Matrix.prototype.defineMatrix = function () {
        var matrix3 = [15, 51, 85];
        return matrix3;
    };
    return Matrix;
}());
var Main = /** @class */ (function () {
    function Main() {
        this._matrix = new Matrix();
        this._encoderDecoder = new EncoderDecoder(this._matrix);
        this._errorIntroducer = new ErrorIntroducer();
        this._converter = new Converter(this._encoderDecoder);
        this._viewController = new ViewController(this._converter);
    }
    return Main;
}());
var main = new Main();
