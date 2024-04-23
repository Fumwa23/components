import { NextResponse } from 'next/server';

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('pathname', new URL(request.url).pathname + new URL(request.url).search); // used for redirecting after auth and also for page tracking

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}