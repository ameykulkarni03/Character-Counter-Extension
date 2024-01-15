function countText() {
    let text = document.body.innerText;
    let chars = text.length;
    let words = text.match(/\w+/g).length;
    let sentences = text.split(/[.!?]+/).length - 1;

    return { chars, words, sentences };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "count") {
        sendResponse(countText());
    }
});
