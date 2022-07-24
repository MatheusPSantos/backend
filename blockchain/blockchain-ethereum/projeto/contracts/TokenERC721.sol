// SPDX-License-Identifier: MIT
pragma solidity =0.8.12;

import "./IERC721.sol";

contract TokeERC721 is IERC721 {
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    function balanceOf(address _owner)
        public
        view
        virtual
        override
        returns (uint256)
    {
        require(_owner != address(0), "Address is invalid");

        return _balances[_owner];
    }

    function ownerOf(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (address)
    {
        address owner = _owners[_tokenId];

        require(owner != address(0), "Address is invalid");

        return owner;
    }

    function isApprovedForAll(address _owner, address _operator)
        public
        view
        virtual
        override
        returns (bool)
    {
        return _operatorApprovals[_owner][_operator];
    }

    function getApproved(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (address)
    {
        require(
            _owners[_tokenId] != address(0),
            "Token is not owned by anyone"
        );
        return _tokenApprovals[_tokenId];
    }

    function approve(address _to, uint256 _tokenId) public virtual override {
        address owner = ownerOf(_tokenId);
        require(_to != owner, "Owner must be different from destiny");
        require(
            msg.sender == owner || isApprovedForAll(owner, msg.sender),
            "Sender is not owner or token is not approved."
        );

        _tokenApprovals[_tokenId] = _to;
        emit Approval(ownerOf(_tokenId), _to, _tokenId);
    }

    function setApprovalForAll(address _operator, bool _approved)
        public
        virtual
        override
    {
        require(
            msg.sender != _operator,
            "Sender must be different from operator."
        );

        _operatorApprovals[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function _transfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal virtual {
        require(ownerOf(_tokenId) == _from, "Token is not owned by origin");
        require(_to != address(0), "Addres is invalid");

        approve(address(0), _tokenId);

        _balances[_from] -= 1;
        _balances[_to] += 1;
        _owners[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId);
    }

    function _safeTransfer(
        address _from,
        address _to,
        uint256 _tokenId,
        bytes memory _data
    ) internal virtual {
        require(_to.isContract(), "Destiny is not a contract");

        _transfer(_from, _to, _tokenId);
    }

    function _tokenIsOwnedOrApproved(address _spender, uint256 _tokenId)
        internal
        view
        virtual
        returns (bool)
    {
        require(_exists(_tokenId), "Token not found");

        address owner = ownerOf(_tokenId);

        require(
            _spender == owner ||
                getApproved(_tokenId) == _spender ||
                isApprovedForAll(owner, _spender),
            "Origin is not the owner or is not approved"
        );

        return true;
    }

    function safeTransferFrom(
        address _from,
        address _t0,
        uint256 _tokenId
    ) public virtual override {
        safeTransferFrom(_from, _t0, _tokenId, "");
    }

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId,
        bytes memory _data
    ) public virtual override {
        require(
            _tokenIsOwnedOrApproved(msg.sender, _tokenId),
            "Origin is not the owner or is not approved"
        );

        _safeTransfer(_from, _to, _tokenId, _data);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public virtual override {
        require(
            _tokenIsOwnedOrApproved(msg.sender, _tokenId),
            "Origin is not the owner or is not approved"
        );

        _transfer(_from, _to, _tokenId);
    }
}
