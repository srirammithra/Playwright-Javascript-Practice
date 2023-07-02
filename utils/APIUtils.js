module.exports = class APIUtils {

    varToken;
    varOrderID;
    constructor(objAPIContext, varLoginRequestPayload) {
        this.objAPIContext = objAPIContext;
        this.varLoginRequestPayload = varLoginRequestPayload;
    }

    async GetToken() {
        const varLoginResponse = await this.objAPIContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.varLoginRequestPayload });
        //expect(varLoginResponse.ok()).toBeTruthy();
        const varLoginResponseJSON = await varLoginResponse.json();
        this.varToken = varLoginResponseJSON.token;
        console.log(this.varToken);
        return this.varToken;
    }

    async CreateOrderID(varCreateOrderPayload) {
        const varCreateOrderResponse = await this.objAPIContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: varCreateOrderPayload,
            headers: { 'Authorization': this.varToken, 'Content-Type': 'application/json' }
        });
        //expect(varCreateOrderResponse.status()).toBe(201);
        const varCreateOrderResponseJSON = await varCreateOrderResponse.json();
        this.varOrderID = varCreateOrderResponseJSON.orders[0];
        console.log(this.varOrderID);
        return this.varOrderID;
    }
}