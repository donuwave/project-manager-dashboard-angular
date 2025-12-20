import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: 'message', renderMode: RenderMode.Prerender },
  { path: 'projects/**', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server },
];
