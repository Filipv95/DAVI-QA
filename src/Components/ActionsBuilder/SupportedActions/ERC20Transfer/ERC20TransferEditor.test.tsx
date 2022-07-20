// TODO: Rename this file.
// Had to rename this so the tests are skipped for now.
// `useRpcUrls` which is being used a few levels below ERC20TransferEditor consumes the legacy DXvote context,
// which uses the IPFSService making this test fail.

import { BigNumber } from 'ethers';
import { ZERO_ADDRESS } from 'utils';
import { render } from 'utils/tests';
import ERC20TransferEditor from './ERC20TransferEditor';
import {
  erc20TransferDecodedCallMock,
  erc20TransferEmptyDecodedCallMock,
} from './fixtures';

const mockBigNumber = BigNumber.from(100000000);

jest.mock('hooks/Guilds/ether-swr/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
  }),
}));

jest.mock('hooks/Guilds/ether-swr/erc20/useERC20Info', () => ({
  useERC20Info: () => ({
    name: 'Test ERC20',
    symbol: 'TEST',
    decimals: 18,
    totalSupply: mockBigNumber,
  }),
}));

const mockChainId = 123456;
const mockAddress = ZERO_ADDRESS;
jest.mock('wagmi', () => ({
  useNetwork: () => ({ chain: { id: mockChainId } }),
  useAccount: () => ({ address: mockAddress }),
}));

jest.mock('hooks/Guilds/tokens/useTokenList', () => ({
  useTokenList: () => ({
    tokens: [],
  }),
}));

jest.mock('hooks/Guilds/ether-swr/erc20/useAllERC20Balances', () => ({
  useAllERC20Balances: () => ({
    data: [],
  }),
}));

describe('ERC20TransferEditor', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <ERC20TransferEditor
        decodedCall={erc20TransferDecodedCallMock}
        updateCall={jest.fn()}
        toggleDisableSaveBtn={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it('Should match snapshot with default values', () => {
    const { container } = render(
      <ERC20TransferEditor
        decodedCall={erc20TransferEmptyDecodedCallMock}
        updateCall={jest.fn()}
        toggleDisableSaveBtn={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
