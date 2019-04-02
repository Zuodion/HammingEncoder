class ViewController {
    private _converter: Converter;
    private type: String = '';
    private inputData: String = '';
    constructor(converter: Converter){
        this._converter = converter
    }
    private start (): void {
        let radioButtons: Array<HTMLInputElement> = Array.prototype.slice.call(document.getElementsByName('type'), 0)
        let checked: Array<HTMLInputElement> = radioButtons.filter(radio => radio.checked)
        this.type = checked[0].value
        this.inputData = (<HTMLInputElement>document.getElementById('inputData')).value
        this._converter.initializeConverter(this.inputData, this.type)
    }
}