import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Resume download endpoint
app.get('/api/download-resume', (req, res) => {
  try {
    const resumePath = path.join(__dirname, 'UnityDev_Abhay_Resume_1757416177132.pdf');
    
    if (fs.existsSync(resumePath)) {
      res.download(resumePath, 'Abhay_Prajapati_Resume.pdf', (err) => {
        if (err) {
          console.error('Error downloading file:', err);
          res.status(500).send('Error downloading resume');
        }
      });
    } else {
      res.status(404).send('Resume file not found');
    }
  } catch (error) {
    console.error('Error handling resume download:', error);
    res.status(500).send('Internal server error');
  }
});

// Contact form endpoint (placeholder)
app.post('/api/contact', express.json(), (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    console.log('Contact form submission:', { name, email, subject, message });
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

// Serve index.html for all other routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio server running at http://localhost:${PORT}`);
  console.log('📁 Serving files from:', path.join(__dirname, 'public'));
  console.log('📄 Resume available at: /api/download-resume');
});