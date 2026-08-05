// Slidev's native parser bindings are unavailable in this environment; use
// the WASI fallbacks unless the caller has explicitly configured otherwise.
process.env.NAPI_RS_NATIVE_LIBRARY_PATH ??= "/nonexistent";
process.env.NAPI_RS_FORCE_WASI ??= "error";

for (const builtin of [
  "node:http",
  "node:https",
  "node:net",
  "node:tls",
  "node:stream",
  "node:crypto"
]) {
  await import(builtin);
}
await import("./node_modules/@slidev/cli/dist/cli.mjs");
