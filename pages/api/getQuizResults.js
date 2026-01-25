import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const dataDir = path.join(process.cwd(), 'data');
  const filePath = path.join(dataDir, 'quiz_results.json');

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(200).json([]);
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(data || "[]");

    res.status(200).json(parsed);

  } catch (err) {
    console.error('Error reading quiz results:', err);
    res.status(500).json({ error: 'Failed to read results' });
  }
}
