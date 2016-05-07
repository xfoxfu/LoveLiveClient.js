/// <reference path="./references.d.ts" />

declare module "crypto-promise" {
  import * as crypto from "crypto";
  export function hash(method: string): (data: any, encoding?: string) => Buffer;
  export function hmac(method: string, key: string): (data: any, encoding?: string) => Buffer;
  // TODO
}