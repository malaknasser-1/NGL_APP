import { cacheProvider } from "./init.js";

export function withCache(ttl = 3600) {
  return async (req, res, next) => {
    try {
      let key = `${req.method}:${req.originalUrl}`;
      const cached = await cacheProvider.get(key);
      
      if (cached) {
        res.setHeader('X-Cache', "HIT");
        return res.json(JSON.parse(cached));
      }
      
      const originalJson = res.json.bind(res);
      
      res.json = async (body) => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
           cacheProvider.set(key, JSON.stringify(body), ttl).catch(err => console.log('Cache set error:', err));
            res.setHeader('X-Cache', "MISS");
          }
        } catch (err) {
          console.log('Cache wrapper error:', err);
        }
        return originalJson(body);
      };
      
      next();
    } catch (err) {
      console.log('Redis get error:', err.message);
      next();
    }
  };
}