class ApiResponse{
    constructor(statusCode,Players,message = "Success" ){
        // this.statusCode = statusCode
        this.Players = Players
        this.message = message
        // this.success = statusCode < 400;
    }
}
export {ApiResponse}