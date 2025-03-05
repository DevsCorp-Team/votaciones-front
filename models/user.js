import jwt from 'jsonwebtoken';
import fs from 'node:fs/promises';

export class User {
    constructor () {
        this.userURL = 'db/users.json';
        this.candidatosURL = 'db/candidatos.json';
    }

    async login ({ id, pin }) {
        let data = await fs.readFile(this.userURL, 'utf8');
        
        let user = JSON.parse(data).find(user => user.id === id);

        if (!user) {
            throw new Error('User not found');
        }

        if (user.pin !== pin || user.voto === true) {
            throw new Error('Invalid pin or user already voted');
        }

        const token = jwt.sign({
            id
        }, 
        process.env.SECRET_KEY, {
            expiresIn: '1h'
        });

        return { token };
    }

    async personeria ({ data }) {
        const id = data.data.id
        const dataCandidato = await fs.readFile(this.candidatosURL, 'utf-8')
        const dataParse = JSON.parse(dataCandidato);
        const fined = dataParse.personeria.find(u => u.id == id)
        fined.votos = fined.votos + 1;
        await fs.writeFile(this.candidatosURL, JSON.stringify(dataParse, null, 2), 'utf-8')
        
        const requestData = { id }

        fetch(`${process.env.URL_SERVER}/api/voto/personeria`, {
            method: "POST",
            headers: {
              "Authorization": `${process.env.TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData)
        })
        .then(data => {
            if (data.status !== 201) console.log("A error ocurred while data are trasnmising to the main server.")
        }).catch(err => {
            return new Error(err)
        })

        return { message: "Ok" }
    }

    async contraloria ({ data }) {
        const id = data.data.id
        const dataCandidato = await fs.readFile(this.candidatosURL, 'utf-8')
        const dataParse = JSON.parse(dataCandidato);
        const fined = dataParse.contraloria.find(u => u.id == id)
        fined.votos = fined.votos + 1;
        await fs.writeFile(this.candidatosURL, JSON.stringify(dataParse, null, 4), 'utf-8')
        
        const requestData = { id }

        fetch(`${process.env.URL_SERVER}/api/voto/contraloria`, {
            method: "POST",
            headers: {
              "Authorization": `${process.env.TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData)
        })
        .then(data => {
            if (data.status !== 201) console.log("A error ocurred while data are trasnmising to the main server.")
        }).catch(err => {
            return new Error(err)
        })
        
        return { message: "Ok" }
    }

    async userState ({ data }) {
        const id = data.data.id
        const dataCandidato = await fs.readFile(this.userURL, 'utf-8')
        const dataParse = JSON.parse(dataCandidato);
        const fined = dataParse.find(u => u.id == id)
        fined.voto = true;
        await fs.writeFile(this.userURL, JSON.stringify(dataParse, null, 4), 'utf-8')
        return { message: "Ok" }
    }
}