# Slides

[Google Slides](https://docs.google.com/presentation/d/1nS69MFKWgzd9vWWPybAe9NhjUtX9IoazB1MHutCdsI8/edit?usp=sharing)

# Prerequisites

- [Node.js 20.9.0 and npm 10.1.0](https://nodejs.org/en/download)

  I recommend using a version manager like [Volta](https://volta.sh/), [asdf](https://asdf-vm.com/) or [nvm](https://github.com/nvm-sh/nvm).

- [Git](https://git-scm.com/downloads)

- A code editor

  I recommend [Visual Studio Code](https://code.visualstudio.com/Download).

- A [Cloudflare account](https://dash.cloudflare.com/sign-up/workers)

  Sign up and verify your email address.

# Getting started

1.  Clone the workshop repository with Git:

    ```sh
    git clone https://github.com/GregBrimble/react-summit-2023-workshop.git
    ```

    Or if you prefer using SSH:

    ```sh
    git clone git@github.com:GregBrimble/react-summit-2023-workshop.git
    ```

1.  Open this folder in your favorite code editor. I recommend VSCode.

1.  Install the dependencies using `npm`:

    ```sh
    npm install
    ```

1.  Log in with Wrangler:

    ```sh
    npx wrangler login
    ```

1.  Populate the `CLOUDFLARE_WORKERS_SUBDOMAIN` value in `./constants.ts`. You can find your subdomain in the sidebar of [the Cloudflare Workers & Pages dashboard](https://dash.cloudflare.com/?to=/:account/workers-and-pages).

1.  Get started with the first exercise in `./exercises/1-client-side-rendering`. Check out the `README.md` file for instructions!

## Contents

1. [Client-side rendering](./exercises/1-client-side-rendering)
1. [Intro to Workers](./exercises/2-intro-to-workers)
1. [Server-side rendering](./exercises/3-server-side-rendering)
1. [RSC data loading](./exercises/4-rsc-data-loading)
1. [RSC compiler](./exercises/5-rsc-compiler)
1. [Loading data from a database](./exercises/6-loading-data-from-a-database)
1. [Smart Placement](./exercises/7-smart-placement)

## What's next?

**Thank you for participating in this React Summit 2023 workshop! I hope you found it valuable and had fun. Please consider taking a few minutes to fill in [this survey](https://forms.gle/o9yEBzhiX7JDNGgq8) so I can improve for next time!**

After you've completed this workshop, there is much more you can explore with React Server Components and the Cloudflare Developer Platform. Some other topics of interest may include:

- [Server Actions](https://react.dev/reference/react/use-server#server-actions-in-forms)
- Module splitting
- Lazy-loading on the client (and server!)
- [AsyncLocalStorage](https://github.com/wintercg/proposal-common-minimum-api/blob/main/asynclocalstorage.md)
- [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects)
- [Flight ESM fixture](https://github.com/facebook/react/tree/main/fixtures/flight-esm)
