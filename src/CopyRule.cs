using System.Threading.Tasks;
using Shake;
using Shake.FileSystem;

namespace Site;

public class CopyRule : IRule<FilePath>
{
    private readonly IFileSystem _fileSystem;

    public CopyRule(IFileSystem fileSystem)
    {
        _fileSystem = fileSystem;
    }

    public async Task Build(IBuildSystem<FilePath>.IBuilder builder)
    {
        var source_file = new FilePathBuilder(builder.Resource);
        source_file.Directory[0] = "site";

        await builder.Need(source_file.Path);

        await _fileSystem.Copy(source_file.Path, builder.Resource);

        await builder.Built(builder.Resource);
    }

    public bool IsFor(FilePath file)
    {
        return file.Directory[0] == "dist";
    }
}
