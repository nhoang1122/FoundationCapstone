const joinBtn = document.querySelector('#btn-join');

const alertJoin = () => {
    alert("Thank you for your subscription. Process may take up to 10 minutes. Check Email for Confirmation!")
}

joinBtn.addEventListener('click', alertJoin)