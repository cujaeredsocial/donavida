<template>
  <div>
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