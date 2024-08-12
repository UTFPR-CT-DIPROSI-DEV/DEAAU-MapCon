import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { file } = req.query;
  const filePath = path.join(process.cwd(), 'public/images/news', file);

  try {
    const fileContents = await fs.readFile(filePath);

    // Set the appropriate Content-Type based on the file extension
    if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      res.setHeader('Content-Type', 'image/jpeg');
    } else if (file.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    } else if (file.endsWith('.gif')) {
      res.setHeader('Content-Type', 'image/gif');
    } else {
      res.setHeader('Content-Type', 'application/octet-stream');
    }

    res.send(fileContents);
  } catch (err) {
    res.status(404).json({ error: 'File not found' });
  }
}
