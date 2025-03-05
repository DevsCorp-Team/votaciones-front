# Documentación para Ejecutar el Contenedor de Votaciones Front

Este documento explica cómo ejecutar el contenedor Docker de **Votaciones Front** utilizando la imagen alojada en **GitHub Container Registry**.

## Prerrequisitos
Antes de ejecutar el contenedor, asegúrate de tener instalado lo siguiente:
- **Docker** ([Descargar Docker](https://docs.docker.com/get-docker/))
- Un archivo `.env` con las variables de entorno necesarias
- Un archivo `users.json` con los datos requeridos (debes pasarlo obligatoriamente al contenedor)

## Comando para Ejecutar el Contenedor
Ejecuta el siguiente comando en la terminal:
```bash
docker run --env-file .env -p 3000:3000 -v ${PWD}/db/users.json:/app/db/users.json ghcr.io/devscorp-team/votaciones-front/front
```

### Explicación de los Flags y Argumentos:
- `--env-file .env` → Carga las variables de entorno desde un archivo `.env` local.
- `-p 3000:3000` → Expone el puerto `3000` del contenedor en el puerto `3000` de la máquina local.
- `-v ${PWD}/db/users.json:/app/db/users.json` → Monta obligatoriamente el archivo `users.json` dentro del contenedor en la ruta `/app/db/users.json`, permitiendo persistencia de datos. **Este archivo debe existir previamente**.
- `ghcr.io/devscorp-team/votaciones-front/front` → Imagen del contenedor alojada en **GitHub Container Registry**.

## Creación del Archivo `.env`
Asegúrate de tener un archivo `.env` en el mismo directorio donde ejecutas el comando. Ejemplo:
```env
PORT=3000
SECRET_KEY="ghjkldjsksñd8903owhopde9mw8"
URL_SERVER="http://localhost:3001"
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOnRydWUsImlhdCI6MTc0MTEyNzg1MSwiZXhwIjoxNzQxMjE0MjUxfQ.aZzYZU9-wyQLtQ5S2WhSIACyYSE5KqKaUk6sgTfcgHU"
```

## Acceso a la Aplicación
Una vez que el contenedor esté en ejecución, accede a la aplicación desde el navegador en:
```
http://localhost:3000
```

## Detener el Contenedor
Para detener el contenedor, obtén su ID con:
```bash
docker ps
```
Y luego ejecúta:
```bash
docker stop <CONTAINER_ID>
```
O simplemente usa:
```bash
docker stop $(docker ps -q --filter ancestor=ghcr.io/devscorp-team/votaciones-front/front)
```

## Notas Adicionales
- Si deseas ejecutar el contenedor en **modo demonio**, agrega `-d`:
  ```bash
  docker run -d --env-file .env -p 3000:3000 -v ${PWD}/db/users.json:/app/db/users.json ghcr.io/devscorp-team/votaciones-front/front
  ```
- Asegúrate de que Docker esté en ejecución antes de correr el comando.
- Para ver los logs en tiempo real, usa:
  ```bash
  docker logs -f <CONTAINER_ID>
  ```
