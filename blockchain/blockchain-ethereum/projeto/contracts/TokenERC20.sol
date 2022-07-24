// SPDX-License-Identifier: MIT
pragma solidity =0.8.12;

import "./IERC20.sol";

contract TokenERC20 is IERC20 {
    string public constant name = "MeuToken";
    string public constant symbol = "MTK";
    uint8 public constant decimals = 18;

    uint256 private _totalSupply;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowed;

    constructor() {
        balances[msg.sender] = _totalSupply;
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _owner) public view override returns (uint256) {
        return _balances[_owner];
    }

    function allowance(address _owner, address _spender)
        public
        view
        override
        returns (uint256)
    {
        return _allowed[_owner][_spender];
    }

    function tansfer(address _to, uint256 _value) public returns (bool) {
        require(_value <= _balances[msg.sender], "Not enough funds!");
        require(_to != address(0), "Address is invalid");

        _balances[msg.sender] = _balances[msg.sender] - _value;
        _balances[_to] = _balances[_to] + _value;
        emit Transfer(msg.sender, _to, _value);
        return True;
    }

    function approve(address _spender, uint256 _value) public returns (bool) {
        require(_spender != address(0), "Address is invalid");

        _allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool) {
        require(_value <= _balances[_from], "Not enough funds!");
        require(
            _value <= _allowed[_from][msg.sender],
            "Not enough allowed funds"
        );
        require(_to != address(0), "Address is invalid");

        _balances[_from] = _balances[_from] - _value;
        _balances[_to] = _balances[_to] + _value;

        _allowed[_from][msg.sender] = _allowed[_from][msg.sender] - _value;

        emit Transfer(_from, _to, _value);
        return true;
    }
}
