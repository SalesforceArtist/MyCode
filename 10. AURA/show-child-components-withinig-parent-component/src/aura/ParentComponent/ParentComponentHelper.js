({
	displayDivOne_helper: function (c, e, h) {
		try {
			c.set("v.openDetails", true);
			$A.createComponent('c:SectionOneCmp', {

			}, function (contentComponent, status, error) {
				if (status === "SUCCESS") {
					c.set("v.body", contentComponent);
				} else {
					throw new Error(error);
				}
			})
		} catch (e) {
			console.log('EError-->' + e);
		}
	},

	displayDivTwo_helper: function (c, e, h) {
		try {
			c.set("v.openDetails", true);
			$A.createComponent('c:SectionTwoCmp', {

			}, function (contentComponent, status, error) {
				if (status === "SUCCESS") {
					c.set("v.body", contentComponent);
				} else {
					throw new Error(error);
				}
			})
		} catch (e) {
			console.log('EError-->' + e);
		}
	}
})