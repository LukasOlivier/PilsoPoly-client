"use strict";

const _config = {
    prefix: 'PilosPoly',
    groupnumber: '00',
    errorHandlerSelector: '.errormessages p',
    getAPIUrl: function() { return `https://project-i.ti.howest.be/monopoly-${this.groupnumber}/api`;}
}
