#pragma checksum "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Home\Game.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "b06913f654010130d30d7f9822ac376f32165a53"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Game), @"mvc.1.0.view", @"/Views/Home/Game.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Home/Game.cshtml", typeof(AspNetCore.Views_Home_Game))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\_ViewImports.cshtml"
using levelEditor;

#line default
#line hidden
#line 2 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\_ViewImports.cshtml"
using levelEditor.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b06913f654010130d30d7f9822ac376f32165a53", @"/Views/Home/Game.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"2eb0766371cec35afd15af15beffcfece0cc4397", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Game : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<levelEditor.Models.Game>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#line 2 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Home\Game.cshtml"
  
    ViewData["Title"] = "Contact";

#line default
#line hidden
            BeginContext(75, 6, true);
            WriteLiteral("\r\n<h2>");
            EndContext();
            BeginContext(82, 10, false);
#line 6 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Home\Game.cshtml"
Write(Model.Name);

#line default
#line hidden
            EndContext();
            BeginContext(92, 10, true);
            WriteLiteral("</h2>\r\n<p>");
            EndContext();
            BeginContext(103, 17, false);
#line 7 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Home\Game.cshtml"
Write(Model.Description);

#line default
#line hidden
            EndContext();
            BeginContext(120, 78, true);
            WriteLiteral("</p>\r\n<div class=\"row\">\r\n    <div class=\"col-sm-7 col-xs-12\">\r\n        <iframe");
            EndContext();
            BeginWriteAttribute("src", " src=\"", 198, "\"", 214, 1);
#line 10 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Home\Game.cshtml"
WriteAttributeValue("", 204, Model.Url, 204, 10, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(215, 81, true);
            WriteLiteral(" style=\"height:480px;width:100%\" scrolling=\"no\"></iframe>\r\n    </div>\r\n\r\n</div>\r\n");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<levelEditor.Models.Game> Html { get; private set; }
    }
}
#pragma warning restore 1591