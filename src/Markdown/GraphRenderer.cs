using System.Diagnostics;
using System.Text;
using Markdig.Syntax;

namespace Markdig.Renderers.Html;

public class GraphRenderer : HtmlObjectRenderer<CodeBlock>
{
    private readonly HtmlObjectRenderer<CodeBlock> _defaultRenderer;

    public GraphRenderer(HtmlObjectRenderer<CodeBlock> defaultRenderer)
    {
        _defaultRenderer = defaultRenderer;
    }

    protected override void Write(HtmlRenderer renderer, CodeBlock block)
    {
        if (block is not FencedCodeBlock codeBlock
            || codeBlock.Info != "graphviz")
        {
            _defaultRenderer.Write(renderer, block);
            return;
        }

        var code = ExtractCode(codeBlock);

        var graphviz = new Process();
        graphviz.StartInfo.FileName = "dot";
        graphviz.StartInfo.ArgumentList.Add("-Tsvg");
        graphviz.StartInfo.RedirectStandardInput = true;
        graphviz.StartInfo.RedirectStandardOutput = true;
        graphviz.Start();

        graphviz.StandardInput.Write(code);
        graphviz.StandardInput.Close();

        var svg = graphviz.StandardOutput.ReadToEnd();

        renderer.Write(svg);
    }

    private string ExtractCode(FencedCodeBlock codeBlock)
    {
        var code = new StringBuilder();
        var lines = codeBlock.Lines.Lines;

        foreach (var line in lines)
        {
            code.Append(line.Slice.AsSpan());
            code.AppendLine();
        }

        return code.ToString();
    }
}
