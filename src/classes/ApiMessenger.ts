/* eslint-disable unicorn/filename-case */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */// This file is part of the @egomobile/api-messenger distribution.

// Copyright (c) Next.e.GO Mobile SE, Aachen, Germany (https://e-go-mobile.com/)
//
// @egomobile/api-messenger is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as
// published by the Free Software Foundation, version 3.
//
// @egomobile/api-messenger is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

import axios, { AxiosInstance } from 'axios';
import { URLSearchParams } from 'url';
import { IApiMessenger, ICreateApiMessengerOptions, ISendApiMessageOptions, ISendApiMessageResultItem } from '../types';

type WithClientAction<T extends any = any> = (client: AxiosInstance) => Promise<T>;

/**
 * Implementation of 'IApiMessenger' interface.
 */
export class ApiMessenger implements IApiMessenger {
    private _axiosClient: AxiosInstance | undefined;

    /**
     * Initializes a new instance of that class.
     *
     * @param {ICreateApiMessengerOptions} _options The options.
     */
    public constructor(
        private readonly _options: ICreateApiMessengerOptions
    ) { }

    /**
     * @inheritdoc
     */
    public sendMessages(...messages: ISendApiMessageOptions[]): Promise<ISendApiMessageResultItem[]> {
        return this.withClient(async (client) => {
            const response = await client.post('/v1', messages);

            if (response.status !== 200) {
                throw Error(`Unexpected response: ${response.status}`);
            }

            return response.data;
        });
    }

    private async withClient<T extends any = any>(action: WithClientAction) {
        let client = this._axiosClient;
        if (!client) {
            const baseURL = this._options.baseURL.trim();

            const oAuthParams = new URLSearchParams();
            oAuthParams.set('grant_type', 'client_credentials');
            oAuthParams.set('client_id', this._options.auth.clientId);
            oAuthParams.set('client_secret', this._options.auth.clientSecret);

            const oAuthClient = axios.create({
                baseURL,
                validateStatus: () => true
            });

            const oAuthResponse = await oAuthClient.post<any>(
                '/auth/v1/oauth2/token',
                oAuthParams.toString()
            );

            if (oAuthResponse.status !== 200) {
                throw new Error(`Unexpected response: ${oAuthResponse.status}`);
            }

            if (typeof oAuthResponse.data !== 'object') {
                throw new TypeError(`Unexpected response data: ${oAuthResponse.data}`);
            }

            const access_token = oAuthResponse.data.access_token;
            if (typeof access_token !== 'string') {
                throw new TypeError(`Unexpected type of access_token: ${access_token}`);
            }

            client = axios.create({
                baseURL: baseURL + (baseURL.endsWith('/') ? '' : '/') + 'messages',
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                validateStatus: () => true
            });
        }

        return action(client);
    }
}
