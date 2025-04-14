const BASE_URL = 'https://webcotabackend.onrender.com';
    
    export async function getUsers() {
        const res = await fetch(`${BASE_URL}/users/getUsers`);
        
        if (!res.ok){
            const err = await res.text();
            throw new Error(`Erro: ${res.status} - ${err}`);
        }
        return await res.json();
    }
    
  
    export async function deleteUser(id) {
        const res = await fetch(`${BASE_URL}/users/delete`, {
            method: "DELETE",
            headers: {
            "id": id,
            "Content-Type": "application/json",
            },
            credentials: "include"
        });

        if (!res.ok){
            const err = await res.text();
            throw new Error(`Erro: ${res.status} - ${err}`);
        }
        return await res.json();
    }
  
    export async function createUser(user) {
        const res = await fetch(`${BASE_URL}/users/addUser`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(user),
        });

        if (!res.ok){
            const err = await res.text();
            throw new Error(`Erro: ${res.status} - ${err}`);
        }
        return await res.json();
    }

    export async function atualizarUser(user, id) {
        const res = await fetch(`${BASE_URL}/users/atualizar`, {
            method: "PUT",
            headers: {
            "id": id,
            "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
            credentials: "include"
        });

        if (!res.ok){
            const err = await res.text();
            throw new Error(`Erro: ${res.status} - ${err}`);
        }
        return await res.json();
    }

    