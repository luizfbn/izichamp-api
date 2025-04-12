<h1 align="center" style="font-weight: bold;">Izi champ API 💻</h1>

<p align="center">
  <a href="#tech">Technologies</a> • 
  <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a>
</p>

<p align="center">
    <b>API that provides data on League of Legends champions and skins.</b>
</p>

<p align="center">
     <a href="https://izichamp-api.vercel.app/">📱 Visit this project</a>
</p>

<h2 id="tech">💻 Technologies</h2>

- NodeJS
- Typescript
- Axios
- Fastify

<h2 id="started">🚀 Getting started</h2>

<h3>Prerequisites</h3>

- [NodeJS](https://nodejs.org/en/download)
- [Git](https://git-scm.com/downloads)

<h3>Cloning</h3>

```bash
git clone https://github.com/luizfbn/izichamp-api.git
```

<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env`

```yaml
PORT={YOUR_PORT}
```

<h3>Starting</h3>

```bash
cd izichamp-api
npm install
npm run dev
```

<h2 id="routes">📍 API Endpoints</h2>

| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /</kbd>     | retrieves a list of all champions and skins with price
| <kbd>GET /champions</kbd>     | retrieves a list of all champions
| <kbd>GET /champions/:id</kbd>     | retrieves a specific champion by id
| <kbd>GET /patch</kbd>     | retrieves the current patch
