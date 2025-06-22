const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors());
app.get('/api/tiktok18', async (req, res) => {
  try {
    const { data: html } = await axios.get('https://tiktok18.porn', {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    const $ = cheerio.load(html);
    const results = [];
    $('div.swiper-slide').each((i, el) => {
      const username = $(el).attr('data-username');
      const video = $(el).find('video').attr('data-src');
      if (username && video) {
        results.push({ username, video });
      }
    });
    if (results.length === 0) {
      return res.status(404).json({ error: 'Nenhum vídeo encontrado' });
    }
    const random = results[Math.floor(Math.random() * results.length)];
    res.json({
      criador: "@waymauri",
      resultado: {
        username: random.username,
        download: random.video
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar os vídeos' });
  }
});
app.listen(PORT, () => {
  console.log(`✅ API rodando em http://localhost:${PORT}/api/tiktok18`);
});