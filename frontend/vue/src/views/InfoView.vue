<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="8">
                    <v-card 
                    class="elevation-10"
                    style="background-color:rgb(255, 0, 0, 0.3); color:white"
                    >
                         <v-card-title><h1>Requisitos para ser donante</h1></v-card-title>
                         <v-card-text>
                                <v-list-item v-for="item in infos" :key="item.id" class="white--text my-list">
                                    <v-list-item-icon>
                                        <!-- Utiliza el componente v-icon aprovechando las clases de Vuetify -->
                                        <v-icon class="white--text">mdi-checkbox-marked</v-icon>
                                      </v-list-item-icon>
                                    <br>
                                    <h2>{{item}}</h2>
                                </v-list-item>
                                <v-card-title class="white--text"><h1>¿Cuál es el procedimiento para donar sangre?</h1></v-card-title> 
                               <h3 class="white--text"> El proceso varía un poco dependiendo del tipo de donación. 
                                Registrarse y realizar la verificación de salud podría tomar entre 30 y 45 minutos. 
                                La donación de sangre en sí toma menos de 15 minutos. 
                                Las donaciones de plaquetas, plasma o de 
                                glóbulos rojos pueden tomar entre 80 y 120 minutos. 
                                El proceso general de donación está detallado aquí.</h3>
                                <br>
                                <h3 class="white--text"> <v-icon class="white--text" prepend-icon>mdi-note</v-icon>  Registro: Te identificarás, mostrarás tu documento de identidad y leerás información sobre la donación.</h3>
                                <br>
                                <h3 class="white--text"> <v-icon class="white--text" prepend-icon>mdi-folder</v-icon>  Historial médico y verificación de salud: Completarás un cuestionario sobre tu salud, historial de viajes y estilo de vida para confirmar tu elegibilidad. También te tomarán la temperatura, la presión arterial, los niveles de glóbulos rojos o hemoglobina y el pulso.</h3>
                                <br>
                                <h3 class="white--text"> <v-icon class="white--text" prepend-icon>mdi-water</v-icon>  La donación: Deberás sentarte en una posición cómoda mientras te limpian y esterilizan tu brazo. Te mantendrás sentado mientras se extrae la sangre de tu brazo. Una vez que se termina la donación, colocarán una venda en tu brazo. Una donación completa de sangre es de hasta 500 mililitros o, aproximadamente, 17 onzas.</h3>
                                <br>
                                <h3 class="white--text"> <v-icon class="white--text" prepend-icon>mdi-food</v-icon>  Merienda y recuperación: Disfrutarás una merienda ligera y una bebida mientras esperas de 10 a 15 minutos. Después, podrás levantarte y volver a tus actividades.</h3>
                                <br>
                                <v-card-title class="white--text"><h1>¿Qué debo hacer después de la donación?</h1></v-card-title> 
                                <h3 class="white--text">Mantén la venda en tu brazo durante las próximas horas. Después de quitarte la venda, mantén el área limpia lavándola con agua y jabón. Debes evitar practicar actividades intensas durante, al menos, las cuatro horas después de la donación, y asegurarte de mantenerte hidratado por las próximas 48 horas. Considera comer alimentos ricos en hierro y vitamina C para contribuir a la restauración de nutrientes en tu cuerpo.
                                    Algunos donantes pueden sentir mareos leves, aturdimiento, fatiga, hematomas, sangrado o dolor; pero estos síntomas deben desaparecer rápidamente. Si tienes síntomas graves contacta a un médico inmediatamente.</h3>
                                    <v-card-title class="white--text"><h1>¿Cuándo puedo donar nuevamente?</h1></v-card-title> 
                                    <h3 class="white--text">La necesidad de sangre es constante, así que considera hacer la donación de sangre un hábito regular.. Las donaciones regulares de varias personas garantizan que toda persona que necesite sangre pueda obtenerla. También garantiza que haya una provisión estable de sangre donada y que no haya escasez.</h3>
                                </v-card-text>
                    </v-card>
                </v-col>
                <v-col sm="4">
                    <div >
                    <v-img
                width="600"
                height="500"
            aspect-ratio="3" 
            src="../assets/req.gif">
                </v-img>
            </div>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
export default {
    data(){
        return{
            infos:['Buena salud física y mental',
        "Peso de al menos 50 kg",
        "Debe ser libre de : Diabetes, Cancer, Enfermedades ogánicas, Enfermedades infecciosas, Descontrolada presion arterial",
        "No estar embarazada",
        "No haber realizado donaciones previas a 12 semanas"
        ]
        }
    }
}
</script>

<style>
.my-list {
    list-style-type: disc; /* utilizar "disc" para puntos o "|" para plecas */
    color: white;
  }
</style>