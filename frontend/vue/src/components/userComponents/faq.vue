<template>
    <v-card>
        <v-card-title>Preguntas frecuentes sobre las donaciones</v-card-title>
        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(text,i) in this.textContent"
              :key="i"
            >
              <v-expansion-panel-header>
                <h3>{{"¿"+ text.question+"?" }}</h3>
                
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                {{ text.response }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
           


        </v-card-text>
    </v-card>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      textContent: []
    }
  },

  async mounted() {
  
  const response = await axios.get('/info.txt')

   const text = response.data

   this.processText(text)
  console.log(this.textContent)

},
methods: {
  processText(text) {
    const array= text.split(/[¿?]/);
    console.log(array)
    for (let i = 1; i < array.length; i += 2) {
        if (i + 1 < array.length) {
            this.textContent.push({question: array[i], response: array[i+1]});
        } else {
            break;
        }
    }
}
}
}
</script>