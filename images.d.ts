declare module "*.png" {
  const src: import("next/dist/shared/lib/get-img-props").StaticImageData;
  export default src;
}
declare module "*.webp" {
  const src: import("next/dist/shared/lib/get-img-props").StaticImageData;
  export default src;
}
declare module "*.jpg" {
  const src: import("next/dist/shared/lib/get-img-props").StaticImageData;
  export default src;
}
declare module "*.jpeg" {
  const src: import("next/dist/shared/lib/get-img-props").StaticImageData;
  export default src;
}
declare module "*.svg" {
  const src: string; // o SVGR se lo usi come componente
  export default src;
}

// 💥 wildcard per il tuo alias (bypass risoluzione TS in CI)
declare module "@/assets/images/*" {
  const src: import("next/dist/shared/lib/get-img-props").StaticImageData;
  export default src;
}
