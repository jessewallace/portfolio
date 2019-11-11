$(document).ready(function() {
    var emailAddress = $('.js-emailAddress');
        logInButton = $('.js-logIn');
        logInSection = $('.js-logInSection');
        updateButton = $('.js-updatePass');
        updateSection = $('.js-updateSection');
        updateForm = $('.js-updateForm');
        mergeSection = $('.js-mergeSection');
        mergeEmail = $('.js-mergeEmail');
        mergeButton = $('.js-mergeAccounts');
        messageContainer = $('.js-message');
        messageText = $('.js-messageText');
        loadingIcon = $('.js-loadingIcon');
        loadingIconSibling = loadingIcon.prev();
        newPassword = $('.js-newPass');
        newPasswordIcnPos = $('.form__input-icon.is-positive');
        newPasswordIcnNeg = $('.form__input-icon.is-negative');
        confirmPass = $('.js-confirmPass');
        regSection = $('.js-regSection');
        registerButton = $('.js-register');
        regEmail = $('.js-regEmail');
        signUp = $('.js-signUp');
        signIn = $('.js-signIn');
        openModal = $('.js-openModal');
        closeModal = $('.js-closeModal');
        resetFlow = $('.js-resetFlows');
        greetingText = $('.js-greeting');
        genderButton = $('.modal__button--positive');
        formField = $('.form__input');
        bodyElement = $('body');
        emailArray = [];
        modalOverlay = $('.overlay');

    // Function to reset the modal back to the intial state
    function resetModal() {
        bodyElement.removeClass();

        // Clear the form fields for every section except the merge flow
        logInSection.find(formField).val('');
        updateForm.find(formField).val('');
        regSection.find(formField).val('');

        // Reset the greeting and log in text
        openModal.text('Sign Up or Log In');
        greetingText.text('Welcome, Guest');

        // Hide the password length icons (check and x mark)
        newPasswordIcnPos.addClass('is-hidden');
        newPasswordIcnNeg.addClass('is-hidden');

        // Hide all sections and show the intial login section
        updateSection.addClass('is-hidden');
        mergeSection.addClass('is-hidden');
        regSection.addClass('is-hidden');
        logInSection.removeClass('is-hidden');

        // In the update password section show the password fields and button and hide success messsage
        updateForm.removeClass('is-hidden');
        updateButton.removeClass('is-hidden');
        $('.modal__empty').addClass('is-hidden');

        hideMessageContainer();
    }

    // Hide any message containers and clear out the text
    function hideMessageContainer() {
        messageContainer.addClass('is-hidden').removeClass('message--negative message--positive');
        messageText.text('');
    }

    // Function to check the emailArray to see if it already exists
    function findEmail() {
        for (var i = 0; i < emailArray.length; i++) {
            if (emailEntered == emailArray[i])
                return true;
            }
        return false;
    }

    // When user clicks the log in button
    openModal.on('click', function() {

        // If the user is logged in then reset the page
        if(bodyElement.hasClass('js-loggedIn')) {
            resetModal();

        // If they are not logged in then open the modal
        } else {
            modalOverlay.addClass('is-opened');
            bodyElement.addClass('has-modal');
        }
    });

    closeModal.on('click', function() {
        modalOverlay.removeClass('is-opened');
        resetModal();
    });

    genderButton.on('click', function() {
        $(this).addClass('is-selected').siblings().removeClass('is-selected');
    })

    // After the user exits the new password field check to see if they met the length criteria
    newPassword.on('blur', function() {
        if(newPassword.val().length >= 8) {
            newPasswordIcnPos.removeClass('is-hidden');
            newPasswordIcnNeg.addClass('is-hidden');
        } else {
            newPasswordIcnPos.addClass('is-hidden');
            newPasswordIcnNeg.removeClass('is-hidden');
        }
    });

    // On click of the login check the email entered to switch flows
    logInButton.on('click', function() {
        emailEntered = emailAddress.val();

        // Show loading icon on the button and hide other icon
        loadingIcon.removeClass('is-hidden');
        loadingIconSibling.addClass('is-hidden');

        hideMessageContainer();
        bodyElement.removeClass();

        // Wait 1 second to move to next Flow
        setTimeout(function() {

            // User enters any email with "ed" then move to flow 1 of updating password
            if (emailEntered.indexOf('ed') > -1) {
                logInSection.addClass('is-hidden');
                updateSection.removeClass('is-hidden');
                bodyElement.addClass('js-flow1');

            // User enters any email with "mike" then move to flow 2 of updating password and merging accounts
            } else if (emailEntered.indexOf('mike') > -1) {
                if(bodyElement.hasClass('js-accountsMerged')) {
                    modalOverlay.removeClass('is-opened');
                    greetingText.text('Hello, Mike');
                    openModal.text('Log Out');
                    bodyElement.addClass('js-loggedIn');
                } else {
                    logInSection.addClass('is-hidden');
                    updateSection.removeClass('is-hidden');
                    mergeEmail.val(emailEntered);
                    bodyElement.addClass('js-flow2');
                }

            // User enter email that has been saved to the email Array after a user is created
            } else if(findEmail()) {
                modalOverlay.removeClass('is-opened');
                greetingText.text('Hello, James');
                openModal.text('Log Out');
                bodyElement.addClass('js-loggedIn');
            }
            // User enters any email that is not "ed or mike" then show account does not exist
            else {
                bodyElement.addClass('js-flow3');
                messageContainer.removeClass('is-hidden').addClass('message--negative');
                messageText.text('This account does not exist. Check email address or create new account');
            }

            // Hide the loading spinner and show the original button icon
            loadingIcon.addClass('is-hidden');
            loadingIconSibling.removeClass('is-hidden');

        }, 1000)
    });

    // Flow for when user clicks the update password
    updateButton.on('click', function() {
        var upbutton = $(this);

        // Show loading icon on the button and hide other icon
        loadingIcon.removeClass('is-hidden');
        loadingIconSibling.addClass('is-hidden');

        setTimeout(function() {

            // If the passwords match and is greater than 8 characters proceed to perspective flow
            if(newPassword.val() === confirmPass.val() && newPassword.val().length >= 8) {

                // If the body has the first flow then show success message and log user in
                if(bodyElement.hasClass('js-flow1')) {
                    updateForm.addClass('is-hidden');
                    upbutton.addClass('is-hidden');
                    $('.modal__empty').removeClass('is-hidden');

                    setTimeout(function() {
                        modalOverlay.removeClass('is-opened');
                        greetingText.text('Hello, Edward');
                        openModal.text('Log Out');
                        bodyElement.addClass('js-loggedIn js-accountUpdated');
                    }, 1000)

                // Proceed to the merge account flow
                } else {
                    updateSection.addClass('is-hidden');
                    mergeSection.removeClass('is-hidden');
                }

            } else {
                alert("You don't match");
            }

            // Show loading icon on the button and hide other icon
            loadingIcon.addClass('is-hidden');
            loadingIconSibling.removeClass('is-hidden');

        }, 1000)
    });

    mergeButton.on('click', function() {

        // Show loading icon on the button and hide other icon
        loadingIcon.removeClass('is-hidden');
        loadingIconSibling.addClass('is-hidden');

        setTimeout(function() {
            mergeSection.addClass('is-hidden');
            logInSection.removeClass('is-hidden');
            bodyElement.addClass('js-accountsMerged');
            messageContainer.removeClass('is-hidden').addClass('message--positive');
            messageText.text('Accounts merged Successfully! Log in');

            // Show loading icon on the button and hide other icon
            loadingIcon.addClass('is-hidden');
            loadingIconSibling.removeClass('is-hidden');

        }, 1000);
    });

    registerButton.on('click', function() {
        var registerEmail = regEmail.val();
        var registrationName = $('.js-regName').val();

        // Show loading icon on the button and hide other icon
        loadingIcon.removeClass('is-hidden');
        loadingIconSibling.addClass('is-hidden');

        setTimeout(function() {

            if (registerEmail.indexOf('mike') > -1) {
                messageContainer.removeClass('is-hidden').addClass('message--negative');
                messageText.html("An account with this email already exists. If this is your account, " + "<a class='js-signIn' href='#'>click here</a>" + " to log in.");
            } else {
                modalOverlay.removeClass('is-opened');
                greetingText.text('Hello, ' + registrationName + '');
                openModal.text('Log Out');
                bodyElement.addClass('js-loggedIn');
                emailArray.push(registerEmail);
            }

            // Show loading icon on the button and hide other icon
            loadingIcon.addClass('is-hidden');
            loadingIconSibling.removeClass('is-hidden');

        }, 1000);
    });

    // When the user clicks on the sign up now link show the reg fields
    signUp.on('click', function() {
        regSection.removeClass('is-hidden');
        logInSection.addClass('is-hidden');
        hideMessageContainer();
    });

    // When the user clicks on the sign in link show the log in modal
    $('body').on('click', '.js-signIn', function() {
        regSection.addClass('is-hidden');
        logInSection.removeClass('is-hidden');
        hideMessageContainer();
    });

});
