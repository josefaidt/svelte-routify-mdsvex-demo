# Svelte, Routify, MDsveX demo

## What's Included

- Svelte
- Routify v2
- MDsveX
- Svite
- GraphQL Data Layer
- Site metadata config `app.config.js`

## Getting Started

1. Install dependencies `yarn install`
2. Run the dev server `yarn dev`

### Querying Data

To query data from the GraphQL layer, define a constant with the name of `query` in your Svelte/MDsveX file:

```html
<script>
  const query = `
    query SITE_METADATA {
      meta {
        title
      }
    }
  `
</script>

<svelte:head>
  <title>{query.meta.title}</title>
</svelte:head>
```

Data will then be populated into the variable before further processing.

### Modifying the GraphQL Layer

All files related to the GraphQL layer can be found in [support](./support) and can be modified to your liking. Please note the GraphQL Layer is a work-in-progress and will be updated as necessary.
