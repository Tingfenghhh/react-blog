import { Options } from 'axios-hooks';
import { AxiosRequestConfig } from 'axios';

type TBody = any;

interface UseAxiosCutomConfig {
  config: AxiosRequestConfig<TBody> | string;
  options: Options;
}
