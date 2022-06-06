import ProposalStatus from './ProposalStatus';
import { render } from '../../utils/tests';
import { ProposalStatusProps } from './types';
import { ContractState } from 'types/types.guilds.d';
import moment from 'moment';

const validProps: ProposalStatusProps = {
  timeDetail: 'Time',
  status: ContractState.Active,
  endTime: moment('2022-05-09T08:00:00'),
};

const invalidProps: ProposalStatusProps = {
  timeDetail: null,
  status: null,
  endTime: null,
};

jest.mock('contexts/index', () => jest.fn());

test('ProposalStatus votes', async () => {
  const { container } = render(<ProposalStatus {...validProps} />);

  expect(container).toMatchSnapshot();
});

test('ProposalStatus loading', async () => {
  const { container } = render(<ProposalStatus {...invalidProps} />);

  expect(container).toMatchSnapshot();
});
