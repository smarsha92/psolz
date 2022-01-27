//Countdown Timer
const clockdiv = document.getElementById("countdown");
const countDownTime = new Date(
    clockdiv.getAttribute("data-date")
).getTime();

const countdownfunction = setInterval(function() {
    const now = new Date().getTime();
    const diff = countDownTime - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    const minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
    const seconds = Math.floor(diff % (1000 * 60) / 1000);

    if (diff < 0) {
        clockdiv.style.display = "none";
        clearInterval(countdownfunction);
    } else {
        clockdiv.querySelector(".days").innerHTML = days;
        clockdiv.querySelector(".hours").innerHTML = hours;
        clockdiv.querySelector(".minutes").innerHTML = minutes;
        clockdiv.querySelector(".seconds").innerHTML = seconds;
    }
}, 1000);


// METAMASK CONNECTION
window.addEventListener('DOMContentLoaded', () => {
    const onboarding = new MetaMaskOnboarding();
    const onboardButton = document.getElementById('connectWallet');
    let accounts;

    const updateButton = () => {
        if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
            onboardButton.innerText = 'Install MetaMask!';
            onboardButton.onclick = () => {
                onboardButton.innerText = 'Connecting...';
                onboardButton.disabled = true;
                onboarding.startOnboarding();
            };
        } else if (accounts && accounts.length > 0) {
            onboardButton.innerText = `✔ ...${accounts[0].slice(-4)}`;
            onboardButton.disabled = true;
            onboarding.stopOnboarding();
        } else {
            onboardButton.innerText = 'Connect MetaMask!';
            onboardButton.onclick = async() => {
                await window.ethereum.request({
                        method: 'eth_requestAccounts',
                    })
                    .then(function(accounts) {
                        onboardButton.innerText = `✔ ...${accounts[0].slice(-4)}`;
                        onboardButton.disabled = true;
                    });
            };
        }
    };

    updateButton();
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        window.ethereum.on('accountsChanged', (newAccounts) => {
            accounts = newAccounts;
            updateButton();
        });
    }
});

//Title preview //
const getTitle = async page => {
    const title = await page.evaluate(() => {
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle != null && ogTitle.content.length > 0) {
            return ogTitle.content;
        }
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle != null && twitterTitle.content.length > 0) {
            return twitterTitle.content;
        }
        const docTitle = document.title;
        if (docTitle != null && docTitle.length > 0) {
            return docTitle;
        }
        const h1 = document.querySelector("h1").innerHTML;
        if (h1 != null && h1.length > 0) {
            return h1;
        }
        const h2 = document.querySelector("h1").innerHTML;
        if (h2 != null && h2.length > 0) {
            return h2;
        }
        return null;
    });
    return title;
};
//end//

//Description//