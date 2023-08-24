<template>
  <v-app>
    <v-container fluid class="background-container fill-container">
        <v-row justify-center>
            <v-col cols="12"
            sm="6"
            v-for="Center in Centers"
            :key="Center.name"
            class="mb-4"
            >
             <MedicalCenter :Center="Center"/>
        </v-col>

        </v-row>
    </v-container>
  </v-app>
</template>

<script>
import MedicalCenter from '@/components/MedicalCenter.vue';
export default {
    data(){
        return{
            Centers: [
                {name:"AAA",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod eu lorem et ultricies. In porta lorem at dui semper porttitor. Nullam quis cursus dui. Cras tincidunt vehicula tellus eu facilisis. Donec nisi turpis, iaculis et arcu a, aliquet ultrices nisl. Nam in pharetra odio, ac blandit metus. Suspendisse potenti.", imageUrl: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.readingpublicmuseum.org%2Fexhibit_secrets-of-mona-lisa-4.jpg&f=1",ubication:{lat:"aaa",long:"bbb"},category:"Hospital"},
                {name:"BBB",description:"LOreeeeeeeeeeemmmmmmmm sadasdasdsadawwfjlaskjfsla", imageUrl: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.readingpublicmuseum.org%2Fexhibit_secrets-of-mona-lisa-4.jpg&f=1",ubication:{lat:"aaa",long:"bbb"},category:"Hospital"},
                {name:"CCC",description:"LOreeeeeeeeeeemmmmmmmm sadasdasdsadawwfjlaskjfsla", imageUrl: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.readingpublicmuseum.org%2Fexhibit_secrets-of-mona-lisa-4.jpg&f=1",ubication:{lat:"aaa",long:"bbb"},category:"Hospital"},
                {name:"DDD",description:"LOreeeeeeeeeeemmmmmmmm sadasdasdsadawwfjlaskjfsla", imageUrl: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.readingpublicmuseum.org%2Fexhibit_secrets-of-mona-lisa-4.jpg&f=1",ubication:{lat:"aaa",long:"bbb"},category:"Hospital"},
                {name:"EEE",description:"LOreeeeeeeeeeemmmmmmmm sadasdasdsadawwfjlaskjfsla", imageUrl: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.readingpublicmuseum.org%2Fexhibit_secrets-of-mona-lisa-4.jpg&f=1",ubication:{lat:"aaa",long:"bbb"},category:"Hospital"},
                {name:"FFF",description:"LOreeeeeeeeeeemmmmmmmm sadasdasdsadawwfjlaskjfsla", imageUrl: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.readingpublicmuseum.org%2Fexhibit_secrets-of-mona-lisa-4.jpg&f=1",ubication:{lat:"aaa",long:"bbb"},category:"Hospital"},

            ]
        }
    },
   components:{
    MedicalCenter
   }
}
</script>

<style>
.background-container {
  background-image: url("../assets/back1.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.fill-container {
  height: 100%;
  min-height: calc(100vh - 64px); /* Ajusta la altura según tus necesidades */
}
</style>