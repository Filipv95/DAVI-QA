import { Picker } from 'Components/Primitives/Forms/Picker';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TransparentButton } from './SwaprPicker.styled';
import { SwaprPickerProps } from './types';
import AddressButton from 'Components/AddressButton/AddressButton';
import { Loading } from 'Components/Primitives/Loading';
import moment from 'moment';
import { useSwaprFetchPairs } from 'hooks/Guilds/useSwaprFetchPairs';
import { useWeb3React } from '@web3-react/core';
import { SwaprFetchPairsInterface } from 'hooks/Guilds/useSwaprFetchPairs';

const SwaprPicker: React.FC<SwaprPickerProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [swaprPairsFetchedData, setSwaprPairsFetchedData] = useState<
    SwaprFetchPairsInterface[]
  >([]);

  const currentUnixTimestamp = moment().unix();
  const pageSize = 1000;
  const { chainId } = useWeb3React();

  let data = useSwaprFetchPairs(
    chainId,
    currentUnixTimestamp,
    '',
    pageSize,
    ''
  );

  useEffect(() => {
    async function assignData() {
      setSwaprPairsFetchedData(await data);
    }
    assignData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const parsedPairs = useMemo(() => {
    if (swaprPairsFetchedData !== undefined) {
      return swaprPairsFetchedData.map(pair => {
        return {
          ...pair,
          title: `${pair?.token0.symbol} - ${pair?.token1.symbol}`,
          subtitle: `${pair?.token0.name} - ${pair?.token1.name}`,
        };
      });
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSelect = value => {
    onChange(value.address);
    setIsModalOpen(false);
  };

  if (swaprPairsFetchedData === undefined)
    return (
      <TransparentButton
        variant="secondary"
        aria-label="Skeleton loading button"
        type="button"
      >
        <Loading loading text />
      </TransparentButton>
    );

  return (
    <>
      {value === '' ? (
        <TransparentButton
          variant="secondary"
          onClick={() => setIsModalOpen(true)}
          aria-label="Swapr picker button"
          type="button"
        >
          {value}
        </TransparentButton>
      ) : (
        <AddressButton
          address={value}
          onClick={() => setIsModalOpen(true)}
          aria-label="Swapr picker button"
          type="button"
        />
      )}
      <Picker
        data={parsedPairs}
        header={t('pickSwaprPair')}
        isOpen={isModalOpen}
        onSelect={onSelect}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SwaprPicker;
