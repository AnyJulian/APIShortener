// Generated by nitro
import type { Serialize, Simplify } from "nitropack/types";
declare module "nitropack/types" {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/auth/callback': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/routes/auth/callback.get').default>>>>
    }
    '/auth/login': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/routes/auth/login.get').default>>>>
    }
    '/': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/routes/index').default>>>>
    }
    '/links': {
      'delete': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/routes/links.delete').default>>>>
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/routes/links.get').default>>>>
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/routes/links.post').default>>>>
    }
    '/links/:slug': {
      'delete': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/routes/links/[slug].delete').default>>>>
      'put': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/routes/links/[slug].put').default>>>>
    }
    '/tags': {
      'delete': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/routes/tags.delete').default>>>>
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/routes/tags.get').default>>>>
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/routes/tags.post').default>>>>
    }
    '/tags/:id': {
      'delete': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/routes/tags/[id].delete').default>>>>
      'put': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/routes/tags/[id].put').default>>>>
    }
  }
}
export {}