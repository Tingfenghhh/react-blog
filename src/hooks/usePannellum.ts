import { Message } from '@arco-design/web-react';
import 'pannellum/build/pannellum.css';

export class usePannellum {
  viewer: any;

  initPannellumViewer(id: string, config: InitViewerConfig) {
    // @ts-expect-error pannellum暂时只能在index.html中引入，否则会报错
    this.viewer = pannellum.viewer(id, {
      ...config,
    });
    console.log('viewer', this.viewer);
  }

  destroy() {
    if (this.viewer) {
      this.viewer.destroy();
      Message.success('viewer destroyed');
    }
  }
}
