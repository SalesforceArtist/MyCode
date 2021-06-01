
describe("New Customer data test: ", function() {
	
    it("Customer's ID should be a number.", function() {
        expect(typeof newCustomer.customerID).toEqual("number");
    });
    
    it("Customer's name should be in an array object, (ex ['FirstName', 'LastName'] ).", function() {
        expect(typeof newCustomer.customerName).toEqual("object");
    });
    
    it("Customer's bank balance should be a number.", function() {
        expect(typeof newCustomer.customerBalance).toEqual("number");
    });
    
    it("Customer's city name should be a string.", function() {
        expect(typeof newCustomer.customerCity).toEqual("string");
    });
    
    it("Customer's gender should be a number.", function() {
        expect(typeof newCustomer.customerGender).toEqual("number");
    });
    
    it("Customer's marriage status is a boolean.", function() {
        expect(typeof newCustomer.customerMarried).toEqual("boolean");
    });
    
});
