using System.Collections.Generic;
using System.Threading.Tasks;
using Shake;
using Shake.FileSystem;

namespace Site;

public class TopPageRule : IRule<FilePath>
{
    private readonly IFileSystem _file_system;

    private readonly List<TopPage> _pages;
    private readonly FilePath _layout_file;

    public TopPageRule(IFileSystem file_system, FilePath layout_file)
    {
        _file_system = file_system;

        _layout_file = layout_file;
        _pages = new();
    }

    public void AddFile(string file, string title)
    {
        _pages.Add(new TopPage(new FilePath(file), title));
    }

    public async Task Build(IBuildSystem<FilePath>.IBuilder builder)
    {
        var body_file = new FilePathBuilder(builder.Resource);
        body_file.Directory[0] = "out";
        body_file.Extension = "md.html";

        await builder.Need(body_file.Path, _layout_file);

        using (var body = await _file_system.ReadText(body_file.Path))
        using (var layout = await _file_system.ReadText(_layout_file))
        using (var writer = await _file_system.SetText(builder.Resource))
        {
            var body_text = await body.ReadToEndAsync();
            var layout_text = await body.ReadToEndAsync();

            var page = _pages.Find(page => page.Path == builder.Resource);

            var output = layout_text
                .Replace("{{ body }}", body_text)
                .Replace("{{ title }}", page.Title);

            await writer.WriteAsync(output);
        }

        await builder.Built(builder.Resource);
    }

    public bool IsFor(FilePath file)
    {
        foreach (var page in _pages)
        {
            if (page.Path == file)
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
