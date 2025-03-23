document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('teamForm');
    const teamTable = document.getElementById('teamTable').querySelector('tbody');

    function loadTeamMembers() {
        fetch('http://localhost:3000/api/team')
            .then(response => response.json())
            .then(data => {
                teamTable.innerHTML = '';
                data.forEach(member => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${member.name}</td>
                        <td>${member.email}</td>
                        <td>${member.contact}</td>
                        <td>
                            <button class="update-btn" data-id="${member.id}">Update</button>
                            <button class="delete-btn" data-id="${member.id}">Delete</button>
                        </td>
                    `;
                    teamTable.appendChild(row);
                });

                attachEventListeners();
            })
            .catch(error => console.error('Error loading team members:', error));
    }

    function attachEventListeners() {
        
        document.querySelectorAll('.update-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                updateTeamMember(id);
            });
        });

        
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this team member?')) {
                    await deleteTeamMember(id);
                }
            });
        });
    }

    async function updateTeamMember(id) {
        const newName = prompt("Enter new name:");
        const newEmail = prompt("Enter new email:");
        const newContact = prompt("Enter new contact number:");

        if (!newName || !newEmail || !newContact) {
            alert("All fields are required!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/team/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newName,
                    email: newEmail,
                    contact: newContact
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update team member');
            }

            loadTeamMembers();
        } catch (error) {
            console.error('Error updating team member:', error);
        }
    }

    async function deleteTeamMember(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/team/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete team member');
            }

            loadTeamMembers();
        } catch (error) {
            console.error('Error deleting team member:', error);
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        try {
            const response = await fetch('http://localhost:3000/api/team', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to add team member');
            }

            form.reset();
            loadTeamMembers();
        } catch (error) {
            console.error('Error adding team member:', error);
        }
    });

    loadTeamMembers();
});
