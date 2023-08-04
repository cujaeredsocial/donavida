<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <hello-world />
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",

  components: {
    HelloWorld,
  },
};
</script>
