require('../Utilities/CustomLocators.js');
var BankManagerPage= function(){
    this.addCustomerButton= element(by.ngClick('addCust()'));
    this.openAccount=element(by.ngClick('openAccount()'));
    this.customers=element(by.ngClick('showCust()'));
   

};
module.exports=new BankManagerPage();