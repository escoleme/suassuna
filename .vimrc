" Asynchronous Lint Engine (ALE) {{{
" Github link for ALE: https://github.com/w0rp/ale

let g:ale_linters = {
\   'javascript': [
\       'typescript',
\       'eslint',
\   ],
\}

let g:ale_fixers = {
\   'javascript': [
\       'eslint',
\       'prettier_eslint',
\       'trim_whitespace',
\       'remove_trailing_lines',
\   ],
\}

" }}}
