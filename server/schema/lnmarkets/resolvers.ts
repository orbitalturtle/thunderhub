import { getLnMarketsAuth } from 'server/helpers/lnAuth';
import { logger } from 'server/helpers/logger';
import { requestLimiter } from 'server/helpers/rateLimiter';
import { ContextType } from 'server/types/apiTypes';
import { appConstants } from 'server/utils/appConstants';
import { appUrls } from 'server/utils/appUrls';
import cookie from 'cookie';

export const lnMarketsResolvers = {
  Query: {
    getLnMarketsUserInfo: async (
      _: undefined,
      __: undefined,
      context: ContextType
    ) => {
      const { lnMarketsAuth, lnd, res } = context;

      const { newCookie, cookieString, json } = await getLnMarketsAuth(
        lnd,
        lnMarketsAuth
      );

      if (!json && !lnMarketsAuth) {
        throw new Error('ProblemAuthenticatingWithLnMarkets');
      }

      if (newCookie && cookieString) {
        res.setHeader(
          'Set-Cookie',
          cookie.serialize(appConstants.lnMarketsAuth, cookieString, {
            httpOnly: true,
            sameSite: true,
            path: '/',
          })
        );
      }

      try {
        const response = await fetch(`${appUrls.lnMarkets}/user`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${cookieString}`,
          },
        });
        const json = await response.json();

        logger.debug('Get userInfo from LnMarkets: %o', json);

        if (json?.code === 'jwtExpired') {
          throw new Error();
        }

        return json;
      } catch (error) {
        logger.error(
          `Error getting user info from ${appUrls.lnMarkets}/user. Error: %o`,
          error
        );
        throw new Error('ProblemAuthenticatingWithLnMarkets');
      }
    },
  },
  Mutation: {
    lnMarketsLogin: async (
      _: undefined,
      __: undefined,
      context: ContextType
    ) => {
      await requestLimiter(context.ip, 'lnMarketsLogin');
      const { lnd, res } = context;

      const { cookieString, json } = await getLnMarketsAuth(lnd);

      if (!json || !cookieString) {
        throw new Error('ProblemAuthenticatingWithLnMarkets');
      }

      if (json.status === 'ERROR') {
        return { ...json, message: json.reason || 'LnServiceError' };
      }

      res.setHeader(
        'Set-Cookie',
        cookie.serialize(appConstants.lnMarketsAuth, cookieString, {
          httpOnly: true,
          sameSite: true,
          path: '/',
        })
      );

      return { ...json, message: 'LnMarketsAuthSuccess' };
    },
  },
};
