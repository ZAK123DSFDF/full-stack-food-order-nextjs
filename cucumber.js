/* eslint-disable import/no-anonymous-default-export */
export default {
  paths: ["tests/features/**/*.feature"],
  requireModule: ["ts-node/register", "tsconfig-paths/register"],
  import: ["tests/features/**/*.ts"],
  loader: ["ts-node/esm"],
};
