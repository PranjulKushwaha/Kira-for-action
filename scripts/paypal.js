let donateButton = document.getElementById("donateButton");
let inputAmount = document.getElementById("inputAmount");
let subscriptionButton = document.getElementById("subscriptionButton");
let payPalContainer = document.getElementById("payPalContainer");
let Payment_text_container = document.getElementById("Payment_text_container");
let planButtons = document.querySelectorAll(".planButtons");
let amoutnBtn = document.querySelectorAll(".amoutnBtn");
let choosedPlanId;
let choosedPlanValue;




// setting one time donation amount from buttons and thereafter disabling them

function setAmount(amount) {

	inputAmount.value = amount;

	donateButton.classList.remove("disabled");

	amoutnBtn.forEach((btn) => {
		btn.classList.add("disabled");
	});
}




// enabling or disabling button as per input value
function handleButton(value) {

	if (value > 1) {
		donateButton.classList.remove("disabled");
	} else {
		donateButton.classList.add("disabled");
	}
}



// calling initPayButton() for one time donation
function donate() {

	inputAmount.disabled = true;

	donateButton.classList.add("disabled");

	payPalContainer.classList.remove("d-none");
	payPalContainer.scrollIntoView(false);

	Payment_text_container.innerHTML = `One time donation of   <span class="fw-bold text-underline text-success text-decoration-underline">  ${inputAmount.value} \$ </span> to KIRA FOR ACTION`;

	initPayPalButton();
}





// getting plan id and value from the Button (monthly plan  choosed by user )

function setPlan(id, value, btnObj) {

	choosedPlanId = id;
	choosedPlanValue = value;

	btnObj.classList.remove("btn-dark");
	btnObj.classList.add("btn-warning");


	subscriptionButton.classList.remove("disabled"); // enabling subsription button
	planButtons.forEach((btn) => {
		btn.classList.add("disabled");
	});
}




// creating subscription by calling initSubscriptionMethod()

function createSubscription() {

	payPalContainer.classList.remove("d-none");
	payPalContainer.scrollIntoView(false);

	Payment_text_container.innerHTML = `Monthly donation of   <span class="fw-bold text-underline text-success text-decoration-underline"> \$ ${choosedPlanValue}  </span> to KIRA FOR ACTION`;

	initSubscriptionButton(choosedPlanId);

	subscriptionButton.classList.add("disabled");

}





// rendering one time payment button

function initPayPalButton() {
	document.getElementById("paypal-button-container").innerHTML = "";
	paypal
		.Buttons({
			style: {
				shape: "rect",
				color: "blue",
				layout: "vertical",
				label: "pay",
			},

			createOrder: function (data, actions) {
				return actions.order.create({
					purchase_units: [
						{
							amount: {
								currency_code: "USD",
								value: document.getElementById("inputAmount").value,
							},
						},
					],
				});
			},

			onApprove: function (data, actions) {

				const captureOrderHandler = (details) => {
					console.log(details)
					payPalContainer.innerHTML =
						` <div class="container"> <img src="./images/done.png" class="mx-auto" alt="Payment completed image" height="50"><h5 class="text-secondary mt-2">Payment Successful</h5><p class="text-secondary text-center ">Thank you for Your Payment , For more details check your email.</p><div class="container py-3 "> <div class="row gap-2 "> <div class="col"> <h6 class="fw-semibold">Name</h6> <p class="text-secondary"> ${details.payer.name.given_name} ${details.payer.name.surname}</p> </div> <div class="col"> <h6 class="fw-semibold ">Amount</h6> <p class="text-secondary"> ${details.purchase_units[ 0 ].amount.value} ${details.purchase_units[ 0 ].amount.currency_code}</p> </div> <div class="col-12"> <h6 class="fw-semibold ">Email</h6> <p class="text-secondary"> ${details.payer.email_address}</p> </div> </div> </div> </div>`;
				};
				return actions.order.capture().then(captureOrderHandler);

			},

			onError: function (err) {
				console.log(err)
				payPalContainer.innerHTML =
					` <div class="container"> <img src="./images/error.png" class="mx-auto" alt="Payment completed image" height="50"> <h5 class="text-danger mt-2">Payment Failed</h5> <p class="text-danger text-center ">We are sorry for the Inconvenience Caused , Please refresh the page and retry. </p> </div>`;
			},
		})
		.render("#paypal-button-container");
}







// rendering monthly payment button
function initSubscriptionButton(id) {
	document.getElementById("paypal-button-container").innerHTML = "";
	paypal
		.Buttons({
			style: {
				shape: "rect",
				color: "gold",
				layout: "vertical",
				label: "paypal",
			},
			createSubscription: function (data, actions) {
				return actions.subscription.create({
					plan_id: id,
				});
			},
			onApprove: function (data, actions) {
				console.log(data);

				payPalContainer.innerHTML =
					` <div class="container"> <img src="./images/done.png" class="mx-auto" alt="Payment completed image" height="50"><h5 class="text-secondary mt-2">Payment Successful</h5><p class="text-secondary text-center ">Thank you for Your Payment , For more details check your email.</p><div class="container py-3 "> <div class="row gap-2 "> <div class="col"> <h6 class="fw-semibold">Order Id</h6> <p class="text-secondary"> ${data.orderID}</p> </div> <div class="col"> <h6 class="fw-semibold ">Subscription ID</h6> <p class="text-secondary"> ${data.subscriptionID}</p> </div> </div> </div> </div>`


			},
			onError: function (err) {

				console.log(err);

				payPalContainer.innerHTML =
					` <div class="container"> <img src="./images/error.png" class="mx-auto" alt="Payment completed image" height="50"> <h5 class="text-danger mt-2">Payment Failed</h5> <p class="text-danger text-center ">We are sorry for the Inconvenience Caused , Please refresh the page and retry. </p> </div>`;
			},
		})
		.render("#paypal-button-container"); // Renders the PayPal button
}




