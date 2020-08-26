<script>
  // PRIMARY LAYOUT
  export let scoped

  $: console.log('LAYOUT FRONTMATTER', scoped)
</script>

<main>
  <slot />
</main>

<style>
  main {
    background-color: tomato;
    color: black;
  }
</style>
