import React from 'react';
import styled from 'styled-components';
import { GridWrapper } from 'src/components/gridWrapper/GridWrapper';
import { NextPageContext } from 'next';
import { getProps } from 'src/utils/ssr';
import { UserInfo } from 'src/views/lnmarkets/UserInfo';
import { Title } from 'src/components/typography/Styled';
import { SingleLine } from '../src/components/generic/Styled';

export const ButtonRow = styled.div`
  width: auto;
  display: flex;
`;

export const SettingsLine = styled(SingleLine)`
  margin: 8px 0;
`;

const LnMarketsView = () => {
  return (
    <>
      <Title>LnMarkets</Title>
      <UserInfo />
    </>
  );
};

const Wrapped = () => (
  <GridWrapper noNavigation={true}>
    <LnMarketsView />
  </GridWrapper>
);

export default Wrapped;

export async function getServerSideProps(context: NextPageContext) {
  return await getProps(context);
}
