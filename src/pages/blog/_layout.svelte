<script>
  import { url } from '@roxi/routify'
</script>

<article>
  <a href="{$url('/blog')}">Go back</a>
  <slot />
</article>

<style>
  article {
    background-color: whitesmoke;
    color: black;
  }
</style>
