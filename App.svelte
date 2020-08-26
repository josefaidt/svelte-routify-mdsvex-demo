<script>
  export let title
  import { Router } from '@sveltech/routify'
  import { routes } from '@sveltech/routify/tmp/routes'
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Router routes="{routes}" />
