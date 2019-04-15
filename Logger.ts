class Logger {
    private _counter: number = 1;
    private _outputField: any
    setOutputField (outputField: any): void {
        this._outputField = outputField
    }

    public notice (text: string): void {
        this.logInOutput(`${this._counter}) ${text}`)
        this._counter++;
    }

    public logInOutput (logs: string): void {
        let div = (<HTMLDivElement>document.createElement('div'))
        div.id = 'log'
        div.className = 'log'
        div.innerHTML = logs;
        this._outputField.appendChild(div)
    }

    public colorizeElement (array: Array<string>, index: number, color: string): string {
        let colorizingElement: string = array[index]
        array[index] = `<span style="color:${color}">${colorizingElement}</span>`
        return array.join('');
    }

    public set counter (value: number) {
        this._counter = value;
    }
}