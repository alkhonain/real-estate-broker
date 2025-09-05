window.onload = () => {
	if(location.hash == "#gamesCount" || new URL(location.href).searchParams.get("purchase_success")) $("#gamesCountModal").modal("show");
	if(new URL(location.href).searchParams.get("errorCode")) $("#paymentErrorModal").modal("show");
};

let url = new URL(location.origin);
if(!url.pathname.endsWith("/")) url.pathname += "/";
url.pathname += "checkout";

function checkout(plan){
	$("#plansModal").modal("hide");
	if(plan) url.searchParams.set("plan", plan);
	if(!url.searchParams.get("payment")) return $("#paymentModal").modal("show");
	if(!url.searchParams.get("plan")) return Toast.fire({
		icon: "error",
		title: "يجب عليك اختيار الباقة"
	});
	location.href = url.href;
}

function savePaymentType(){
	let type = Array.from(document.getElementsByName("paymentRadio")).find(r => r.checked);
	if(!type?.id) return Toast.fire({
		icon: "error",
		title: "يجب عليك تحديد طريقة الدفع للمتابعة"
	});
	url.searchParams.set("payment", type.id);
	checkout();
}

function saveCouponCode(elm){
	elm.value = elm.value.replace(/[^a-zA-Z0-9\s\u0621-\u064A&+,]/g, '');
	if(elm.value){
		url.searchParams.set("coupon", elm.value);
	}else{
		url.searchParams.delete("coupon");
	}
}

if(iOS()) applepay_div.hidden = false;