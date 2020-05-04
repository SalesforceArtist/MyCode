({
	loadPieChart: function (component, event, helper) {
		var action = component.get("c.getAllTasksByStatus");
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				let val = response.getReturnValue();
				var labelset = [];
				var dataset = [];
				val.forEach(function (key) {
					labelset.push(key.label);
					dataset.push(key.count);
				});
				new Chart(document.getElementById("pie-chart"), {
					type: 'pie',
					data: {
						labels: labelset,
						datasets: [{
							label: "Count of Task",
							backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
							data: dataset
						}]
					},
					options: {
						title: {
							display: true,
							text: 'Total Tasks by Status'
						}
					}
				});
			}
		});
		$A.enqueueAction(action);
	},
	loadBarChart: function (component, event, helper) {
		var action = component.get("c.getAllTasksByStatus");
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				let val = response.getReturnValue();
				var labelset = [];
				var dataset = [];
				val.forEach(function (key) {
					labelset.push(key.label);
					dataset.push(key.count);
				});
				new Chart(document.getElementById("pie-chart"), {
					type: 'bar',
					data: {
						labels: labelset,
						datasets: [{
							label: "Count of Task",
							backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
							data: dataset
						}]
					},
					options: {
						title: {
							display: true,
							text: 'Total Tasks by Status'
						}
					}
				});
			}
		});
		$A.enqueueAction(action);
	},
	loadPolarChart: function (component, event, helper) {
		var action = component.get("c.getAllTasksByStatus");
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				let val = response.getReturnValue();
				var labelset = [];
				var dataset = [];
				val.forEach(function (key) {
					labelset.push(key.label);
					dataset.push(key.count);
				});
				new Chart(document.getElementById("pie-chart"), {
					type: 'polarArea',
					data: {
						labels: labelset,
						datasets: [{
							label: "Count of Task",
							backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
							data: dataset
						}]
					},
					options: {
						title: {
							display: true,
							text: 'Total Tasks by Status'
						}
					}
				});
			}
		});
		$A.enqueueAction(action);
	},
	loadDoughnutChart: function (component, event, helper) {
		var action = component.get("c.getAllTasksByStatus");
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				let val = response.getReturnValue();
				var labelset = [];
				var dataset = [];
				val.forEach(function (key) {
					labelset.push(key.label);
					dataset.push(key.count);
				});
				new Chart(document.getElementById("pie-chart"), {
					type: 'doughnut',
					data: {
						labels: labelset,
						datasets: [{
							label: "Count of Task",
							backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
							data: dataset
						}]
					},
					options: {
						title: {
							display: true,
							text: 'Total Tasks by Status'
						}
					}
				});
			}
		});
		$A.enqueueAction(action);
	}
})