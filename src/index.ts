/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */

// This file is part of the @egomobile/api-messenger distribution.
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

import { ApiMessenger } from './classes/ApiMessenger';
import type { ICreateApiMessengerOptions, IApiMessenger } from './types';

/**
 * Creates a new API messenger client.
 *
 * @example
 * ```
 * import createApiMessenger from '@egomobile/api-messenger'
 *
 * const messenger = createApiMessenger({
 *   baseURL: 'https://api.example.com/',
 *   auth: {
 *     clientId: '<YOUR-CLIENT-ID>',
 *     clientSecret: '<YOUR-CLIENT-SECRET>'
 *   }
 * })
 * ```
 *
 * @param {ICreateApiMessengerOptions} options The options.
 *
 * @returns {IApiMessenger} The new instance.
 */
export function createApiMessenger(options: ICreateApiMessengerOptions): IApiMessenger {
    return new ApiMessenger(options);
}

/**
 * @inheritdoc
 */
export default createApiMessenger;

export * from './types';
