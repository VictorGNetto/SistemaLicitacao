const documentItems = [
];
for (let i = 1; i <= 14; i++) {
    documentItems.push("document-item-" + i.toString());
}
let itemSelected = '1';

window.onload = function ()
{
    const firstDocumentItem = document.getElementById(documentItems[0]);

    firstDocumentItem.classList.toggle('hidden-item');

    construct_items_selector();
};

function construct_items_selector()
{
    const elem = document.getElementById("items-selector");

    let innerHTML = '';
    for (let i = 0; i < documentItems.length; i++) {
        innerHTML += '<button class="btn btn-secondary me-2" onclick="change_document_item(event)">';
        innerHTML += (i + 1).toString();
        innerHTML += '</button>';        
    }

    elem.innerHTML = innerHTML;
    elem.firstChild.classList.toggle("btn-primary");
    elem.firstChild.classList.toggle("btn-secondary");
}

function change_document_item(event)
{
    const clickedItem = event['target'].innerHTML;

    // Quando o item do cumento é alterado
    if (itemSelected != clickedItem) {
        update_item_buttons(itemSelected, clickedItem);
        
        let index = parseInt(itemSelected) - 1;
        const currentDocumentItem = document.getElementById(documentItems[index]);

        itemSelected = clickedItem;
        index = parseInt(itemSelected) - 1;
        const newDocumentItem = document.getElementById(documentItems[index]);

        currentDocumentItem.classList.toggle('hidden-item');
        newDocumentItem.classList.toggle('hidden-item');
    }
}

function update_item_buttons(lastSelected, newSelected) {
    const elem = document.getElementById("items-selector");

    for (const child of elem.children) {
        if (child.innerHTML == lastSelected || child.innerHTML == newSelected) {
            child.classList.toggle("btn-primary");
            child.classList.toggle("btn-secondary");
        }
    }
}