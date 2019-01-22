require('../Utilities/CustomLocators.js');
var HomePage =  require('../Pages/Home.page.js');
var BankManagerPage = require('../Pages/BankManager.page.js');
var Base = require('../Utilities/Base.js');
var AddCustomerPage = require('../Pages/AddCustomerPage.page.js');
var Customers= require('../Pages/Customers.page.js');
var BankData= require('../TestData/BankData.json');

var using= require('jasmine-data-provider');
describe('Add Customer',()=>{
    describe('Adding a Customer', () => {
        beforeAll(function(){
            Base.navigateToHome();
            HomePage.managerLoginButton.click();
            AddCustomerPage.goToAddCustomer();
        });


        it('should display form for Adding Customer', () => {
            expect(AddCustomerPage.customerForm.isDisplayed()).toBe(true);
            expect(AddCustomerPage.formLabels.count()).toEqual(3);
        });
        it('should list all the labels',()=>{
            expect(AddCustomerPage.formLabels.get(0).getText()).toEqual('First Name :');
            expect(AddCustomerPage.formLabels.get(1).getText()).toEqual('Last Name :');
            expect(AddCustomerPage.formLabels.get(2).getText()).toEqual('Post Code :');
    
        });
        it('should require firstName', () => {
            expect(AddCustomerPage.formRequiredFields.get(0).getAttribute('required')).toBe('true')

        });
        it('should require lastName', () => {
            expect(AddCustomerPage.formRequiredFields.get(1).getAttribute('required')).toBe('true')

        });
        it('should require zipCode', () => {
            expect(AddCustomerPage.formRequiredFields.get(2).getAttribute('required')).toBe('true')

        });
        it('Should add customer', () => {
            for( i=0; i<BankData.customers.length;i++){
            AddCustomerPage.firstNameInputBox.sendKeys(BankData.customers[i].fName);
            AddCustomerPage.lastNameInputBox.sendKeys(BankData.customers[i].lName);
            AddCustomerPage.postalCodeInputBox.sendKeys(BankData.customers[i].pCode);
            AddCustomerPage.formAddCustomerButton.click();
            expect(browser.switchTo().alert().getText()).toContain('Customer added successfully with customer id :');
            browser.switchTo().alert().accept();
            BankManagerPage.customers.click();
            expect(Customers.getLastRowValue(1).getText()).toEqual(BankData.customers[i].fName);
            expect(Customers.getLastRowValue(2).getText()).toEqual(BankData.customers[i].lName);
            expect(Customers.getLastRowValue(3).getText()).toEqual(BankData.customers[i].pCode);
            }
            //BankManagerPage.customers.click();
            //scroll down to add
        });
        
    
    });
})