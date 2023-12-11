import { Options } from 'axios-hooks';
import { AxiosRequestConfig } from 'axios';

type TBody = any;

interface UseAxiosCustomConfig {
  config: AxiosRequestConfig<TBody> | string;
  options: Options;
}
