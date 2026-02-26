import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middlewares/error.middleware';

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});


app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
