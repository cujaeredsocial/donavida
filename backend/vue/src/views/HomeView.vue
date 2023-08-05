<template>
  <hello-world />
</template>
// eslint-disable-next-line prettier/prettier

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
