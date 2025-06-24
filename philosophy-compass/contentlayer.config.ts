import { defineDocumentType, makeSource } from "contentlayer2/source-files";

export const Note = defineDocumentType(() => ({
  name: "Note",
  filePathPattern: `notes/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    noteType: {
      type: "enum",
      required: true,
      options: ["philosopher", "publication", "idea"],
    },
    date: { type: "date", required: true },
    originYear: { type: "number", required: false },
    tags: { type: "list", of: { type: "string" } },
    coverImage: { type: "string", required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("notes/", ""),
    },
  },
}));

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    summary: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" } },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("blog/", ""),
    },
  },
}));

// Added Compass document type
export const Compass = defineDocumentType(() => ({
  name: "Compass",
  filePathPattern: `compass/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" } },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("compass/", ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Note, Blog, Compass],
});
