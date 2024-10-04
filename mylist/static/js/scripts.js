// Temporäre Variable zum Speichern der ID des zu löschenden Elements
let itemIdToDelete = null;

// Öffnet das Modal für das Hinzufügen von Elementen
function openModal() {
    document.getElementById('itemModal').style.display = 'block';
}

// Schließt das Hinzufügen-Modal und sendet das Formular ab
function addItem() {
    let itemName = document.getElementById('itemNameInput').value;
    let token = document.getElementById('csrfTokenInput').value; // CSRF-Token aus dem versteckten Feld
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

// Schließt das Hinzufügen-Modal, wenn man außerhalb des Inhalts klickt
window.onclick = function(event) {
    let modal = document.getElementById('itemModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Schließt das Hinzufügen-Modal ohne Aktion auszuführen
function closeModal() {
    document.getElementById('itemModal').style.display = 'none';
}

// Öffnet das benutzerdefinierte Bestätigungs-Popup
function deleteItem(itemId) {
    itemIdToDelete = itemId; // Speichert die ID des zu löschenden Elements
    document.getElementById('confirmModal').style.display = 'block'; // Zeigt das Bestätigungs-Popup an
}

// Bestätigt das Löschen und sendet den DELETE-Request
document.getElementById('confirmDelete').onclick = function() {
    if (itemIdToDelete !== null) {
        let token = document.getElementById('csrfTokenInput').value; // CSRF-Token aus dem versteckten Feld
        fetch(`/mylist/${itemIdToDelete}/`, {
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

        closeConfirmModal(); // Schließt das Bestätigungs-Popup
    }
}

// Schließt das Bestätigungs-Popup ohne zu löschen
function closeConfirmModal() {
    document.getElementById('confirmModal').style.display = 'none';
}