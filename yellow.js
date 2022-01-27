const { ChainId, Token, Fetcher, Route, WETH, Trade, TokenAmount, TradeType, Price } = require('@dynamic-amm/sdk');
const ethers = require('ethers'); 
//import {ChainId, Token, WETH, Fetcher, Route} from '@dynamic-amm/sdk';

// DMM Factory Address if using Ethereum Mainnet
const url = 'https://mainnet.infura.io/v3/22fe7d61ab2b4ad5a1f8b22ddbdc93d7';
const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
const chainId = ChainId.MAINNET;

const DMMFactoryAddress = '0x833e4083B7ae46CeA85695c4f7ed25CDAd8886dE';

const init = async () => {
	const USDC = await Fetcher.fetchTokenData(chainId, '0x6B175474E89094C44Da98b954EedeAC495271d0F', customHttpProvider);
	const weth = WETH[chainId];
	const pair = await Fetcher.fetchPairData(USDC, WETH[USDC.chainId], DMMFactoryAddress,customHttpProvider);
	//const route = new Route([pair], weth);

	const route = new Route(pair,WETH[USDC.chainId]);
	const trade = new Trade(route, new TokenAmount(WETH[USDC.chainId], '10000000000000000'), TradeType.EXACT_INPUT);

	console.log("Mid Price WETH --> USDC:", route.midPrice.toSignificant(6));
	console.log("Mid Price USDC --> WETH:", route.midPrice.invert().toSignificant(6));
	//console.log("-".repeat(45));
	console.log("Execution Price WETH --> USDC:", trade.executionPrice.toSignificant(6));
	//console.log("Mid Price after trade WETH --> USDC:", trade.nextMidPrice.toSignificant(6));

}

init()