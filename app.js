// DOM refs
const summaryDiv = document.getElementById('summary');
const summarizeBtn = document.getElementById('summarizeBtn');

// configs
const serverEndpoint = "https://evolving-porpoise-heartily.ngrok-free.app";

// vars
let processing = false;

summarizeBtn.addEventListener('click', () => {
    if (processing) return;

    processing = true;
    summaryDiv.innerHTML = "Processing...";

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        let post_url = tabs[0].url;

        fetch(`${serverEndpoint}/read_post`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ post_url: post_url }),
            mode: 'no-cors'
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                summaryDiv.innerHTML = data.summary;
                processing = false;
            })
            .catch(err => {
                console.error(err);
                summarizeDiv.innerHTML = "Summaries will show up here!";
                processing = false;
            });
    });
});

