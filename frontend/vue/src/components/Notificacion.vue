<template>
  <div>
  <v-card class="custom-card" @click="gotoLink" >
    <div class="custom-border" :style="{ borderTopColor: Notification.type }" ></div>
    <p style="text-align: right; padding-right: 10px; "  >{{Notification.fecha}}</p>
    <v-card-title>
      <v-icon :color="Notification.type">{{ Notification.icon }}</v-icon>
      {{ Notification.title }}
    </v-card-title>
    <v-card-text style="word-wrap: break-word;">
      {{ Notification.informacion }}
    </v-card-text>
  </v-card>
</div>
</template>

<script>
export default{
    props: {
    Notification: {
      type: Object,
      required: true,
    },
  },
   methods: {
    gotoLink(){
      if (this.$route.name !== this.Notification.link){
        this.$router.push({ name: this.Notification.link }).catch(() => {});
    }
  }
   }
}
</script>

<style scoped>
.custom-card {
  border: none;
  
}

.custom-border {
  border-top: 10px solid;
  margin-bottom: 16px;
}
</style>