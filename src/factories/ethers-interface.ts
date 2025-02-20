import { ethers } from 'ethers';
import hre from 'hardhat';
import { FakeContractSpec } from '../types';

export async function ethersInterfaceFromSpec(spec: FakeContractSpec): Promise<ethers.utils.Interface> {
  if (typeof spec === 'string') {
    try {
      return new ethers.utils.Interface(spec);
    } catch {
      return (await (hre as any).ethers.getContractFactory(spec)).interface;
    }
  }

  let foundInterface: any = spec;
  if (foundInterface.abi) {
    foundInterface = foundInterface.abi;
  } else if (foundInterface.interface) {
    foundInterface = foundInterface.interface;
  }

  if (foundInterface instanceof ethers.utils.Interface) {
    return foundInterface;
  } else {
    return new ethers.utils.Interface(foundInterface);
  }
}
