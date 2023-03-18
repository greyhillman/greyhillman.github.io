using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Shake;
using Shake.FilePath;

namespace Site;

public class TopPageRule : IRule
{
    private readonly List<TopPage> _pages;
    private readonly FilePath _layout_file;

    public TopPageRule(FilePath layout_file)
    {
        _pages = new();
        _layout_file = layout_file;
    }

    public void AddFile(string file, string title)
    {
        _pages.Add(new TopPage(FilePath.From(file), title));
    }

    public async Task Build(IBuildSystem.IBuilder builder)
    {
        var body_file = FilePath.From(builder.OutputFile);
        body_file.Extension = "partial.html";

        await builder.Need(body_file.ToString(), _layout_file.ToString());

        var body = await File.ReadAllTextAsync(body_file.ToString());
        var layout = await File.ReadAllTextAsync(_layout_file.ToString());

        var page = _pages.Find(page => page.Path == FilePath.From(builder.OutputFile));

        var output = layout
            .Replace("{{ body }}", body)
            .Replace("{{ title }}", page.Title);

        using (var writer = builder.WriteChanged(builder.OutputFile))
        {
            await writer.WriteAsync(Encoding.UTF8.GetBytes(output));
        }
    }

    public bool IsFor(string file)
    {
        foreach (var page in _pages)
        {
            if (page.Path == FilePath.From(file))
            {
                return true;
            }
        }

        return false;
    }

    private class TopPage
    {
        public TopPage(FilePath path, string title)
        {
            Path = path;
            Title = title;
        }

        public FilePath Path { get; init; }
        public string Title { get; init; }
    }
}
