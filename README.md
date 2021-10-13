[![npm](https://img.shields.io/npm/v/@egomobile/api-messenger.svg)](https://www.npmjs.com/package/@egomobile/api-messenger)
[![last build](https://img.shields.io/github/workflow/status/egomobile/node-api-messenger/Publish)](https://github.com/egomobile/node-api-messenger/actions?query=workflow%3APublish)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/egomobile/node-api-messenger/pulls)

# @egomobile/api-messenger

> A client using an API to send messages, like emails, written in [TypeScript](https://www.typescriptlang.org/).

## Install

Execute the following command from your project folder, where your `package.json` file is stored:

```bash
npm install --save @egomobile/api-messenger
```

## Usage

```typescript
import createApiMessenger from "@egomobile/api-messenger";

async function main() {
  const messenger = createApiMessenger({
    baseURL: "https://api.example.com/",
    auth: {
      clientId: "<YOUR-CLIENT-ID>",
      clientSecret: "<YOUR-CLIENT-SECRET>",
    },
  });

  const result = await messenger.sendMessages({
    message: {
      content: "PGI+TG9yZW0gaXNwdW0hPC9iPg==",
      content_type: "text/html",
    },
    subject: "Lorem ipsum",
    to: ["mailto:test2@example.com", "mailto:test2@example.com"],
  });

  console.log(result);
}

main().error(console.error);
```

## Documentation

The API documentation can be found [here](https://egomobile.github.io/node-api-messenger/).
