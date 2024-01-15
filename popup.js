document.getElementById('countButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: countTextOnPage
        }, (results) => {
            if (results && results[0]) {
                const { chars, words, sentences } = results[0].result;
                document.getElementById('charCount').textContent = chars;
                document.getElementById('wordCount').textContent = words;
                document.getElementById('sentenceCount').textContent = sentences;
            }
        });
    });
});

function countTextOnPage() {
    let text = document.body.innerText;
    let chars = text.length;
    let words = text.match(/\w+/g).length;
    let sentences = text.split(/[.!?]+/).length - 1;
    return { chars, words, sentences };
}
