#pragma checksum "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Home\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "0fad9f9bb49c81ff12bd3c4a6a456353959fe581"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Index), @"mvc.1.0.view", @"/Views/Home/Index.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Home/Index.cshtml", typeof(AspNetCore.Views_Home_Index))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"0fad9f9bb49c81ff12bd3c4a6a456353959fe581", @"/Views/Home/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"2eb0766371cec35afd15af15beffcfece0cc4397", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<IEnumerable<levelEditor.Models.Game>>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Index", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-controller", "Games", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("btn btn-primary"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Game", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("btn btn-block btn-primary"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-controller", "BKG", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_6 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("btn btn-block btn-secondary"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            BeginContext(45, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 3 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Home\Index.cshtml"
  
    ViewData["Title"] = "Home Page";

#line default
#line hidden
            BeginContext(92, 1614, true);
            WriteLiteral(@"
<div id=""carouselExampleIndicators"" class=""carousel slide"" data-ride=""carousel"">
    <ol class=""carousel-indicators"">
        <li data-target=""#carouselExampleIndicators"" data-slide-to=""0"" class=""active""></li>
        <li data-target=""#carouselExampleIndicators"" data-slide-to=""1""></li>
        <li data-target=""#carouselExampleIndicators"" data-slide-to=""2""></li>
    </ol>
    <div class=""carousel-inner"">
        <div class=""carousel-item active"">
            <img class=""d-block w-100"" src=""/images/slide1.png"" alt=""First slide"">
            <div class=""carousel-caption d-none d-md-block"">
                <h3>Bible Knowledge Game</h3>
                <p>Test your Bible knowledge!</p>
            </div>
        </div>
        <div class=""carousel-item"">
            <img class=""d-block w-100"" src=""/images/slide2.png"" alt=""Second slide"">
            <div class=""carousel-caption d-none d-md-block"">
                <h3>Bible Character Match</h3>
                <p>Coming soon!</p>
            </d");
            WriteLiteral(@"iv>
        </div>
        
    </div>
    <a class=""carousel-control-prev"" href=""#carouselExampleIndicators"" role=""button"" data-slide=""prev"">
        <span class=""carousel-control-prev-icon"" aria-hidden=""true""></span>
        <span class=""sr-only"">Previous</span>
    </a>
    <a class=""carousel-control-next"" href=""#carouselExampleIndicators"" role=""button"" data-slide=""next"">
        <span class=""carousel-control-next-icon"" aria-hidden=""true""></span>
        <span class=""sr-only"">Next</span>
    </a>
</div>


<div class=""row mt-4"">
    <div class=""col-md-12"">
        ");
            EndContext();
            BeginContext(1706, 85, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f5514744b567436e855b91a162a07206", async() => {
                BeginContext(1775, 12, true);
                WriteLiteral("Manage Games");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Controller = (string)__tagHelperAttribute_1.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(1791, 48, true);
            WriteLiteral("\r\n    </div>\r\n</div>\r\n\r\n<div class=\"row mt-4\">\r\n");
            EndContext();
#line 48 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Home\Index.cshtml"
     foreach (var game in @Model)
    {

#line default
#line hidden
            BeginContext(1881, 108, true);
            WriteLiteral("        <div class=\"col-md-4\">\r\n\r\n            <div class=\"card\" style=\"width: 18rem;\">\r\n                <img");
            EndContext();
            BeginWriteAttribute("src", " src=\"", 1989, "\"", 2042, 1);
#line 53 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Home\Index.cshtml"
WriteAttributeValue("", 1995, Url.Action("RenderImage", new { id = game.Id}), 1995, 47, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(2043, 144, true);
            WriteLiteral(" class=\"card-img-top\" alt=\"Card image cap\" />\r\n\r\n         \r\n                <div class=\"card-body\">\r\n                    <h5 class=\"card-title\">");
            EndContext();
            BeginContext(2188, 9, false);
#line 57 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Home\Index.cshtml"
                                      Write(game.Name);

#line default
#line hidden
            EndContext();
            BeginContext(2197, 48, true);
            WriteLiteral("</h5>\r\n                    <p class=\"card-text\">");
            EndContext();
            BeginContext(2246, 16, false);
#line 58 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Home\Index.cshtml"
                                    Write(game.Description);

#line default
#line hidden
            EndContext();
            BeginContext(2262, 6, true);
            WriteLiteral("</p>\r\n");
            EndContext();
#line 59 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Home\Index.cshtml"
                     if (game.Active)
                    {

#line default
#line hidden
            BeginContext(2330, 24, true);
            WriteLiteral("                        ");
            EndContext();
            BeginContext(2354, 87, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "3de49ac92d1c414293df35fb7e5c3c98", async() => {
                BeginContext(2433, 4, true);
                WriteLiteral("Play");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_3.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_3);
            if (__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues == null)
            {
                throw new InvalidOperationException(InvalidTagHelperIndexerAssignment("asp-route-id", "Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper", "RouteValues"));
            }
            BeginWriteTagHelperAttribute();
#line 61 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Home\Index.cshtml"
                                               WriteLiteral(game.Id);

#line default
#line hidden
            __tagHelperStringValueBuffer = EndWriteTagHelperAttribute();
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues["id"] = __tagHelperStringValueBuffer;
            __tagHelperExecutionContext.AddTagHelperAttribute("asp-route-id", __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues["id"], global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(2441, 26, true);
            WriteLiteral("\r\n                        ");
            EndContext();
            BeginContext(2467, 89, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c4707b07b6fd442baa44d0a809dd5e1a", async() => {
                BeginContext(2546, 6, true);
                WriteLiteral("Manage");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Controller = (string)__tagHelperAttribute_5.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_5);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_6);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(2556, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 63 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Home\Index.cshtml"
                    }
                    else
                    {

#line default
#line hidden
            BeginContext(2630, 104, true);
            WriteLiteral("                        <button type=\"button\" class=\"btn btn-block btn-secondary\">Coming Soon</button>\r\n");
            EndContext();
#line 67 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Home\Index.cshtml"
                    }

#line default
#line hidden
            BeginContext(2757, 60, true);
            WriteLiteral("                </div>\r\n            </div>\r\n        </div>\r\n");
            EndContext();
#line 71 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\levelEditor\Views\Home\Index.cshtml"
    }

#line default
#line hidden
            BeginContext(2824, 8, true);
            WriteLiteral("</div>\r\n");
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<IEnumerable<levelEditor.Models.Game>> Html { get; private set; }
    }
}
#pragma warning restore 1591
