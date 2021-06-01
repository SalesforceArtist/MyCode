// Gender Enumeration
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
    Gender[Gender["Alien"] = 2] = "Alien";
})(Gender || (Gender = {}));

// @class BankDB - Client-side database class object, with common query functions.
var BankDB = (function () {
    function BankDB(_customer) {
        this.customerID = _customer.customerID;
        this.customerBalance = _customer.customerBalance;
        this.customerName = _customer.customerName;
        this.customerCity = _customer.customerCity;
        this.customerGender = _customer.customerGender;
        this.customerMarried = _customer.customerMarried;
    }
	
    BankDB.prototype.requestCustomerCityName = function () {
        return "City: " + this.customerCity;
    };
	
    BankDB.prototype.requestBankBalance = function () {
        var stringBalance = "Balance: $" + this.customerBalance;
        return stringBalance;
    };
	
    BankDB.prototype.requestCustomerGreeting = function () {
        var stringBalance;
        switch (this.customerGender) {
            case 0:
                stringBalance = "Hello Mr. " + this.customerName[1] + ".";
                break;
            case 1:
                if (this.customerMarried) {
                    stringBalance = "Hello Mrs. " + this.customerName[1] + ".";
                }
                else {
                    stringBalance = "Hello Miss. " + this.customerName[1] + ".";
                }
                break;
            case 2:
                stringBalance = "Live long and prosper " + this.customerName[1] + ".";
                break;
            default:
                stringBalance = "Hello " + this.customerName[1] + ".";
                break;
        }
        return stringBalance;
    };
    return BankDB;
})();

// New Customer data value
var newCustomer = {
    customerID: 54323421,
    customerName: ["Leonard", "Adams"],
    customerBalance: 40000,
    customerCity: "Raymore",
    customerGender: 0 /* Male */,
    customerMarried: false
};

// New request to the client-side database.
var request = new BankDB(newCustomer);
document.body.style.fontFamily = "'Segoe UI', Helvetica, Arial, sans-serif";
document.body.style.fontSize = "2em";
document.body.style.textAlign = "center";
document.body.innerHTML += "<br />" + request.requestCustomerGreeting();
document.body.innerHTML += "<br />" + request.requestCustomerCityName();
document.body.innerHTML += "<hr /><br /><strong>" + request.requestBankBalance() + "</strong>";
