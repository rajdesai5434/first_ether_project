const { ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType } = require ('@uniswap/sdk');
const ethers = require('ethers');  

const url = 'https://mainnet.infura.io/v3/22fe7d61ab2b4ad5a1f8b22ddbdc93d7';
const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

const chainId = ChainId.MAINNET;
const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'

const init = async () => {
	const USDC = await Fetcher.fetchTokenData(chainId, tokenAddress, customHttpProvider);
	const weth = WETH[chainId];
	const pair = await Fetcher.fetchPairData(USDC, weth, customHttpProvider);
	const route = new Route([pair], weth);
	const trade = new Trade(route, new TokenAmount(weth, '10000000000000000'), TradeType.EXACT_INPUT);
	console.log("Mid Price WETH --> USDC:", route.midPrice.toSignificant(6));
	console.log("Mid Price USDC --> WETH:", route.midPrice.invert().toSignificant(6));
	//console.log("-".repeat(45));
	console.log("Execution Price WETH --> DAI:", trade.executionPrice.toSignificant(6));
	//console.log("Mid Price after trade WETH --> DAI:", trade.nextMidPrice.toSignificant(6));

}

init();
