#pragma checksum "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\BKG\SquareDetails.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "f3913c4143e39781e224ccf35ae58e109d42d00d"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_BKG_SquareDetails), @"mvc.1.0.view", @"/Views/BKG/SquareDetails.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/BKG/SquareDetails.cshtml", typeof(AspNetCore.Views_BKG_SquareDetails))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f3913c4143e39781e224ccf35ae58e109d42d00d", @"/Views/BKG/SquareDetails.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"2eb0766371cec35afd15af15beffcfece0cc4397", @"/Views/_ViewImports.cshtml")]
    public class Views_BKG_SquareDetails : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<levelEditor.Models.BKG.Square>
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
            BeginContext(38, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 3 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\BKG\SquareDetails.cshtml"
  
    ViewData["Title"] = "View";
    Layout = "~/Views/Shared/_Layout_Manage.cshtml";

#line default
#line hidden
            BeginContext(134, 117, true);
            WriteLiteral("\r\n<h2>View</h2>\r\n\r\n<div>\r\n    <h4>Square</h4>\r\n    <hr />\r\n    <dl class=\"dl-horizontal\">\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(252, 44, false);
#line 15 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\BKG\SquareDetails.cshtml"
       Write(Html.DisplayNameFor(model => model.SquareId));

#line default
#line hidden
            EndContext();
            BeginContext(296, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(340, 40, false);
#line 18 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\BKG\SquareDetails.cshtml"
       Write(Html.DisplayFor(model => model.SquareId));

#line default
#line hidden
            EndContext();
            BeginContext(380, 43, true);
            WriteLiteral("\r\n        </dd>\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(424, 44, false);
#line 21 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\BKG\SquareDetails.cshtml"
       Write(Html.DisplayNameFor(model => model.Question));

#line default
#line hidden
            EndContext();
            BeginContext(468, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(512, 40, false);
#line 24 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\BKG\SquareDetails.cshtml"
       Write(Html.DisplayFor(model => model.Question));

#line default
#line hidden
            EndContext();
            BeginContext(552, 43, true);
            WriteLiteral("\r\n        </dd>\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(596, 41, false);
#line 27 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\BKG\SquareDetails.cshtml"
       Write(Html.DisplayNameFor(model => model.Value));

#line default
#line hidden
            EndContext();
            BeginContext(637, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(681, 37, false);
#line 30 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\BKG\SquareDetails.cshtml"
       Write(Html.DisplayFor(model => model.Value));

#line default
#line hidden
            EndContext();
            BeginContext(718, 43, true);
            WriteLiteral("\r\n        </dd>\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(762, 44, false);
#line 33 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\BKG\SquareDetails.cshtml"
       Write(Html.DisplayNameFor(model => model.Category));

#line default
#line hidden
            EndContext();
            BeginContext(806, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(850, 46, false);
#line 36 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\BKG\SquareDetails.cshtml"
       Write(Html.DisplayFor(model => model.Category.Title));

#line default
#line hidden
            EndContext();
            BeginContext(896, 43, true);
            WriteLiteral("\r\n        </dd>\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(940, 49, false);
#line 39 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\BKG\SquareDetails.cshtml"
       Write(Html.DisplayNameFor(model => model.ImageFilename));

#line default
#line hidden
            EndContext();
            BeginContext(989, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(1033, 45, false);
#line 42 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\BKG\SquareDetails.cshtml"
       Write(Html.DisplayFor(model => model.ImageFilename));

#line default
#line hidden
            EndContext();
            BeginContext(1078, 43, true);
            WriteLiteral("\r\n        </dd>\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(1122, 41, false);
#line 45 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\BKG\SquareDetails.cshtml"
       Write(Html.DisplayNameFor(model => model.Image));

#line default
#line hidden
            EndContext();
            BeginContext(1163, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(1207, 37, false);
#line 48 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\BKG\SquareDetails.cshtml"
       Write(Html.DisplayFor(model => model.Image));

#line default
#line hidden
            EndContext();
            BeginContext(1244, 47, true);
            WriteLiteral("\r\n        </dd>\r\n    </dl>\r\n</div>\r\n<div>\r\n    ");
            EndContext();
            BeginContext(1291, 54, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "de7bed385ffd468cb7d2ce5c13e1c1ae", async() => {
                BeginContext(1337, 4, true);
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
#line 53 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\BKG\SquareDetails.cshtml"
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
            BeginContext(1345, 8, true);
            WriteLiteral(" |\r\n    ");
            EndContext();
            BeginContext(1353, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "91a43c7014b743b394054181c115a653", async() => {
                BeginContext(1375, 12, true);
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
            BeginContext(1391, 10, true);
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<levelEditor.Models.BKG.Square> Html { get; private set; }
    }
}
#pragma warning restore 1591
