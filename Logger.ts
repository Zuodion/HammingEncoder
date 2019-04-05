class Logger {
    private _counter: number = 0;
    private _outputField: any
    setOutputField(outputField: any){
        this._outputField = outputField
    }
    public notice(data: any, text: string){
        this.logInOutput('4')
        this._counter++;
    }

    public logInOutput(logs: string){
        console.log(this._counter)
    }
}