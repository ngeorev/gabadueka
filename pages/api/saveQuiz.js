import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data = req.body || {};

  try {
    const dataDir = path.join(process.cwd(), 'data');

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, 'quiz_results.json');

    let existing = [];
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8');
      try {
        existing = JSON.parse(raw || "[]");
      } catch (err) {
        existing = [];
      }
    }

    // Save quiz result with readable timestamp
    const entry = { 
      ...data, 
      timestamp: new Date().toISOString() 
    };

    existing.push(entry);

    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    return res.status(200).json({ status: 'success' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', error: err.message });
  }
}

