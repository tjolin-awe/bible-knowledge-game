#pragma checksum "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "da8a2e0853ae38b1204ca52e6efbd7a723cd8608"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Squares_Edit), @"mvc.1.0.view", @"/Views/Squares/Edit.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Squares/Edit.cshtml", typeof(AspNetCore.Views_Squares_Edit))]
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
#line 1 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\_ViewImports.cshtml"
using BKGLevelGenerator;

#line default
#line hidden
#line 2 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\_ViewImports.cshtml"
using BKGLevelGenerator.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da8a2e0853ae38b1204ca52e6efbd7a723cd8608", @"/Views/Squares/Edit.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"9163b6ff0913eb425f9f99cab59342d4e709cf16", @"/Views/_ViewImports.cshtml")]
    public class Views_Squares_Edit : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<BKGLevelGenerator.Models.Square>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("text-danger"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("type", "hidden", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("control-label"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("form-control"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("placeholder", new global::Microsoft.AspNetCore.Html.HtmlString("Enter Question..."), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("autocomplete", new global::Microsoft.AspNetCore.Html.HtmlString("off"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_6 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("type", "number", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_7 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("placeholder", new global::Microsoft.AspNetCore.Html.HtmlString("Enter Value..."), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_8 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("enctype", new global::Microsoft.AspNetCore.Html.HtmlString("multipart/form-data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_9 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Edit", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_10 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("myform"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.ValidationSummaryTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_ValidationSummaryTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.InputTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.LabelTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_LabelTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.ValidationMessageTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_ValidationMessageTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(40, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 3 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
  
    ViewData["Title"] = "Edit";

#line default
#line hidden
            BeginContext(82, 70, true);
            WriteLiteral("\r\n\r\n<h1>Details</h1>\r\n<h2>Square</h2>\r\n<hr />\r\n<div class=\"row\">\r\n    ");
            EndContext();
            BeginContext(152, 4527, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "433fb12c1e5c4527a481528e880251e7", async() => {
                BeginContext(218, 331, true);
                WriteLiteral(@"
        <div class=""form-group"">
            <div class=""col-md-4"">
                <div class=""panel panel-default"">
                    <div class=""panel-heading"">
                        <p class=""panel-title"">Question</p>
                    </div>
                    <div class=""panel-body"">
                        ");
                EndContext();
                BeginContext(549, 66, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("div", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "2b919d4ea5544049b5840f666e0f8e14", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_ValidationSummaryTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.ValidationSummaryTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_ValidationSummaryTagHelper);
#line 20 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_ValidationSummaryTagHelper.ValidationSummary = global::Microsoft.AspNetCore.Mvc.Rendering.ValidationSummary.ModelOnly;

#line default
#line hidden
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-validation-summary", __Microsoft_AspNetCore_Mvc_TagHelpers_ValidationSummaryTagHelper.ValidationSummary, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(615, 26, true);
                WriteLiteral("\r\n                        ");
                EndContext();
                BeginContext(641, 36, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("input", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "4443b88446be477c803ee36a0dc72daa", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.InputTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.InputTypeName = (string)__tagHelperAttribute_1.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
#line 21 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.For = ModelExpressionProvider.CreateModelExpression(ViewData, __model => __model.Id);

#line default
#line hidden
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-for", __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.For, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(677, 26, true);
                WriteLiteral("\r\n                        ");
                EndContext();
                BeginContext(703, 44, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("input", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "6bb1ec65ebae445c95bb33b3d493091a", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.InputTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.InputTypeName = (string)__tagHelperAttribute_1.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
#line 22 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.For = ModelExpressionProvider.CreateModelExpression(ViewData, __model => __model.CategoryId);

#line default
#line hidden
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-for", __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.For, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(747, 26, true);
                WriteLiteral("\r\n                        ");
                EndContext();
                BeginContext(773, 42, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("input", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "30adafe3ea324c0f94ffef5064966921", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.InputTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.InputTypeName = (string)__tagHelperAttribute_1.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
#line 23 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.For = ModelExpressionProvider.CreateModelExpression(ViewData, __model => __model.SquareId);

#line default
#line hidden
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-for", __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.For, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(815, 59, true);
                WriteLiteral("\r\n                        <input type=\"hidden\" name=\"board\"");
                EndContext();
                BeginWriteAttribute("value", " value=\"", 874, "\"", 896, 1);
#line 24 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
WriteAttributeValue("", 882, ViewBag.Board, 882, 14, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(897, 193, true);
                WriteLiteral(" />\r\n\r\n                        <div class=\"form-group\">\r\n\r\n                            <label class=\"control-label\">Category</label>\r\n                            <p class=\"form-control-static\">");
                EndContext();
                BeginContext(1091, 20, false);
#line 29 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
                                                      Write(Model.Category.Title);

#line default
#line hidden
                EndContext();
                BeginContext(1111, 120, true);
                WriteLiteral("</p>\r\n\r\n                        </div>\r\n\r\n                        <div class=\"form-group\">\r\n                            ");
                EndContext();
                BeginContext(1231, 57, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("label", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "45a4b4e11f9c4106b380624c7300e9e3", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_LabelTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.LabelTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_LabelTagHelper);
#line 34 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_LabelTagHelper.For = ModelExpressionProvider.CreateModelExpression(ViewData, __model => __model.Question);

#line default
#line hidden
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-for", __Microsoft_AspNetCore_Mvc_TagHelpers_LabelTagHelper.For, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(1288, 30, true);
                WriteLiteral("\r\n                            ");
                EndContext();
                BeginContext(1318, 100, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("input", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "e09f8943510a433aab417e84a27b63d9", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.InputTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper);
#line 35 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.For = ModelExpressionProvider.CreateModelExpression(ViewData, __model => __model.Question);

#line default
#line hidden
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-for", __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.For, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_5);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(1418, 30, true);
                WriteLiteral("\r\n                            ");
                EndContext();
                BeginContext(1448, 63, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("span", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f1ffa9b9dace4970beac12b9ad648af1", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_ValidationMessageTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.ValidationMessageTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_ValidationMessageTagHelper);
#line 36 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_ValidationMessageTagHelper.For = ModelExpressionProvider.CreateModelExpression(ViewData, __model => __model.Question);

#line default
#line hidden
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-validation-for", __Microsoft_AspNetCore_Mvc_TagHelpers_ValidationMessageTagHelper.For, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(1511, 112, true);
                WriteLiteral("\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            ");
                EndContext();
                BeginContext(1623, 53, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("label", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "b33b2d739a0b4031a7915e9e5cb22fbb", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_LabelTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.LabelTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_LabelTagHelper);
#line 39 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_LabelTagHelper.For = ModelExpressionProvider.CreateModelExpression(ViewData, __model => __model.Value);

#line default
#line hidden
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-for", __Microsoft_AspNetCore_Mvc_TagHelpers_LabelTagHelper.For, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(1676, 30, true);
                WriteLiteral("\r\n                            ");
                EndContext();
                BeginContext(1706, 108, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("input", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "ed1fc1aa6ddb44d69abcc9b4ef8b81d9", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.InputTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper);
#line 40 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.For = ModelExpressionProvider.CreateModelExpression(ViewData, __model => __model.Value);

#line default
#line hidden
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-for", __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.For, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.InputTypeName = (string)__tagHelperAttribute_6.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_6);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_7);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_5);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(1814, 30, true);
                WriteLiteral("\r\n                            ");
                EndContext();
                BeginContext(1844, 60, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("span", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9dbe7c23997f4684a5a9c75fcc72a4ad", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_ValidationMessageTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.ValidationMessageTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_ValidationMessageTagHelper);
#line 41 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_ValidationMessageTagHelper.For = ModelExpressionProvider.CreateModelExpression(ViewData, __model => __model.Value);

#line default
#line hidden
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-validation-for", __Microsoft_AspNetCore_Mvc_TagHelpers_ValidationMessageTagHelper.For, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(1904, 575, true);
                WriteLiteral(@"
                        </div>



                        <div class=""form-group"">
                            <hr />
                            <table class=""table table-bordered table-condensed table-hover table-responsive table-striped"">
                                <thead>
                                    <tr>
                                        <th>Answer</th>
                                        <th>Correct</th>
                                    </tr>
                                </thead>
                                <tbody>
");
                EndContext();
#line 56 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
                                     for (int i = 0; i < Model.Answers.Count(); i++)
                                    {


#line default
#line hidden
                BeginContext(2606, 152, true);
                WriteLiteral("                                        <tr>\r\n\r\n                                            <td>\r\n                                                <input");
                EndContext();
                BeginWriteAttribute("id", " id=\"", 2758, "\"", 2774, 2);
                WriteAttributeValue("", 2763, "answerId_", 2763, 9, true);
#line 62 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
WriteAttributeValue("", 2772, i, 2772, 2, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 2775, "\"", 2813, 1);
#line 62 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
WriteAttributeValue("", 2783, Model.Answers.ElementAt(i).Id, 2783, 30, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginWriteAttribute("name", " name=\"", 2814, "\"", 2835, 3);
                WriteAttributeValue("", 2821, "Answers[", 2821, 8, true);
#line 62 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
WriteAttributeValue("", 2829, i, 2829, 2, false);

#line default
#line hidden
                WriteAttributeValue("", 2831, "].Id", 2831, 4, true);
                EndWriteAttribute();
                BeginContext(2836, 127, true);
                WriteLiteral(" type=\"hidden\" checked=\"\" />\r\n                                         \r\n                                                <input");
                EndContext();
                BeginWriteAttribute("id", " id=\"", 2963, "\"", 2984, 2);
                WriteAttributeValue("", 2968, "answerDisplay_", 2968, 14, true);
#line 64 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
WriteAttributeValue("", 2982, i, 2982, 2, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 2985, "\"", 3028, 1);
#line 64 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
WriteAttributeValue("", 2993, Model.Answers.ElementAt(i).Display, 2993, 35, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginWriteAttribute("name", " name=\"", 3029, "\"", 3055, 3);
                WriteAttributeValue("", 3036, "Answers[", 3036, 8, true);
#line 64 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
WriteAttributeValue("", 3044, i, 3044, 2, false);

#line default
#line hidden
                WriteAttributeValue("", 3046, "].Display", 3046, 9, true);
                EndWriteAttribute();
                BeginContext(3056, 214, true);
                WriteLiteral(" type=\"text\" class=\"form-control\" autocomplete=\"off\" />\r\n                                            </td>\r\n                                            <td>\r\n\r\n                                                <input");
                EndContext();
                BeginWriteAttribute("id", " id=\"", 3270, "\"", 3291, 2);
                WriteAttributeValue("", 3275, "answerCorrect_", 3275, 14, true);
#line 68 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
WriteAttributeValue("", 3289, i, 3289, 2, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(3292, 13, true);
                WriteLiteral(" value=\"true\"");
                EndContext();
                BeginWriteAttribute("name", " name=\"", 3305, "\"", 3331, 3);
                WriteAttributeValue("", 3312, "Answers[", 3312, 8, true);
#line 68 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
WriteAttributeValue("", 3320, i, 3320, 2, false);

#line default
#line hidden
                WriteAttributeValue("", 3322, "].Correct", 3322, 9, true);
                EndWriteAttribute();
                BeginContext(3332, 33, true);
                WriteLiteral(" type=\"checkbox\" class=\"checkbox\"");
                EndContext();
                BeginWriteAttribute("checked", " checked=\"", 3365, "\"", 3410, 1);
#line 68 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
WriteAttributeValue("", 3375, Model.Answers.ElementAt(i).Correct, 3375, 35, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(3411, 59, true);
                WriteLiteral(" />\r\n                                                <input");
                EndContext();
                BeginWriteAttribute("id", " id=\"", 3470, "\"", 3491, 2);
                WriteAttributeValue("", 3475, "answerCorrect_", 3475, 14, true);
#line 69 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
WriteAttributeValue("", 3489, i, 3489, 2, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(3492, 133, true);
                WriteLiteral(" value=\"false\" type=\"hidden\" />\r\n                                            </td>\r\n\r\n                                        </tr>\r\n");
                EndContext();
#line 73 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
                                    }

#line default
#line hidden
                BeginContext(3664, 667, true);
                WriteLiteral(@"
                                </tbody>
                            </table>

                        </div>


                        <input type=""submit"" class=""btn btn-primary btn-block"" style=""width:80%;margin:auto"" />
                    </div>
                </div>
            </div><div class=""col-md-8"">
                <div class=""panel panel-default"">
                    <div class=""panel-heading"">
                        <p class=""panel-title"">Image</p>
                    </div>
                    <div class=""panel-body"">
                        <div class=""form-group"">


                            <img class=""img-thumbnail""");
                EndContext();
                BeginWriteAttribute("src", " src=\"", 4331, "\"", 4357, 1);
#line 93 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
WriteAttributeValue("", 4337, ViewBag.ImageBase64, 4337, 20, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(4358, 314, true);
                WriteLiteral(@" />
                            <label class=""control-label"">Upload New Image</label>

                            <input id=""file"" name=""file"" class=""form-control"" type=""file"" />


                        </div>
                    </div>
                </div>
            </div>

        </div>
    ");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_8);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.Action = (string)__tagHelperAttribute_9.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_9);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_10);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(4679, 18, true);
            WriteLiteral("\r\n\r\n</div>\r\n\r\n\r\n\r\n");
            EndContext();
            DefineSection("Scripts", async() => {
                BeginContext(4715, 2, true);
                WriteLiteral("\r\n");
                EndContext();
#line 112 "C:\Users\tom\Documents\GitHub\bible-knowledge-game\BKGLevelGenerator\BKGLevelGenerator\Views\Squares\Edit.cshtml"
      await Html.RenderPartialAsync("_ValidationScriptsPartial");

#line default
#line hidden
                BeginContext(4785, 425, true);
                WriteLiteral(@"
<script type=""text/javascript"">
    $(document).ready(function () {
        $('form').on('change', ':checkbox', function () {
            if (this.checked) {
                $(this).val(true);
            }
            else {
                $(this).val(false);
            }
        });

        /* Get input values from form */
        var values = $(""#myform"").serializeArray();

      
    });</script>
");
                EndContext();
            }
            );
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<BKGLevelGenerator.Models.Square> Html { get; private set; }
    }
}
#pragma warning restore 1591
