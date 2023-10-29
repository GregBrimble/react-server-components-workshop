# 6 `AsyncLocalStorage`

TODO @greg: Words about AsyncLocalStorage and how it's used in modern frameworks to pass context down without prop drilling

## Goals

1. Configure a Cloudflare D1 database for our app.
1. Configure an `AsyncLocalStorage` instance in our app and use it to access our D1 database.

## Instructions

**Make sure you're in the `./exercises/6-async-local-storage` directory!**

1. In the last exercise, we saw that the `region-worker` needed the `nodejs_compat` compatibility flag added in order to run. The reason we needed this is because the React (server) internals now rely on an API (originally created in Node.js): [`AsyncLocalStorage`](https://github.com/wintercg/proposal-common-minimum-api/blob/main/asynclocalstorage.md). By why should we let React have all the fun? Let's use this in our own app.

   `AsyncLocalStorage` (not to be confused with the completely different browser Web Storage API, [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)) is an API which allows us to create a referencable "store" at some point in our execution and then easily dip back into that store at any point further down in the execution chain, without needing to pass a variable all the way down.

   'Prop drilling' (the practice of passing a property down through many React components in order to get data where it needs to be) is often seen as a problem in React apps, and React created the [Context API](https://react.dev/learn/passing-data-deeply-with-context) as a way to get around that. The `AsyncLocalStorage` API can be thought of in a similar way, but is generalized for JavaScript as a whole, rather than being just for React.

   Let's create an AsyncLocalStorage store in our `region-worker` and ensure we can access it in our app:

   ```tsx
   // ./region-worker/index.tsx
   ```

---

NOTES @greg
