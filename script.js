Vue.createApp({
data() {
return {
emailList: [], // ARRAY PER MEMORIZZARE GLI INDIRIZZI EMAIL
};
},
mounted() {
this.generateEmails(); // METODO CHIAMATO QUANDO IL COMPONENTE VIENE MONTATO
},
methods: {
generateEmails() {
const apiUrl = 'https://flynn.boolean.careers/exercises/api/random/mail';

const emailPromises = []; // ARRAY PER MEMORIZZARE LE PROMESSE DELLE CHIAMATE API

for (let i = 0; i < 10; i++) {
    emailPromises.push(axios.get(apiUrl)); // GENERA UNA PROMESSA PER OGNI CHIAMATA API
}

axios
    .all(emailPromises) // ATTENDIAMO IL COMPLETAMENTO DI TUTTE LE PROMESSE
    .then(responses => {
    const emails = responses.map(response => response.data.response); // ESTRAE GLI INDIRIZZI EMAIL DALLE RISPOSTE
    this.emailList = emails; // ASSEGNA GLI INDIRIZZI EMAIL ALL'ARRAY EMAIL LIST
    })
    .catch(error => {
    console.error('Si è verificato un errore nella chiamata API:', error); // GESTIONE DEGLI ERRORI
    });
},
},
}).mount('#app');