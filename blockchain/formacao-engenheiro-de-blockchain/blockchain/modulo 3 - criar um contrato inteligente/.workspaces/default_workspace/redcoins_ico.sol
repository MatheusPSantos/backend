// ICON redcoins

// versao 
pragma solidity ^0.4.11;

contract redcoin_ico {
    uint public max_redcoins = 1000000; // numero máximo de redcoins disponivel no ico
    uint public usd_to_redcoins = 1000; // taxa de cotacao para dolar
    uint public total_redcoins_bought = 0; // total de redcoins compradas por investors

    // funções de equivalencia
    mapping(address => uint) equity_redcoins;
    mapping(address => uint) equity_usd;

    // verificando se o investor pode comprar redcoins
    modifier can_buy_redcoins(uint usd_invested) {
        require (usd_invested * usd_to_redcoins + total_redcoins_bought <= max_redcoins);
        _;
    }

    // retornar o valor do investimento em redcoins
    function equity_in_redcoins(address investor) external constant returns(uint) {
        return equity_redcoins[investor];
    }

    // retorna o valor do investimento em dolares
    function equity_in_usd(address investor) external constant returns(uint) {
        return equity_usd[investor];
    }

    // compra de redcoins
    function buy_redcoins(address investor, uint usd_invested) external
    can_buy_redcoins(usd_invested) {
        uint redcoins_bought = usd_invested * usd_to_redcoins;
        equity_redcoins[investor]  += redcoins_bought;
        equity_usd[investor]= equity_redcoins[investor]/1000;
        total_redcoins_bought += redcoins_bought;
    }

    // venda de redcoins
    function sell_redcoins(address investor, uint redcoins_sold) external {
        equity_redcoins[investor] -= redcoins_sold;
        equity_usd[investor] = equity_redcoins[investor]/1000;
        total_redcoins_bought -= redcoins_sold;    
    }
}

