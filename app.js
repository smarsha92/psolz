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
const getDescription = async(page) => {
    const description = await page.evaluate(() => {
        const ogDescription = document.querySelector(
            'meta[property="og:description"]'
        );
        if (ogDescription != null && ogDescription.content.length > 0) {
            return ogDescription.content;
        }
        const twitterDescription = document.querySelector(
            'meta[name="twitter:description"]'
        );
        if (twitterDescription != null && twitterDescription.content.length > 0) {
            return twitterDescription.content;
        }
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription != null && metaDescription.content.length > 0) {
            return metaDescription.content;
        }
        paragraphs = document.querySelectorAll("p");
        let fstVisibleParagraph = null;
        for (let i = 0; i < paragraphs.length; i++) {
            if (
                // if object is visible in dom
                paragraphs[i].offsetParent !== null &&
                !paragraphs[i].childElementCount != 0
            ) {
                fstVisibleParagraph = paragraphs[i].textContent;
                break;
            }
        }
        return fstVisibleParagraph;
    });
    return description;
};
//end//

//Description//