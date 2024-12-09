import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import destr from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/destr/dist/index.mjs';
import { getRequestHeader, splitCookiesString, setResponseHeader, setResponseStatus, send, defineEventHandler, handleCacheHeaders, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, createError, getRouterParam, getQuery as getQuery$1, readBody } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/h3/dist/index.mjs';
import { createHooks } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/hookable/dist/index.mjs';
import { createFetch as createFetch$1, Headers as Headers$1 } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/ofetch/dist/node.mjs';
import { createCall, createFetch } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/unenv/runtime/fetch/index.mjs';
import { hash } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/ohash/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/ufo/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/unstorage/drivers/fs.mjs';
import { getContext } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/unctx/dist/index.mjs';
import defu, { defuFn } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/defu/dist/defu.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/radix3/dist/index.mjs';
import { Server } from 'node:http';
import { mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parentPort, threadId } from 'node:worker_threads';
import { provider, isWindows } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/std-env/dist/index.mjs';
import { klona } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/klona/dist/index.mjs';
import { snakeCase } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/scule/dist/index.mjs';
import { eq } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/drizzle-orm/index.js';
import { nanoid } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/nanoid/index.js';
import { pgTable, text, integer, timestamp, uuid, primaryKey } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/drizzle-orm/pg-core/index.js';
import { drizzle } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/drizzle-orm/node-postgres/index.js';
import { v4 } from 'file:///Users/charlesoudin/Desktop/Bureau/API%20SHORT/APIShortener/node_modules/uuid/dist/esm/index.js';

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error, isDev) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function defineNitroErrorHandler(handler) {
  return handler;
}
const errorHandler = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const { stack, statusCode, statusMessage, message } = normalizeError(
      error);
    const showDetails = statusCode !== 404;
    const errorObject = {
      url: event.path || "",
      statusCode,
      statusMessage,
      message,
      stack: showDetails ? stack.map((i) => i.text) : void 0
    };
    if (error.unhandled || error.fatal) {
      const tags = [
        "[nitro]",
        "[request error]",
        error.unhandled && "[unhandled]",
        error.fatal && "[fatal]"
      ].filter(Boolean).join(" ");
      console.error(
        tags,
        error.message + "\n" + stack.map((l) => "  " + l.text).join("  \n")
      );
    }
    if (statusCode === 404) {
      setResponseHeader(event, "Cache-Control", "no-cache");
    }
    setResponseStatus(event, statusCode, statusMessage);
    if (isJsonRequest(event)) {
      setResponseHeader(event, "Content-Type", "application/json");
      return send(event, JSON.stringify(errorObject));
    }
    setResponseHeader(event, "Content-Type", "text/html");
    return send(event, renderHTMLError(errorObject));
  }
);
function renderHTMLError(error) {
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Request Error";
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${statusCode} ${statusMessage}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico/css/pico.min.css">
  </head>
  <body>
    <main class="container">
      <dialog open>
        <article>
          <header>
            <h2>${statusCode} ${statusMessage}</h2>
          </header>
          <code>
            ${error.message}<br><br>
            ${"\n" + (error.stack || []).map((i) => `&nbsp;&nbsp;${i}`).join("<br>")}
          </code>
          <footer>
            <a href="/" onclick="event.preventDefault();history.back();">Go Back</a>
          </footer>
        </article>
      </dialog>
    </main>
  </body>
</html>
`;
}

const plugins = [
  
];

const _lazy_s6phyG = () => Promise.resolve().then(function () { return callback_get$1; });
const _lazy_5DS1qq = () => Promise.resolve().then(function () { return login_get$1; });
const _lazy_EcVItW = () => Promise.resolve().then(function () { return index$1; });
const _lazy_DTuMpi = () => Promise.resolve().then(function () { return links_delete$1; });
const _lazy_x2c1On = () => Promise.resolve().then(function () { return links_get$1; });
const _lazy_O1uQaU = () => Promise.resolve().then(function () { return links_post$1; });
const _lazy_rNbEEL = () => Promise.resolve().then(function () { return _slug__delete$1; });
const _lazy_OAx9G3 = () => Promise.resolve().then(function () { return _slug__put$1; });
const _lazy_zHFGre = () => Promise.resolve().then(function () { return tags_delete$1; });
const _lazy_IFcMeM = () => Promise.resolve().then(function () { return tags_get$1; });
const _lazy_BHs5iG = () => Promise.resolve().then(function () { return tags_post$1; });
const _lazy_cuJG09 = () => Promise.resolve().then(function () { return _id__delete$1; });
const _lazy_Xg9QTu = () => Promise.resolve().then(function () { return _id__put$1; });
const _lazy_GO9KsK = () => Promise.resolve().then(function () { return visits_get$1; });
const _lazy_tQXTGh = () => Promise.resolve().then(function () { return _slug__get$1; });

const handlers = [
  { route: '/auth/callback', handler: _lazy_s6phyG, lazy: true, middleware: false, method: "get" },
  { route: '/auth/login', handler: _lazy_5DS1qq, lazy: true, middleware: false, method: "get" },
  { route: '/', handler: _lazy_EcVItW, lazy: true, middleware: false, method: undefined },
  { route: '/links', handler: _lazy_DTuMpi, lazy: true, middleware: false, method: "delete" },
  { route: '/links', handler: _lazy_x2c1On, lazy: true, middleware: false, method: "get" },
  { route: '/links', handler: _lazy_O1uQaU, lazy: true, middleware: false, method: "post" },
  { route: '/links/:slug', handler: _lazy_rNbEEL, lazy: true, middleware: false, method: "delete" },
  { route: '/links/:slug', handler: _lazy_OAx9G3, lazy: true, middleware: false, method: "put" },
  { route: '/tags', handler: _lazy_zHFGre, lazy: true, middleware: false, method: "delete" },
  { route: '/tags', handler: _lazy_IFcMeM, lazy: true, middleware: false, method: "get" },
  { route: '/tags', handler: _lazy_BHs5iG, lazy: true, middleware: false, method: "post" },
  { route: '/tags/:id', handler: _lazy_cuJG09, lazy: true, middleware: false, method: "delete" },
  { route: '/tags/:id', handler: _lazy_Xg9QTu, lazy: true, middleware: false, method: "put" },
  { route: '/visits', handler: _lazy_GO9KsK, lazy: true, middleware: false, method: "get" },
  { route: '/visits/:slug', handler: _lazy_tQXTGh, lazy: true, middleware: false, method: "get" }
];

const serverAssets = [{"baseName":"server","dir":"/Users/charlesoudin/Desktop/Bureau/API SHORT/APIShortener/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/charlesoudin/Desktop/Bureau/API SHORT/APIShortener","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/charlesoudin/Desktop/Bureau/API SHORT/APIShortener/server","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/charlesoudin/Desktop/Bureau/API SHORT/APIShortener/.nitro","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/charlesoudin/Desktop/Bureau/API SHORT/APIShortener/.nitro/cache","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/charlesoudin/Desktop/Bureau/API SHORT/APIShortener/.data/kv","ignore":["**/node_modules/**","**/.git/**"]}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[nitro] [cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/"
  },
  "nitro": {
    "routeRules": {}
  },
  "github": {
    "clientId": "",
    "clientSecret": "",
    "redirectUri": ""
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: undefined,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
function getAddress() {
  if (provider === "stackblitz" || process.env.NITRO_NO_UNIX_SOCKET || process.versions.bun) {
    return 0;
  }
  const socketName = `worker-${process.pid}-${threadId}.sock`;
  if (isWindows) {
    return join(String.raw`\\.\pipe\nitro`, socketName);
  }
  const socketDir = join(tmpdir(), "nitro");
  mkdirSync(socketDir, { recursive: true });
  return join(socketDir, socketName);
}
const listenAddress = getAddress();
server.listen(listenAddress, () => {
  const _address = server.address();
  parentPort?.postMessage({
    event: "listen",
    address: typeof _address === "string" ? { socketPath: _address } : { host: "localhost", port: _address?.port }
  });
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
trapUnhandledNodeErrors();
async function onShutdown(signal) {
  await nitroApp.hooks.callHook("close");
}
parentPort?.on("message", async (msg) => {
  if (msg && msg.event === "shutdown") {
    await onShutdown();
    parentPort?.postMessage({ event: "exit" });
  }
});

const callback_get = defineEventHandler(async (event) => {
});

const callback_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: callback_get
});

const login_get = defineEventHandler((event) => {
  useRuntimeConfig(event);
  const url = new URL("... ?");
  url.searchParams.append("?", " ?");
  return sendRedirect(event, "?");
});

const login_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: login_get
});

const links = pgTable("links", {
  slug: text().primaryKey(),
  url: text().notNull(),
  title: text().notNull(),
  max_visits: integer(),
  available_at: timestamp().notNull(),
  expired_at: timestamp(),
  created_at: timestamp().notNull(),
  update_at: timestamp().notNull()
});

const tags = pgTable("tags", {
  id: integer().primaryKey(),
  name: text().unique().notNull(),
  color: text().notNull()
});

const visits = pgTable("visits", {
  id: uuid().primaryKey(),
  // Utiliser un UUID comme clé primaire
  slug: text(),
  link_id: text(),
  created_at: timestamp().notNull(),
  ip: text().notNull(),
  user_agent: text().notNull()
});

const schema = /*#__PURE__*/Object.freeze({
  __proto__: null,
  links: links,
  tags: tags,
  visits: visits
});

function useDrizzle() {
  return drizzle(process.env.DATABASE_URL, {
    schema
  });
}

const index = eventHandler(async (event) => {
  const db = useDrizzle();
  const results = await db.query.links.findMany();
  return results;
});

const index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index
});

const links_delete = eventHandler(async (event) => {
  const db = useDrizzle();
  const results = await db.delete(links);
  return results;
});

const links_delete$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: links_delete
});

const link_tags = pgTable("link_tags", {
  link_slug: text().references(() => links.slug).notNull(),
  tag_id: integer().references(() => tags.id)
}, (columns) => ({
  pk: primaryKey({ columns: [columns.link_slug, columns.tag_id] })
}));

const links_get = eventHandler(async (event) => {
  const db = useDrizzle();
  const results = await db.select({
    slug: links.slug,
    url: links.url,
    title: links.title,
    tag_id: tags.id,
    tag_name: tags.name,
    tag_color: tags.color
  }).from(links).innerJoin(link_tags, eq(link_tags.link_slug, links.slug)).innerJoin(tags, eq(tags.id, link_tags.tag_id));
  const groupedResults = results.reduce((acc, row) => {
    const { slug, url, title, tag_id, tag_name, tag_color } = row;
    if (!acc[slug]) {
      acc[slug] = {
        slug,
        url,
        title,
        tags: []
        // Initialiser le tableau des tags
      };
    }
    acc[slug].tags.push({ id: tag_id, name: tag_name, color: tag_color });
    return acc;
  }, {});
  const finalResults = Object.values(groupedResults);
  return finalResults;
});

const links_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: links_get
});

function generateShortSlug() {
  return nanoid(6);
}
const links_post = defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = await readBody(event);
  console.log("Request body:", body);
  const slug = generateShortSlug();
  const newLink = await db.insert(links).values({
    url: String(body.url),
    slug,
    // Utiliser le slug court généré
    title: String(body.title),
    max_visits: body.max_visits,
    available_at: /* @__PURE__ */ new Date(),
    expired_at: null,
    created_at: /* @__PURE__ */ new Date(),
    update_at: /* @__PURE__ */ new Date()
  }).returning();
  console.log("New link slug:", newLink[0].slug);
  if (Array.isArray(body.tag_id) && body.tag_id.length > 0) {
    const tagValues = body.tag_id.map((tag_id) => ({
      link_slug: newLink[0].slug,
      tag_id: Number(tag_id)
    }));
    console.log("Inserting tag associations:", tagValues);
    try {
      await db.insert(link_tags).values(tagValues);
      console.log("Tag associations inserted successfully.");
    } catch (error) {
      console.error("Error inserting tag associations:", error);
    }
  } else {
    console.log("No tag IDs provided, skipping tag association.");
  }
  console.log("Type of tag_id:", typeof body.tag_id);
  console.log("Is tag_id an array?", Array.isArray(body.tag_id));
  return { body: { slug: newLink[0].slug, url: newLink[0].url } };
});

const links_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: links_post
});

const _slug__delete = defineEventHandler(async (event) => {
  const db = useDrizzle();
  const slug = getRouterParam(event, "slug");
  await db.delete(link_tags).where(eq(link_tags.link_slug, slug));
  await db.delete(links).where(eq(links.slug, slug));
  return { statusCode: 200, body: { message: "Link deleted successfully" } };
});

const _slug__delete$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _slug__delete
});

const _slug__put = defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = await readBody(event);
  const slug = getRouterParam(event, "slug");
  console.log(body);
  await db.update(links).set({ title: body.title, update_at: /* @__PURE__ */ new Date() }).where(eq(links.slug, slug)).returning({ updatedId: links.slug });
  return { body };
});

const _slug__put$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _slug__put
});

const tags_delete = eventHandler(async (event) => {
  const db = useDrizzle();
  const results = await db.delete(tags);
  return results;
});

const tags_delete$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: tags_delete
});

const tags_get = eventHandler(async (event) => {
  const db = useDrizzle();
  const results = await db.query.tags.findMany();
  return results;
});

const tags_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: tags_get
});

const tags_post = defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = await readBody(event);
  console.log(body);
  await db.insert(tags).values({
    id: body.id,
    name: body.name,
    color: body.color
  }).returning();
  return { body };
});

const tags_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: tags_post
});

const _id__delete = defineEventHandler(async (event) => {
  const db = useDrizzle();
  const id = Number(getRouterParam(event, "id"));
  const results = await db.delete(tags).where(eq(tags.id, id));
  return results;
});

const _id__delete$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete
});

const _id__put = defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = await readBody(event);
  const id = Number(getRouterParam(event, "id"));
  console.log(body);
  await db.update(tags).set({ name: body.title, color: body.color }).where(eq(tags.id, id)).returning({ updatedId: tags.id });
  return { body };
});

const _id__put$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__put
});

const visits_get = defineEventHandler(async (event) => {
  const db = useDrizzle();
  const results = await db.select().from(visits);
  return results;
});

const visits_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: visits_get
});

const _slug__get = defineEventHandler(async (event) => {
  const db = useDrizzle();
  const slug = getRouterParam(event, "slug");
  const result = await db.select().from(links).where(eq(links.slug, slug)).limit(1);
  if (result.length === 0) {
    return { statusCode: 404, body: { message: "Link not found" } };
  }
  const originalUrl = result[0].url;
  const ip = event.node.req.headers["x-forwarded-for"] || event.node.req.connection.remoteAddress || "unknown";
  const userAgent = event.node.req.headers["user-agent"];
  await db.insert(visits).values({
    id: v4(),
    // Utiliser le slug comme identifiant du lien
    created_at: /* @__PURE__ */ new Date(),
    slug,
    link_id: slug,
    ip,
    user_agent: userAgent
  });
  return sendRedirect(event, originalUrl);
});

const _slug__get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _slug__get
});
//# sourceMappingURL=index.mjs.map
