document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
  
    // Fetch users and display them
    async function fetchUsers() {
      const res = await fetch('/api/users');
      const users = await res.json();
      userList.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${user.name} (${user.age})</span>
          <button class="update" data-id="${user._id}">Update</button>
          <button class="delete" data-id="${user._id}">Delete</button>
        `;
        userList.appendChild(li);
      });
    }
  
    fetchUsers();
  
    // Add new user
    userForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;
  
      await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
      });
  
      userForm.reset();
      fetchUsers();
    });
  
    // Update or delete user
    userList.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
  
      if (e.target.classList.contains('update')) {
        const newName = prompt('Enter new name:');
        const newAge = prompt('Enter new Age');
        if (newName) {
          await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName,age: newAge }),
          });
          fetchUsers();
        }
      }
  
      if (e.target.classList.contains('delete')) {
        await fetch(`/api/users/${id}`, {
          method: 'DELETE',
        });
        fetchUsers();
      }
    });
  });
  