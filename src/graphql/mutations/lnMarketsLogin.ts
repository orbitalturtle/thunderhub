import { gql } from '@apollo/client';

export const LN_MARKETS_LOGIN = gql`
  mutation LnMarketsLogin {
    lnMarketsLogin {
      status
      message
    }
  }
`;
