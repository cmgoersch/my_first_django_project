// scripts.js
function addItem() {
    let itemName = prompt('Neues Element hinzufügen');
    let token = '{{ csrf_token }}';
    let formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('csrfmiddlewaretoken', token);

    fetch('/mylist/', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Nur neu laden, wenn die Antwort erfolgreich ist
            window.location.reload();
        } else {
            // Fehlerbehandlung
            alert('Es gab ein Problem beim Hinzufügen des Elements.');
        }
    })
    .catch(error => {
        // Netzwerkanfrage fehlgeschlagen
        console.error('Fetch-Fehler:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    });
}