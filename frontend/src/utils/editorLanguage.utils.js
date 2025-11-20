export function editorLanguage(extension){
    if(extension == 'html') return "html"
    if(extension == 'css') return "css"
    if(extension == 'js' || extension =='jsx') return "javascript"
    if(extension == 'json') return "json"
    if(extension == 'md') return "markdown"
}