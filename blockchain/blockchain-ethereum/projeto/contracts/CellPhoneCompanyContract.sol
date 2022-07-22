// SPDX-License-Identifier: MIT
pragma solidity = 0.8.12;

contract CellPhoneCompanyContract {
    struct Customer {
        string customerName;
        uint256 customerBalance;
    }

    mapping(address => Customer) private _enrolledCustomers;

    function enrollCustomer(string memory _customerName) public {
        require(isCustomerNameValid(_customerName), "Name must be informed");

        require(
            !isCustomerValid(getEnrolledCustomerByAddress(msg.sender)),
            "Customer already enrolled"
        );

        Customer memory customer;
        customer.customerName = _customerName;
        customer.customerBalance = 0;

        assert(isCustomerValid(customer));

        _enrolledCustomers[msg.sender] = customer;
    }

    function getEnrolledCustomerByAddress(address _customerAddress)
        public
        view
        returns (Customer memory)
    {
        return _enrolledCustomers[_customerAddress];
    }

    function isCustomerValid(Customer memory _customer)
        private
        pure
        returns (bool)
    {
        return
            isCustomerNameValid(_customer.customerName) &&
            isCustomerBalanceValid(_customer.customerBalance);
    }

    function isCustomerBalanceValid(uint256 _customerBalance)
        private
        pure
        returns (bool)
    {
        return _customerBalance >= 0;
    }

    function isCustomerNameValid(string memory _customerName)
        private
        pure
        returns (bool)
    {
        bytes memory tempString = bytes(_customerName);
        return tempString.length > 0;
    }
}
