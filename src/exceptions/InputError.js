import ClientError from "../exceptions/ClientError.js";
 
class InputError extends ClientError {
    constructor(message) {
        super(message);
        this.name = 'InputError';
    }
}
 
export default InputError;