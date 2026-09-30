import { NextRequest } from 'next/server';

function cleanIp(ip: string): string {
  return ip.replace('::ffff:', '').trim();
}

function pickFirst(value: string | null): string {
  if (!value) return '';
  return value.split(',')[0].trim();
}

export function extractClientIp(request: NextRequest): string {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cleanIp(cfIp);

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return cleanIp(realIp);

  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return cleanIp(pickFirst(forwardedFor));

  return '';
}

export function buildClientForwardHeaders(
  request: NextRequest,
): Record<string, string> {
  const headers: Record<string, string> = {};

  const clientIp = extractClientIp(request);
  if (clientIp) {
    headers['x-forwarded-client-ip'] = clientIp;
  }

  const userAgent = request.headers.get('user-agent');
  if (userAgent) {
    headers['x-forwarded-client-user-agent'] = userAgent;
  }

  return headers;
}
