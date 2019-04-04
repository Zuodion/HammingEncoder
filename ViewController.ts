class ViewController {
    private _converterToBinary: ConverterToBinary;
    private type: string = '';
    private inputData: string = '';
    constructor(converter: ConverterToBinary){
        this._converterToBinary = converter
    }
    private start (): void {
        let radioButtons: Array<HTMLInputElement> = Array.prototype.slice.call(document.getElementsByName('type'), 0)
        let checked: Array<HTMLInputElement> = radioButtons.filter(radio => radio.checked)
        this.type = checked[0].value
        this.inputData = (<HTMLInputElement>document.getElementById('inputData')).value
        this._converterToBinary.initializeConverter(this.inputData, this.type)
    }
}