import { ethers, Contract } from 'ethers';
import { WebSocketProvider } from '@ethersproject/providers';
import l1standardbridgeabi from '../abis/OP_L1_STANDARDBRIDGE_ABI.json';
import l2standardbridgeabi from '../abis/OP_L2_STANDARDBRIDGE_ABI.json';
import hopl1bridgeabi from '../abis/HOP_L1_BRIDGE_ABI.json';
import hopl2bridgeabi from '../abis/HOP_L1_BRIDGE_ABI.json';
import {
	OP_L1_STANDARD_BRIDGE_ADDR,
	OP_L2_STANDARD_BRIDGE_ADDR,
	HOP_L1_BRIDGE_ADDR,
	HOP_L2_BRIDGE_ADDR
} from './constants'

import dotenv from 'dotenv';
dotenv.config()

interface WSProviders {
	l1Provider: WebSocketProvider
	l2Provider: WebSocketProvider
}

interface BridgeContracts {
	OPL1Contract: Contract
	OPL2Contract: Contract
	HOPL1Contract: Contract
	HOPL2Contract: Contract
}

const getL1andL2Provider = (): WSProviders => {
	return {
		l1Provider: new ethers.providers.WebSocketProvider(process.env.WSS_INFURA_MAINNET),
		l2Provider: new ethers.providers.WebSocketProvider(process.env.WSS_OP_MAINNET)
	}
}

export const getContracts = (): BridgeContracts => {
	const providers: WSProviders = getL1andL2Provider();

	const OP_L1_Bridge: Contract = new ethers.Contract(
		OP_L1_STANDARD_BRIDGE_ADDR,
		l1standardbridgeabi,
		providers.l1Provider
	);

	const OP_L2_Bridge: Contract = new ethers.Contract(
		OP_L2_STANDARD_BRIDGE_ADDR,
		l2standardbridgeabi,
		providers.l2Provider
	);

	const HOP_L1_Bridge: Contract = new ethers.Contract(
		HOP_L1_BRIDGE_ADDR,
		hopl1bridgeabi,
		providers.l1Provider
	);

	const HOP_L2_Bridge: Contract = new ethers.Contract(
		HOP_L2_BRIDGE_ADDR,
		hopl2bridgeabi,
		providers.l2Provider
	);

	return {
		OPL1Contract: OP_L1_Bridge,
		OPL2Contract: OP_L2_Bridge,
		HOPL1Contract: HOP_L1_Bridge,
		HOPL2Contract: HOP_L2_Bridge
	}
}
