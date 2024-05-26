document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const userList = document.getElementById('userList');

    const getUsersFromLocalStorage = () => JSON.parse(localStorage.getItem('users') || '[]');
    const setUsersToLocalStorage = (users) => localStorage.setItem('users', JSON.stringify(users));

    const renderUserList = () => {
        userList.innerHTML = getUsersFromLocalStorage().map(user => `
            <li class="user-item">
                ${user.nombre} ${user.apellido} (${user.correo})
                <button class="delete" data-id="${user.id}">Eliminar</button>
            </li>
        `).join('');
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = {
            id: Date.now(),
            nombre: form.nombre.value,
            apellido: form.apellido.value,
            correo: form.correo.value,
            contraseña: form.contraseña.value,
        };
        if (form.contraseña.value !== form.confirmarContraseña.value) {
            alert('Las contraseñas no coinciden');
            return;
        }
        const users = getUsersFromLocalStorage();
        users.push(user);
        setUsersToLocalStorage(users);
        renderUserList();
        form.reset();
    });

    userList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const userId = e.target.dataset.id;
            const users = getUsersFromLocalStorage().filter(user => user.id != userId);
            setUsersToLocalStorage(users);
            renderUserList();
        }
    });

    renderUserList();
});
