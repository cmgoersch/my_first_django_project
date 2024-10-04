// scripts.js

// Öffnet das Modal
function openModal() {
    document.getElementById('itemModal').style.display = 'block';
}

// Schließt das Modal und sendet das Formular ab
function addItem() {
    let itemName = document.getElementById('itemNameInput').value;
    let token = document.getElementById('csrfTokenInput').value; // Token aus verstecktem Feld
    let formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('csrfmiddlewaretoken', token); // CSRF-Token in Formulardaten

    fetch('/mylist/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': token // CSRF-Token im Header setzen
        }
    })
    .then(response => {
        if (response.ok) {
            window.location.reload();
        } else {
            alert('Es gab ein Problem beim Hinzufügen des Elements.');
        }
    })
    .catch(error => {
        console.error('Fetch-Fehler:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    });

    // Schließt das Modal nach dem Absenden
    document.getElementById('itemModal').style.display = 'none';
}

// Schließt das Modal, wenn man außerhalb des Inhalts klickt
window.onclick = function(event) {
    let modal = document.getElementById('itemModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Schließt das Modal ohne Aktion auszuführen
function closeModal() {
    document.getElementById('itemModal').style.display = 'none';
}

function deleteItem(itemId) {
    let token = document.getElementById('csrfTokenInput').value; // CSRF-Token aus dem versteckten Feld
    fetch(`/mylist/${itemId}/`, {  // Endpoint anpassen, falls nötig
        method: 'DELETE',
        headers: {
            'X-CSRFToken': token, // CSRF-Token im Header setzen
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            window.location.reload(); // Seite aktualisieren, um das gelöschte Element zu entfernen
        } else {
            alert('Es gab ein Problem beim Löschen des Elements.');
        }
    })
    .catch(error => {
        console.error('Fetch-Fehler:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    });
}