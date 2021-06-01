interface Customer {
    customerID: number;
	customerBalance: number;
	customerName: string[];
	customerCity: string;
	customerGender: Gender;
	customerMarried: boolean;
}

enum Gender {
	Male,
	Female,
	Alien
}

class BankDB {
	customerID: number;
	customerBalance: number;
	customerName: string[];
	customerCity: string;
	customerGender: Gender;
	customerMarried: boolean;
	
    constructor(_customer: Customer) {
		this.customerID = _customer.customerID;
		this.customerBalance = _customer.customerBalance;
		this.customerName = _customer.customerName;
		this.customerCity = _customer.customerCity;
		this.customerGender = _customer.customerGender;
		this.customerMarried = _customer.customerMarried;
    }
	
	requestCustomerCityName(): string {
		return "City: " + this.customerCity;
	}
    
	
	requestBankBalance(): string {
		var stringBalance = "Balance: $" + this.customerBalance;
		return stringBalance;
	}
	
	requestCustomerGreeting(): string {
		
		var stringBalance;
		switch (this.customerGender) {
			case 0:
				stringBalance = "Hello Mr. " + this.customerName[1] + ".";
				break;
			case 1:
				if (this.customerMarried) {
					stringBalance = "Hello Mrs. " + this.customerName[1] + ".";
				} else {
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
	}
}

var newCustomer: Customer = {
	customerID: 54323421,
	customerName: ["Leo", "Adams"],
	customerBalance: 40000,
	customerCity: "Raymore",
	customerGender: Gender.Male,
	customerMarried: false
}


var request = new BankDB(newCustomer);

document.body.style.fontFamily = "'Segoe UI', Helvetica, Arial, sans-serif";
document.body.style.fontSize = "2em";
document.body.style.textAlign = "center";
document.body.innerHTML += "<br />" + request.requestCustomerGreeting();
document.body.innerHTML += "<br />" + request.requestCustomerCityName();
document.body.innerHTML += "<hr /><br /><strong>" + request.requestBankBalance() + "</strong>";