// Código baseado em http://jsfiddle.net/hmelenok/WM6Gq/

const textareaElements = document.getElementsByTagName('textarea');

function register_callback(event, elem) {
    elem.addEventListener(event, (e) => {
        // É necessário o uso do .setTimeout aqui para que as
        // informações do target seja devidamete atualizadas.
        window.setTimeout(() => {
            const target = e.target;
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
        }, 0);
    });
}

for (const elem of textareaElements) {
    if (elem.classList.contains('input-text')) {
        register_callback('keydown', elem);
        register_callback('cut', elem);
        register_callback('paste', elem);
        register_callback('drop', elem);
    }
}