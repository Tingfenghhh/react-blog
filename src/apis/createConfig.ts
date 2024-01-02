import { AxiosRequestConfig, Method } from 'axios';
import { TBody, UseAxiosCustomConfig } from '@/typings/customConfig';

const defaultOptions: UseAxiosCustomConfig['options'] = {
  manual: true,
};

/**
 * 创建 axios-hooks 的 config
 * @param url          请求地址
 * @param method       请求方法
 * @param otherConfig  请求的其他配置
 * @param options      axios-hooks 的配置项
 * @returns
 */
export function createConfig(
  url: string,
  method: Method | string,
  otherConfig?: AxiosRequestConfig<TBody>,
  options?: UseAxiosCustomConfig['options'],
): UseAxiosCustomConfig {
  return {
    config: {
      url,
      method,
      ...otherConfig,
    },
    options: { ...defaultOptions, ...options },
  };
}
