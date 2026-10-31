import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";

/**
 * Sert les médias clients stockés dans `Ressource/` (hors de `public/`)
 * avec support des requêtes HTTP Range (indispensable au streaming vidéo
 * et au seek dans la balise <video>).
 *
 * URL : /media/Client/<Dossier client>/<fichier>
 */

export const runtime = "nodejs";

const MEDIA_ROOT = path.resolve(process.cwd(), "Ressource");

const MIME_TYPES: Record<string, string> = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
};

function toWebStream(start: number, end: number, filePath: string): ReadableStream<Uint8Array> {
  const nodeStream = createReadStream(filePath, { start, end });
  return Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
): Promise<Response> {
  const { path: segments } = await params;
  const decoded = segments.map((s) => decodeURIComponent(s).normalize("NFC"));
  const filePath = path.resolve(MEDIA_ROOT, ...decoded);

  // Protection contre le path traversal
  if (!filePath.startsWith(MEDIA_ROOT + path.sep)) {
    return new Response("Forbidden", { status: 403 });
  }

  const contentType = MIME_TYPES[path.extname(filePath).toLowerCase()];
  if (!contentType) {
    return new Response("Unsupported media type", { status: 415 });
  }

  let size: number;
  try {
    const info = await stat(filePath);
    if (!info.isFile()) return new Response("Not found", { status: 404 });
    size = info.size;
  } catch {
    return new Response("Not found", { status: 404 });
  }

  const baseHeaders = {
    "Content-Type": contentType,
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=3600",
  };

  const range = request.headers.get("range");
  if (range) {
    const match = /bytes=(\d*)-(\d*)/.exec(range);
    if (match) {
      let start = match[1] ? parseInt(match[1], 10) : 0;
      let end = match[2] ? parseInt(match[2], 10) : size - 1;
      if (!match[1] && match[2]) {
        // Suffix range : "bytes=-500" => 500 derniers octets
        start = Math.max(0, size - parseInt(match[2], 10));
        end = size - 1;
      }
      end = Math.min(end, size - 1);

      if (start > end || start >= size) {
        return new Response("Range Not Satisfiable", {
          status: 416,
          headers: { "Content-Range": `bytes */${size}` },
        });
      }

      return new Response(toWebStream(start, end, filePath), {
        status: 206,
        headers: {
          ...baseHeaders,
          "Content-Range": `bytes ${start}-${end}/${size}`,
          "Content-Length": String(end - start + 1),
        },
      });
    }
  }

  return new Response(toWebStream(0, size - 1, filePath), {
    status: 200,
    headers: { ...baseHeaders, "Content-Length": String(size) },
  });
}
