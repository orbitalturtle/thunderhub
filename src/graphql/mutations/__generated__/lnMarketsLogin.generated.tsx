/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type LnMarketsLoginMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type LnMarketsLoginMutation = (
  { __typename?: 'Mutation' }
  & { lnMarketsLogin: (
    { __typename?: 'AuthResponse' }
    & Pick<Types.AuthResponse, 'status' | 'message'>
  ) }
);


export const LnMarketsLoginDocument = gql`
    mutation LnMarketsLogin {
  lnMarketsLogin {
    status
    message
  }
}
    `;
export type LnMarketsLoginMutationFn = Apollo.MutationFunction<LnMarketsLoginMutation, LnMarketsLoginMutationVariables>;

/**
 * __useLnMarketsLoginMutation__
 *
 * To run a mutation, you first call `useLnMarketsLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLnMarketsLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lnMarketsLoginMutation, { data, loading, error }] = useLnMarketsLoginMutation({
 *   variables: {
 *   },
 * });
 */
export function useLnMarketsLoginMutation(baseOptions?: Apollo.MutationHookOptions<LnMarketsLoginMutation, LnMarketsLoginMutationVariables>) {
        return Apollo.useMutation<LnMarketsLoginMutation, LnMarketsLoginMutationVariables>(LnMarketsLoginDocument, baseOptions);
      }
export type LnMarketsLoginMutationHookResult = ReturnType<typeof useLnMarketsLoginMutation>;
export type LnMarketsLoginMutationResult = Apollo.MutationResult<LnMarketsLoginMutation>;
export type LnMarketsLoginMutationOptions = Apollo.BaseMutationOptions<LnMarketsLoginMutation, LnMarketsLoginMutationVariables>;