({
    logger: function (message, value, type) {
        console.log('>> ' + type + ' > ' + message + ' : ' + value);
        this.showToast(message, value, 'info');
    },

    showToast: function (title, message, type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type": type
        });
        toastEvent.fire();
    }
})