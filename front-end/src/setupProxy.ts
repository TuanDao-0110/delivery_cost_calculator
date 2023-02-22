import { createProxyMiddleware } from "http-proxy-middleware";

interface ProxyConfig {
  target: string;
  changeOrigin: boolean;
  [key: string]: any;
}

const proxy: { [key: string]: ProxyConfig } = {
  "/v1/pages": {
    target: "https://restaurant-api.wolt.com",
    changeOrigin: true,
  },
  "/api": {
    target: "https://localhost:4000",
    changeOrigin: true,
  },
};

export default function setupProxy(app: any) {
  Object.keys(proxy).forEach(function (context) {
    app.use(createProxyMiddleware(context, proxy[context]));
  });
}
