/**
 * Environment variable type definitions for Parcel.
 *
 * @module env
 */

interface ImportMetaEnv {
  readonly DEV?: boolean;
  readonly PROD?: boolean;
  readonly MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
