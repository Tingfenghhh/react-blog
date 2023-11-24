import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@arco-design/web-react/dist/css/index.less';
import '@/assets/style/custom.less';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
