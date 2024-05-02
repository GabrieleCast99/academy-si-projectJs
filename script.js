// Funzione per recuperare un singolo utente dalla Email
document.getElementById('getUserByEmailButton').addEventListener('click', getUserByEmail);
async function getUserByEmail() {
    try {
        const email = document.getElementById('emailInput').value;
        const response = await fetch( `http://127.0.0.1:8080/api/utente/get?email=${email} `);
        
        if (!response.ok) {
            throw new Error('Errore durante la richiesta GET');
        }

        const userData = await response.json();


        displaySingolUser(userData);
        console.log('Utente trovato:', userData);
    } catch (error) {
        console.error('Si è verificato un errore:', error);
        alert('Si è verificato un errore durante il recupero dell\'utente. Riprova più tardi.');
    }
}

function displaySingolUser(user) {
    const userSingol = document.getElementById('userSingol');
    userSingol.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Dettagli Utente</h5>
                <p class="card-text"><strong>ID:</strong> ${user.id}</p>
                <p class="card-text"><strong>Nome:</strong> ${user.nome}</p>
                <p class="card-text"><strong>Email:</strong> ${user.email}</p>
            </div>
        </div>
    `;
}




// Funzione per recuperare tutti gli utenti
async function getAllUtenti() {
    try {
        const response = await fetch('http://127.0.0.1:8080/api/utente/getAll');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const utenti = await response.json();
        displayUsers(utenti);
        console.log('Lista utenti:', utenti);
    } catch (error) {
        console.error('Errore durante il recupero della lista degli utenti:', error);
    }
}

function displayUsers(users) {
    const userList = document.getElementById('userList');
    let tableHtml = `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">Ruolo</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    users.forEach(user => {
        let ruoliUtente = user.ruoli.map(ruolo => ruolo.tipologia).join(', ');
        tableHtml += `
            <tr>
                <td>${user.id}</td>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>${ruoliUtente}</td>
            </tr>
        `;
    });

    tableHtml += `
            </tbody>
        </table>
    `;

    userList.innerHTML = tableHtml;
}




// Funzione per creare un nuovo utente
async function creaUtente() {
    try {
        const nome = document.getElementById('nomeInput').value;
        const cognome = document.getElementById('cognomeInput').value;
        const email = document.getElementById('emailInput2').value;
        const password = document.getElementById('passwordInput').value;


        const userData = {
            nome: nome,
            cognome: cognome,
            email: email,
            password: password,
        };

        const response = await fetch('http://127.0.0.1:8080/api/utente/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        console.log('Stato della risposta:', response.status);

        const messageElement = document.getElementById('message');


        if (!response.ok) {
            throw new Error('Errore durante la richiesta POST');
        }

        console.log('Utente creato con successo!');
        messageElement.textContent = 'Utente creato con successo!';
        messageElement.style.color = 'green';


    } catch (error) {
        console.error('Si è verificato un errore durante la creazione dell\'utente:', error);
        alert('Si è verificato un errore durante la creazione dell\'utente. Riprova più tardi.');
        const messageElement = document.getElementById('message');
        messageElement.textContent = 'Si è verificato un errore durante la creazione dell\'utente. Riprova più tardi.';
        messageElement.style.color = 'red';
    }
}

/*
Non ancora funzionante, da rivedere
// Funzione per aggiornare i dati di un utente esistente
async function updateUser() {
    try {
        const emailToUpdate = document.getElementById('emailInputUpdate').value;
        const nome = document.getElementById('nomeInputUpdate').value;
        const cognome = document.getElementById('cognomeInputUpdate').value;
        const ruoloId = document.getElementById('ruoloInput').value; // Assicurati di avere un campo input per l'ID del ruolo

        const userData = {
            nome: nome,
            cognome: cognome,
            ruoloId: ruoloId // Assicurati che il nome della chiave corrisponda al nome usato dal tuo backend per l'identificatore del ruolo
        };

        const response = await fetch(`http://127.0.0.1:8080/api/utente/update?email=${emailToUpdate}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`Errore durante la richiesta PUT: ${response.status}`);
        }

        console.log('Dati utente aggiornati con successo');
        // Aggiorna il messaggio nella pagina HTML
        const messageElement = document.getElementById('message');
        messageElement.textContent = 'Dati utente aggiornati con successo.';
        messageElement.style.color = 'green';


    } catch (error) {
        console.error('Si è verificato un errore:', error);
        alert('Si è verificato un errore durante l\'aggiornamento dei dati dell\'utente. Riprova più tardi.');
    }
}
*/

