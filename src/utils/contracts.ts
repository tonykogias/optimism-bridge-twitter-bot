import { ethers, Contract } from 'ethers';
import { WebSocketProvider } from '@ethersproject/providers';
import l1standardbridgeabi from '../abis/OP_L1_STANDARDBRIDGE_ABI.json';
import l2standardbridgeabi from '../abis/OP_L2_STANDARDBRIDGE_ABI.json';
import {
	OP_L1_STANDARD_BRIDGE_ADDR,
	OP_L2_STANDARD_BRIDGE_ADDR
} from './constants'

import dotenv from 'dotenv';
dotenv.config()

interface WSProviders {
	l1Provider: WebSocketProvider
	l2Provider: WebSocketProvider
}

interface OPContracts {
	OPL1Contract: Contract
	OPL2Contract: Contract
}

const getL1andL2Provider = (): WSProviders => {
	return {
		l1Provider: new ethers.providers.WebSocketProvider(process.env.WSS_INFURA_MAINNET),
		l2Provider: new ethers.providers.WebSocketProvider(process.env.WSS_OP_MAINNET)
	}
}

export const getContracts = (): OPContracts => {
	const providers: WSProviders = getL1andL2Provider();

	const l1bridge: Contract = new ethers.Contract(
		OP_L1_STANDARD_BRIDGE_ADDR,
		l1standardbridgeabi,
		providers.l1Provider
	);

	const l2bridge: Contract = new ethers.Contract(
		OP_L2_STANDARD_BRIDGE_ADDR,
		l2standardbridgeabi,
		providers.l2Provider
	);

	return {
		OPL1Contract: l1bridge,
		OPL2Contract: l2bridge
	}
}
