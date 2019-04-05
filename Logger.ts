class Logger {
    private _counter: number = 1;
    private _outputField: any
    setOutputField(outputField: any){
        this._outputField = outputField
    }
    public notice(text: string){
        this.logInOutput(`${this._counter}) ${text}`)
        this._counter++;
    }

    public logInOutput(logs: string){
        let div = document.createElement('div')
        div.id = 'log'
        div.className = 'log'
        div.innerHTML = logs;
        this._outputField.appendChild(div)
    }
    
    public colorizeElement(string: string, index: number, color: string) {
        let array = string.split('')
        let colorizingElement = array[index]
        array[index] = `<span style="color:${color}">${colorizingElement}</span>`
        return array.join('');
    }


    public set counter (value: number) {
        this._counter = value;
    }

}