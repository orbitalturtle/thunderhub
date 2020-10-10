import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Activity } from 'react-feather';
import { toast } from 'react-toastify';
import { LoadingCard } from 'src/components/loading/LoadingCard';
import { useConfigDispatch, useConfigState } from 'src/context/ConfigContext';
import { useLnMarketsLoginMutation } from 'src/graphql/mutations/__generated__/lnMarketsLogin.generated';
import { appendBasePath } from 'src/utils/basePath';
import { getErrorContent } from 'src/utils/error';
import { QuickCard, QuickTitle } from '../QuickActions';

export const LnMarketsCard = () => {
  const { push } = useRouter();
  const dispatch = useConfigDispatch();
  const { lnMarketsAuth } = useConfigState();
  const [login, { data, loading }] = useLnMarketsLoginMutation({
    onError: error => toast.error(getErrorContent(error)),
  });

  useEffect(() => {
    if (data?.lnMarketsLogin?.status === 'OK') {
      dispatch({ type: 'change', lnMarketsAuth: true });
      push(appendBasePath('/lnmarkets'));
    }
  }, [data, push, dispatch]);

  if (loading) {
    return (
      <QuickCard>
        <LoadingCard noCard={true} />
      </QuickCard>
    );
  }

  if (lnMarketsAuth) {
    return (
      <QuickCard onClick={() => push(appendBasePath('/lnmarkets'))}>
        <Activity size={24} />
        <QuickTitle>LnMarkets</QuickTitle>
      </QuickCard>
    );
  }

  return (
    <QuickCard onClick={() => login()}>
      <Activity size={24} />
      <QuickTitle>LnMarkets Login</QuickTitle>
    </QuickCard>
  );
};
