const express = require('express');
const app = express();

app.use(express.json());

// Estimation basée sur une moyenne de ~4g CO2 par requête générative
app.post('/calculate-emissions', (req, res) => {
  const { promptCount } = req.body;

  if (typeof promptCount !== 'number' || promptCount < 0) {
    return res.status(400).json({ error: 'promptCount doit être un nombre positif' });
  }

  const gramsCo2 = promptCount * 4;
  res.json({
    prompts: promptCount,
    estimatedCo2Grams: gramsCo2,
    equivalentInSmartphonesCharged: Math.round(gramsCo2 / 5)
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
}
