#pragma checksum "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Games\Details.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "05ddf3d0b4fbb82298ac5d696f410ee6d2909840"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Games_Details), @"mvc.1.0.view", @"/Views/Games/Details.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Games/Details.cshtml", typeof(AspNetCore.Views_Games_Details))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"05ddf3d0b4fbb82298ac5d696f410ee6d2909840", @"/Views/Games/Details.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"2eb0766371cec35afd15af15beffcfece0cc4397", @"/Views/_ViewImports.cshtml")]
    public class Views_Games_Details : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<levelEditor.Models.Game>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Edit", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Index", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(32, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 3 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Games\Details.cshtml"
  
    ViewData["Title"] = "Details";
    Layout = "~/Views/Shared/_Layout_Manage.cshtml";

#line default
#line hidden
            BeginContext(131, 118, true);
            WriteLiteral("\r\n<h2>Details</h2>\r\n\r\n<div>\r\n    <h4>Game</h4>\r\n    <hr />\r\n    <dl class=\"dl-horizontal\">\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(250, 40, false);
#line 15 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Games\Details.cshtml"
       Write(Html.DisplayNameFor(model => model.Name));

#line default
#line hidden
            EndContext();
            BeginContext(290, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(334, 36, false);
#line 18 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Games\Details.cshtml"
       Write(Html.DisplayFor(model => model.Name));

#line default
#line hidden
            EndContext();
            BeginContext(370, 43, true);
            WriteLiteral("\r\n        </dd>\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(414, 41, false);
#line 21 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Games\Details.cshtml"
       Write(Html.DisplayNameFor(model => model.Image));

#line default
#line hidden
            EndContext();
            BeginContext(455, 47, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            <img");
            EndContext();
            BeginWriteAttribute("src", " src=\"", 502, "\"", 564, 1);
#line 24 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Games\Details.cshtml"
WriteAttributeValue("", 508, Url.Action("RenderImage","Home", new { id = @Model.Id}), 508, 56, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(565, 120, true);
            WriteLiteral(" class=\"thumbnail\" alt=\"Game Thumbnail\" style=\"width:200px;height:100px\" />\r\n\r\n        </dd>\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(686, 47, false);
#line 28 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Games\Details.cshtml"
       Write(Html.DisplayNameFor(model => model.Description));

#line default
#line hidden
            EndContext();
            BeginContext(733, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(777, 43, false);
#line 31 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Games\Details.cshtml"
       Write(Html.DisplayFor(model => model.Description));

#line default
#line hidden
            EndContext();
            BeginContext(820, 43, true);
            WriteLiteral("\r\n        </dd>\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(864, 39, false);
#line 34 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Games\Details.cshtml"
       Write(Html.DisplayNameFor(model => model.Url));

#line default
#line hidden
            EndContext();
            BeginContext(903, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(947, 35, false);
#line 37 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Games\Details.cshtml"
       Write(Html.DisplayFor(model => model.Url));

#line default
#line hidden
            EndContext();
            BeginContext(982, 43, true);
            WriteLiteral("\r\n        </dd>\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(1026, 42, false);
#line 40 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Games\Details.cshtml"
       Write(Html.DisplayNameFor(model => model.Active));

#line default
#line hidden
            EndContext();
            BeginContext(1068, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(1112, 38, false);
#line 43 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Games\Details.cshtml"
       Write(Html.DisplayFor(model => model.Active));

#line default
#line hidden
            EndContext();
            BeginContext(1150, 47, true);
            WriteLiteral("\r\n        </dd>\r\n    </dl>\r\n</div>\r\n<div>\r\n    ");
            EndContext();
            BeginContext(1197, 54, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "0cee078822924e79a246ef867fc1cc57", async() => {
                BeginContext(1243, 4, true);
                WriteLiteral("Edit");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            if (__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues == null)
            {
                throw new InvalidOperationException(InvalidTagHelperIndexerAssignment("asp-route-id", "Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper", "RouteValues"));
            }
            BeginWriteTagHelperAttribute();
#line 48 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Games\Details.cshtml"
                           WriteLiteral(Model.Id);

#line default
#line hidden
            __tagHelperStringValueBuffer = EndWriteTagHelperAttribute();
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues["id"] = __tagHelperStringValueBuffer;
            __tagHelperExecutionContext.AddTagHelperAttribute("asp-route-id", __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues["id"], global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(1251, 8, true);
            WriteLiteral(" |\r\n    ");
            EndContext();
            BeginContext(1259, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c15262622f1b4d78a55a4bae381910f8", async() => {
                BeginContext(1281, 12, true);
                WriteLiteral("Back to List");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_1.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(1297, 10, true);
            WriteLiteral("\r\n</div>\r\n");
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
