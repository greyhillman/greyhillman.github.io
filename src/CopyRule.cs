using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Shake;
using Shake.FilePath;

namespace Site;

public class CopyRule : IRule
{
    private readonly List<FilePath> _files;

    public CopyRule()
    {
        _files = new();
    }

    public void AddFile(string file)
    {
        _files.Add(FilePath.From(file));
    }

    public async Task Build(IBuildSystem.IBuilder builder)
    {
        var source_file = FilePath.From(builder.OutputFile);
        source_file.Directory.Levels[0] = "site";

        await builder.Need(source_file.ToString());

        var source = await File.ReadAllBytesAsync(source_file.ToString());

        using (var writer = builder.WriteChanged(builder.OutputFile))
        {
            await writer.WriteAsync(source);
        }
    }

    public bool IsFor(string file)
    {
        return _files.Contains(FilePath.From(file));
    }
}
