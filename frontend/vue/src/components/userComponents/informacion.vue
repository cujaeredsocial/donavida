<template>
    <v-card>
        <v-card-title>Preguntas frecuentes sobre las donaciones</v-card-title>
        <v-card-text>
            <p v-html="processText(textContent)"></p>
           


        </v-card-text>
    </v-card>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      textContent: ''
    }
  },

  async mounted() {
  
  const response = await axios.get('/info.txt')

  this.textContent = response.data

},
methods: {
  processText(text) {
    text =  text.replace(/\¿/g, '<br><br>?');
    text = text.replace(/\?(.*?)\?/g, '<h3>¿$1?</h3>');
    return text
}
}
}
</script>