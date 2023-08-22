<template>
  <div>
    <!--
    <v-card>
        <v-layout>
        <v-flex xs4>
            <v-card-title>
                {{ Center.name }}
            </v-card-title>
            <img :src=" Center.imageUrl"
            aspect-ratio="1"
            width="200"
            height="200"
            />
            <br>
            <h3 wrap>{{Center.category}}</h3>
        </v-flex>
        <v-flex xs8>
            <h1>Description:</h1><br>
            <p wrap>{{Center.description}}</p>
        </v-flex>
    </v-layout>
    </v-card>
    -->
    <v-card>
        <v-card-title class="justify-center">{{Center.name}}</v-card-title>
        
        <div class="container" style="display: grid; grid-template-columns: auto 1fr;">
            <h2>Description</h2>
            <p style="grid-column: 1 / 2;">{{Center.category+": "+Center.description}}</p>
            <img :src="Center.imageUrl" alt="Imagen" style="grid-column: 2 / 3; margin-right: 10px; border-radius: 5pX;" aspect-ratios="1" width="200" height="200">
           
          </div>
    </v-card>
  </div>
  
</template>

<script>
export default {
    props:{
        Center:{
            type: Object,
            required:true
        }
    }

}
</script>

<style>

</style>