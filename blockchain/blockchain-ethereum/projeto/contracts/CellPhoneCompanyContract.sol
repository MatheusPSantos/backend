// SPDX-License-Identifier: MIT
pragma solidity =0.8.12;

contract CellPhoneCompanyContract {
    struct Customer {
        string customerName;
        uint256 customerBalance;
    }

    struct Product {
        string productName;
        uint256 productPoints;
        uint256 amountExchanged;
    }

    address private _contractOwner;
    Product[] public products;

    constructor() {
        _contractOwner = msg.sender;

        Product memory product0 = Product({
            productName: "Watch",
            productPoints: 2,
            amountExchanged: 0
        });
        Product memory product1 = Product({
            productName: "Cellphone",
            productPoints: 5,
            amountExchanged: 0
        });
        Product memory product2 = Product({
            productName: "Computer",
            productPoints: 10,
            amountExchanged: 0
        });

        products.push(product0);
        products.push(product1);
        products.push(product2);
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

    function payMonthlyBill(uint256 _totalDueInWei) public payable {
        require(msg.value == _totalDueInWei, "Total payment value is invalid");

        Customer storage _customer = _enrolledCustomers[msg.sender];

        require(isCustomerValid(_customer), "Customer not enrolled");

        _customer.customerBalance += 1;
    }

    function exchangeCustomerPointsByProduct(uint256 _productIndex) public {
        require(
            _productIndex <= products.length - 1,
            "Product index is not valid"
        );

        Customer storage customer = _enrolledCustomers[msg.sender];

        require(isCustomerValid(customer), "Customer not enrolled");

        Product storage product = products[_productIndex];
        require(
            customer.customerBalance >= product.productPoints,
            "Not enough points to be used"
        );

        customer.customerBalance -= product.productPoints;
        product.amountExchanged += 1;

        assert(customer.customerBalance >= 0);

        emit ProductExchanged(msg.sender, _productIndex, block.timestamp);
    }

    function getContractBalance()
        public
        view
        contractOwnerOnly
        returns (uint256)
    {
        return address(this).balance;
    }

    function transferToAccount(
        address payable _destinationaddress,
        uint256 _amountToTransfer
    ) public contractOwnerOnly {
        uint256 amountAvailable = address(this).balance;

        require(_amountToTransfer <= amountAvailable, "Balance is not enough");

        Customer memory customer = _enrolledCustomers[_destinationaddress];

        require(isCustomerValid(customer), "Destination customer is invalid");

        amountAvailable -= _amountToTransfer;
        assert(amountAvailable >= 0);

        (bool success, ) = _destinationaddress.call{value: _amountToTransfer}(
            ""
        );

        require(success, "Could not transfer to destination address");
    }

    modifier contractOwnerOnly() {
        require(msg.sender == _contractOwner);
        _;
    }

    event ProductExchanged(
        address indexed _customer,
        uint256 _productIndex,
        uint256 _dateAndTime
    );
}
