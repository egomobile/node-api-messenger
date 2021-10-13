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

/**
 * Valid values for an API message content type.
 */
export type ApiMessageContentType =
    'text/html' |
    'text/markdown' |
    'text/mjml+xml' |
    'text/plain';

/**
 * An API messenger.
 */
export interface IApiMessenger {
    /**
     * Sends a message.
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
     *
     * const result = await messenger.sendMessages({
     *   message: {
     *     content: 'PGI+TG9yZW0gaXNwdW0hPC9iPg==',
     *     content_type: 'text/html'
     *   },
     *   subject: 'Lorem ipsum',
     *   to: ['mailto:test2@example.com', 'mailto:test2@example.com']
     * })
     *
     * console.log(result)
     * ```
     *
     * @param {ISendApiMessageOptions[]} messages The one or more options, representing the message data.
     *
     * @returns {Promise<ISendApiMessageResultItem[]>} The promise with the results.
     */
    sendMessages(...messages: ISendApiMessageOptions[]): Promise<ISendApiMessageResultItem[]>;
}

/**
 * Options for 'createApiMessenger()' function.
 */
export interface ICreateApiMessengerOptions {
    /**
     * Auth options.
     */
    auth: {
        /**
         * The client ID.
         */
        clientId: string;
        /**
         * The client secret.
         */
        clientSecret: string;
    };
    /**
     * The base URL of the API.
     */
    baseURL: string;
}

/**
 * An API message attachment.
 */
export interface IApiMessageAttachment {
    /**
     * The content as Base64 string.
     */
    content: string;
    /**
     * The (file)
     */
    name: string;
}

/**
 * The content of an API message.
 */
export interface IApiMessage {
    /**
     * The content as Base64 string.
     */
    content: string;
    /**
     * The content type.
     */
    content_type: ApiMessageContentType;
}

/**
 * Options for 'sendMessage()' method of 'IApiMessenger'.
 */
export interface ISendApiMessageOptions {
    /**
     * One or more optional attachments to send.
     */
    attachments?: IApiMessageAttachment[];
    /**
     * Include footer or not.
     */
    footer?: boolean;
    /**
     * Custom display name for sender.
     */
    from?: string;
    /**
     * Include header or not.
     */
    header?: boolean;
    /**
     * The message to send.
     */
    message: IApiMessage;
    /**
     * The subject.
     */
    subject?: string;
    /**
     * Name of a custom (sub-)template.
     */
    template?: string;
    /**
     * One or more recipients.
     */
    to: string[];
}

/**
 * A result item of a 'sendMessages()' call.
 */
export interface ISendApiMessageResultItem {
    /**
     * Operation was successful or not.
     */
    success: boolean;
    /**
     * The duration in milliseconds, the operation needed.
     */
    duration: number;
    /**
     * Error message, if success is not (true).
     */
    error?: string;
}
