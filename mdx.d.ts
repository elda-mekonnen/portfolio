// remark-mdx-frontmatter adds a named `frontmatter` export to every .mdx file.
declare module "*.mdx" {
  import type { MDXContent } from "mdx/types";

  export const frontmatter: Record<string, unknown>;
  const MDXComponent: MDXContent;
  export default MDXComponent;
}
