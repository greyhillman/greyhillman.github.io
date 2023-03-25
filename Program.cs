using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Shake;
using Shake.FilePath;

namespace Site
{
    public static class Build
    {
        public static async Task Main()
        {
            var rules = new List<IRule>();
            AddRules(rules);

            var rule_set = new ListRuleSet(rules);
            var build = new DefaultBuildSystem(rule_set);

            await build.Want(new[]
            {
                "dist/index.html",
                "dist/about.html",
                "dist/resume.html",
                "dist/posts/index.html",
            });
        }

        private static void AddRules(List<IRule> rules)
        {
            var top_page = new TopPageRule(new FilePath("site/_layout.html"));
            top_page.AddFile("dist/index.html", "Home");
            top_page.AddFile("dist/about.html", "About");
            top_page.AddFile("dist/resume.html", "Resume");

            rules.Add(top_page);

            var html = new HtmlRule();
            rules.Add(html);

            var sass = new SassRule();
            rules.Add(sass);

            var copy_files = new CopyRule();
            copy_files.AddFile("dist/image/GitHub-Mark-32px.png");
            copy_files.AddFile("dist/image/In-Blue-34.png");

            rules.Add(copy_files);
        }
    }
}
