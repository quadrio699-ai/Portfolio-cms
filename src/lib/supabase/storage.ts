/**
 * Builds a public URL for a file in a public Supabase Storage bucket.
 * Both "media" and "documents" buckets are created as public in schema.sql,
 * so this is a plain string join — no auth or network call needed.
 */
export function publicStorageUrl(bucket: "media" | "documents", path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${base}/storage/v1/object/public/${bucket}/${path}`;
}
