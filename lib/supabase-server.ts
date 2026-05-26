// voidnews-archive Supabase — server-only client
// SUPABASE_SERVICE_ROLE_KEY 사용. RLS bypass. 절대 client component에서 import 금지.
// `server-only` 패키지가 client bundle 빌드 시 에러를 발생시켜 보호한다.
import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * 서버 전용 client. service_role key 사용 → RLS bypass.
 * - generateStaticParams, page server component, app/api/route.ts 안에서만 import.
 * - "server-only" import 가 client bundle 진입 시 빌드 에러를 발생시킨다.
 */
export function createServerClient(): SupabaseClient {
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL 환경변수가 비어 있습니다.");
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY 환경변수가 비어 있습니다.");
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
