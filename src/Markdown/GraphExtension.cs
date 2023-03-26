using Markdig.Renderers;
using Markdig.Renderers.Html;
using Markdig.Syntax;

namespace Markdig;

public class GraphExtension : IMarkdownExtension
{
    public void Setup(MarkdownPipelineBuilder pipeline)
    {
    }

    public void Setup(MarkdownPipeline pipeline, IMarkdownRenderer renderer)
    {
        // Roughly copied from here:
        // https://github.com/wbaldoumas/markdown-colorcode/blob/707784a13dd536709ed8e8c51ae6fbd4168e9035/src/Markdown.ColorCode/ColorCodeExtension.cs#L34

        var defaultRenderer = renderer.ObjectRenderers.FindExact<CodeBlockRenderer>();

        renderer.ObjectRenderers.Remove(defaultRenderer);

        renderer.ObjectRenderers.Add(new GraphRenderer(defaultRenderer));
    }
}
