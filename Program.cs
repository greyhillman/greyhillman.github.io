using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Shake;

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
                "dist/home.html",
                "dist/about.html",
                "dist/resume.html",
            });
        }

        private static void AddRules(List<IRule> rules)
        {
            var markdown = new MarkdownPandocRule();
            markdown.AddFile("dist/about.html");
            markdown.AddFile("dist/home.html");
            markdown.AddFile("dist/resume.html");

            rules.Add(markdown);
        }
    }
}
