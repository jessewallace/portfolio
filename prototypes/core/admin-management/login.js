$(document).ready(function(){var e=$("#loginId");$passwordField=$("#pwd"),$loginButton=$("#LoginBtn"),$errorMessage=$("#errorMessage"),$loginButton.click(function(){""==e.val()||""==$passwordField.val()?$errorMessage.show().text("Username and Password are required"):window.location="./index.html"})});