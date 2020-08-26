<script>
  // PRIMARY LAYOUT
  export let title
  export let date

  console.log('FRONTMATTER TITLE - DATE', title, date)
</script>

<slot scoped="{{ title, date }}" />
