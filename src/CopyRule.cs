using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Shake;
using Shake.FileSystem;

namespace Site;

public class CopyRule : IRule<FilePath>
{
    private readonly IFileSystem _fileSystem;
    private readonly List<FilePath> _files;

    public CopyRule(IFileSystem fileSystem)
    {
        _fileSystem = fileSystem;

        _files = new();
    }

    public void AddFile(string file)
    {
        _files.Add(new FilePath(file));
    }

    public async Task Build(IBuildSystem<FilePath>.IBuilder builder)
    {
        var source_file = new FilePathBuilder(builder.Resource);
        source_file.Directory[0] = "site";

        await builder.Need(source_file.Path);

        var source = await File.ReadAllBytesAsync(source_file.Path.ToString());

        using (var writer = await _fileSystem.Set(builder.Resource))
        {
            await writer.WriteAsync(source);
        }

        await builder.Built(builder.Resource);
    }

    public bool IsFor(FilePath file)
    {
        return _files.Contains(file);
    }
}
