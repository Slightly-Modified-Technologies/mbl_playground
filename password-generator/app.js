const alertBox = document.querySelector('.alert-box')

function getPassword() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/";
    let pwLength = {
        short: 8,
        med: 16,
        long: 21
    }; // Note: Can change pw length! short med long
    let pw = "";

    for (var i = 0; i < pwLength.long; i++) {
        let randNum = Math.floor(Math.random() * chars.length);
        pw += chars.substring(randNum, randNum + 1);
    }
    document.getElementById("password").value = pw;
    alertBox.innerHTML = `New Password Copied: <br> ${pw}`
    getTimezone();
    getIPAddress();
}

function copyPassword() {
    let copyPwTxt = document.getElementById("password");
    copyPwTxt.select();
    copyPwTxt.setSelectionRange(0, 9999);
    document.execCommand("copy");
    alertBox.classList.toggle('active');
    setTimeout(function() {
        alertBox.classList.toggle('active');
    }, 2000);
}

function getTimezone() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById("timezone").innerHTML = `Timezone: ${timezone}`;
}

function getIPAddress() {
    fetch("https://api.ipify.org/?format=json")
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            document.getElementById("ipaddress").innerHTML = `IP Address: ${ipAddress}`;
        })
        .catch(error => console.error(error));
}