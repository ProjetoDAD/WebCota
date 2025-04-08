    export async function getUsers() {
        const res = await fetch(`https://webcotabackend.onrender.com/users/getUsers`);
        
        if (!res.ok) throw new Error('Erro ao buscar usuários');
        return await res.json();
    }
  
    export async function deleteUser(id) {
        const res = await fetch(`https://webcotabackend.onrender.com/users/delete`, {
            method: "DELETE",
            headers: {
            "id": id,
            "Content-Type": "application/json",
            },
            credentials: "include"
        });

        if (!res.ok) throw new Error('Erro ao deletar usuário');
        return await res.json();
    }
  
    export async function createUser(user) {
        const res = await fetch(`https://webcotabackend.onrender.com/users/addUser`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(user),
        });

        if (!res.ok) throw new Error('Erro ao criar usuário');
        return await res.json();
    }

    export async function atualizarUser(user, id) {
        const res = await fetch("https://webcotabackend.onrender.com/users/atualizar", {
            method: "PUT",
            headers: {
            "id": id,
            "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
            credentials: "include"
        });

        if (!res.ok) throw new Error('Erro ao atualizar usuário');
        return await res.json();
    }

    export async function getUserById(id) {
        const res = await fetch("https://webcotabackend.onrender.com/users", {
            method: "GET",
            headers: {
            "id": id,
            "Content-Type": "application/json",
            },
            credentials: "include"
        });

        if (!res.ok) throw new Error('Erro ao buscar usuário');
        return await res.json();
    }
    