export class ErrorCode extends Error {
    private _code: number;

    constructor(code: number, message?: string) {
        super(message);
        this._code = code;
    }

    get code() {
        return this._code;
    }


    toJSON() {
        return {
            code: this._code,
            message: this.message,
        };
    }
}