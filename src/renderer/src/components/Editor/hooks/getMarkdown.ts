import { Editor, editorViewCtx, serializerCtx } from "@milkdown/core";

export const getMarkdown = (editor:Editor) =>
editor.action((ctx) => {
    const editorView = ctx.get(editorViewCtx);
    const serializer = ctx.get(serializerCtx);
    return serializer(editorView.state.doc);
});
