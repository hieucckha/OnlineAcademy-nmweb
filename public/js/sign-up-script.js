$('.sign-up-form').on('submit', function(e) {
    e.preventDefault();

    const firstName = $('#txtFirstName').val();
    if(firstName.length === 0) {
        alert('Invalid data!');
        return;
    }

    const lastName = $('#txtLastName').val();
    if(lastName.length === 0) {
        alert('Invalid data!');
        return;
    }

    const email = $('#txtEmail').val();
    if(email.length === 0) {
        alert('Invalid data!');
        return;
    }

    const pass = $('#txtPass').val();
    if(pass.length === 0) {
        alert('Invalid data!');
        return;
    }

    const confirmPass = $('#txtConfirmPass').val();
    if(confirmPass.length === 0) {
        alert('Invalid data!');
        return;
    }

    if(pass !== confirmPass) {
        alert('Password does not match!');
        return;
    }

    $.getJSON(`/account/is-available?email=${email}`, function(data) {
        if (data === false){
            alert('Email already exits!');
        } else {
            alert('Successful account registration');
            $('.sign-up-form').off('submit').submit();
        }
    });
});