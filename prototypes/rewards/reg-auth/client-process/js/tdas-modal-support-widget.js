/**
 * MODAL OVERLAY MEMBER SUPPORT WIDGET
 * Created by scott.cody on 2/6/2015
 */

_tdasModals.supportWidget = {

    data : {},

    products : [
        ['la-widget','Listening Appointments'],
        ['gc-widget','Game Center'],
        ['reg-widget','Registration'],
        ['v1p-widget','Streaming Player'],
        ['other','Other']
    ],

    issues : [
        ['Can\'t get points','Answer incorrect'], // Listening Appointments
        ['Games not loading','Not getting points','Timing out'], //Games Center
        ['Username/password won\'t work','Facebook or Google issues'], // Reg Widget
        ['Audio not playing','Poor audio quality','No or incorrect history'] // V1 Embed Player
    ],

    maxCharacters : 100,

    /**
     * init: function to initialize the widget
     */
    init: function() {
        var self = this;

        // Limit comment string
        $('#tdas-member-support-comments').attr("maxlength",self.maxCharacters).on('keyup', function(){
            self.countCharacters();
        });
        $('#tdas-member-support-characters > span').html('0 / ' + self.maxCharacters + ' Characters');

        // Hook help link
        $('#tdas-member-support').click(function(e){
            self.openWidget($(this).attr('data-context'));
        });

        // Hook Product Select
        $('#tdas-member-support-product > select').change(function(){
            self.loadIssues($(this).val());
        })

        // Hook submit
        $('#tdas-member-support-form').on('submit',function(e){
            e.preventDefault();
            self.submitForm();
        })
    },

    /**
     * openWidget: function to open widget and display information based upon the context
     *
     * @param context (from what widget is help being requested)
     */
    openWidget: function(context) {
        var self = this;

        // Hide other contents
        $('.registration-widget-overlay-login > *').hide();

        // Show support header and contents
        $('#tdas-member-support-header, .registration-widget-overlay-support-content').show();

        // Clean up styles
        $('.registration-widget-overlay-support-content').removeAttr('style');

        // Load Products
        $('#tdas-member-support-product > select').html(self.cycleProducts('select'));

        // Show Product select if no context is provided
        if(context == undefined || context == "") {
            $('#tdas-member-support-product').show();
            _tdasModals.supportWidget.loadIssues('la-widget');
            $('#headline-text').html('What do you need help with or would like to leave feedback about?');
        } else {
            $('#tdas-member-support-product').hide();
            _tdasModals.supportWidget.loadIssues(context);
            self.loadMenu(context);
        }

        //@todo if user is logged in, we can hide the email field (or fill it in, since it's required)

        _tdasModals.openModal();
    },

    /**
     * loadIssues: given a product, populate a list of available issues (probably from API call)
     *
     * @param product (the product that these issues belong to)
     */
    loadIssues: function(product) {
        var self = this,
            html = "";
        $('#tdas-member-support-issue').show();
        $('#tdas-member-support-issue > select').html('');

        //@todo load issues for product from server?

        // load issues based on product selected
        switch(product){
            case 'la-widget' : cycleIssues(0);
                break;

            case 'gc-widget' : cycleIssues(1);
                break;

            case 'reg-widget' : cycleIssues(2);
                break;

            case 'v1p-widget' : cycleIssues(3);
                break;

            default:
                $('#tdas-member-support-issue').hide();
                break;
        }

        function cycleIssues(cat) {
            for (i = 0; i < self.issues[cat].length; i++) {
                html += "<option>" + self.issues[cat][i] + "</option>"
            }
        }

        // load issues into select

        $('#tdas-member-support-issue > select').html(html);
    },

    /**
     * cycleProducts: cycles through array of products (probably from API call)
     * and returns them in specified format
     *
     * @param context (what type of element will be filled with the returned data)
     * @param product (which widget is selected, so it is omitted from the menu list)
     * @returns {string}
     */
    cycleProducts: function(context, product) {
        var self = this,
            html = "";

        // Reset menu height
        self.menuHeight = 0;

        // If loading into select, create option elements
        if(context == "select") { // if function is called to populate select box
            for (i = 0; i < self.products.length; i++) {
                html += "<option value='" + self.products[i][0] + "'>" + self.products[i][1] + "</option>"
            }

        // If loading into inline menu, create menu div elements
        } else if(context == "menu") { // if function is called to populate inline menu
            for (i = 0; i < self.products.length; i++) {
                if(self.products[i][0] != product) {
                    html += "<div data-value='" + self.products[i][0] + "'>" + self.products[i][1] + "</div>"
                }
            }
        }

        // Return the html
        return html;
    },

    /**
     * loadMenu: loads inline menu if help widget is called from a specific widget
     *
     * @param product (widget that called help widget)
     */
    loadMenu: function(product) {
        var self = this,
            html = "",
            productTitle;

        // Adjust the leading headline text
        $('#headline-text').html('Looks like you need help or want to leave feedback about the ');

        // Clear the control if it's already there
        $('.tdas-member-support-inline-selector').remove();

        // Show the control
        html += '<div class="tdas-member-support-inline-selector">';

        // Convert the product string to friendly name
        switch(product){
            case 'la-widget'    : productTitle = "Listen Appointments Widget"; break;
            case 'gc-widget'    : productTitle = "Games Center"; break;
            case 'reg-widget'   : productTitle = "Registration Widget"; break;
            case 'v1p-widget'   : productTitle = "Streaming Player"; break;
            default             : $('#headline-text').html('Looks like you need help or want to leave feedback about '); productTitle = "something else"; break;
        }

        // Set the data.issue variable
        self.data.issue = productTitle;

        // Create the inline selector
        html += '<span class="tdas-member-support-inline-selector-selected">' + productTitle + '<span class="tdas-member-support-inline-selector-toggle">change</span></span>';
        html += '<div class="tdas-member-support-inline-selector-menu">';
        html += self.cycleProducts('menu',product);
        html += '</div></div>';

        // Add it to the headline
        $('h3#tdas-member-support-headline').append(html);

        // Attach Events
        $('.tdas-member-support-inline-selector-selected, .tdas-member-support-inline-selector::after').click(function(){
            $('.tdas-member-support-inline-selector').toggleClass('selector-active');
        })

        $('.tdas-member-support-inline-selector-menu > div').click(function(){
            $('.tdas-member-support-inline-selector').toggleClass('selector-active');
            self.loadMenu($(this).attr('data-value'));
            self.loadIssues($(this).attr('data-value'));
        })
    },

    /**
     * countCharacters: counts characters in the comment field and displays to user.
     * Also warns when characters are low and when no more are available
     */
    countCharacters: function() {
        var self = this,
            lowChars = self.maxCharacters - (self.maxCharacters * 0.1);

        // Reset warning classes
        $('#tdas-member-support-characters').removeClass('charactersLow charactersOut');

        // Display remaining characters
        $('#tdas-member-support-characters > span').html($('#tdas-member-support-comments').val().length + ' / ' + self.maxCharacters + ' Characters');

        // If within 10% of limit, change wording to orange as warning
        if($('#tdas-member-support-comments').val().length >= lowChars && $('#tdas-member-support-comments').val().length < self.maxCharacters) {
            $('#tdas-member-support-characters').addClass('charactersLow')

            // if out of characters, show the explanation bubble
        } else if ($('#tdas-member-support-comments').val().length >= self.maxCharacters) {
            $('#tdas-member-support-characters').addClass('charactersOut');

            // Or reset to normal
        } else {
            $('#tdas-member-support-characters').removeClass('charactersLow charactersOut');
        }

    },

    /**
     * Captures the data, shows the confirmation message, and submits the form
     */
    submitForm: function() {
        var self = this;

        // Capture data
        self.data.userAgent = navigator.userAgent;
        self.data.URL = window.location.href;
        self.data.tenant = "TEST"
        self.data.issue += ' - ' + $('select[name="issue-cat"]').val();
        self.data.subject = $('input[name="subject"]').val();
        self.data.comments = $('textarea[name="comment"]').val();
        self.data.name = "person's name"; //@todo get from page
        self.data.memberID = "person's ID"; //@todo get from page
        self.data.email = $('input[name="email"]').val();

        // Set element height for animation
        $('.registration-widget-overlay-support-content').css('height',$('.registration-widget-overlay-support-content').height());

        // Disable the form while submitting
        $('#tdas-member-support-form label > *, #tdas-member-support-submit').attr('disabled','disabled');

        // Display confirmation message
        setTimeout(function(){$('.registration-widget-overlay-support-content').addClass('confirmation')},1500);
        $('#tdas-confirm-email').html(self.data.email);

        // Animate submit loading
        $('#tdas-member-support-submit > .fa-chevron-circle-right').hide();
        $('#tdas-member-support-submit > .fa-refresh').show();

        // Hook close buttons to reset
        $('#tdas-member-support-close, #close-registration-overlay').click(function(){
            _tdasModals.closeModal()
            setTimeout(self.resetModal,300);
            self.init();
        });

        //@todo API call to submit data
    },

    /**
     * resetModal: resets the modal and form to its original state
     */
    resetModal: function() {
        var self = this;

        // Reset confirmation page
        $('.registration-widget-overlay-support-content').removeClass("confirmation");

        // Reset form
        document.getElementById('tdas-member-support-form').reset();
        $('#tdas-member-support-form label > *, #tdas-member-support-submit').removeAttr('disabled');

        // Reset character count
        $('#tdas-member-support-characters').removeClass('charactersLow charactersOut');

        // Reset submit button
        $('#tdas-member-support-submit > .fa-chevron-circle-right').show();
        $('#tdas-member-support-submit > .fa-refresh').hide();
    }
}

$(function() {
    _tdasModals.supportWidget.init();
});