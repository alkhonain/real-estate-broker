async function register(redirect){
	if(!phoneInput?.isValidNumber()) return Toast.fire({
		icon: "error",
		title: "رقم هاتف غير صالح"
	});
	let data = await fetch("/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: register_name.value,
			email: register_email.value,
			phone: phoneInput.getNumber(),
			phoneCountry: phoneInput.getSelectedCountryData(),
			password: register_password.value,
			cpassword: register_cpassword.value,
			birthday: register_birthday.valueAsNumber,
			reason: register_reason.value,
			acceptPolicies: register_acceptpolicies.checked
		})
	}).then(r => r.json());
	if(data.error) return Toast.fire({
		icon: "error",
		title: data.error
	});
	location.href = "/verify?redirect=" + encodeURIComponent(redirect);
}

async function login(redirect, twoFactorCode){
	let data = await fetch("/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			user: login_user.value,
			password: login_password.value,
			twoFactorCode
		})
	}).then(r => r.json());
	if(data.error) return Toast.fire({
		icon: "error",
		title: data.error
	});
	if(data.require2FA){
		const { value: code } = await Swal.fire({
			title: "الرجاء كتابة رمز المصادقة الثنائية",
			html: `<input id="swal-input1" placeholder="رمز المصادقة الثنائية" class="swal2-input rounded-global">`,
			focusConfirm: false,
			confirmButtonText: "تسجيل دخول",
			showClass: {
				backdrop: 'swal2-backdrop-show bg-blur',
			},
			customClass: {
				confirmButton: "btn btn-blurple btn-hover fs-5 px-5 rounded-pill"
			},
			preConfirm: () => {
				let code = document.getElementById("swal-input1").value;
				if(!code?.trim()) return Swal.showValidationMessage('<span class="fw-bold">يجب عليك كتابة رمز المصادقة الثنائية للمتابعة</span>');
				return code;
			}
		});
		if(!code) return Toast.fire({
			icon: "error",
			title: "تم إلغاء تسجيل الدخول"
		});
		return login(redirect, code);
	}
	if(window.flutter_inappwebview) await window.flutter_inappwebview.callHandler("setUser", {
		userId: data.userId
	});
	location.href = "/verify?redirect=" + encodeURIComponent(redirect);
}

async function forgetPassword(){
	let data = await fetch("/forget-password", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: forget_email.value
		})
	}).then(r => r.json());
	if(data.error) return Toast.fire({
		icon: "error",
		title: data.error
	});
	forget_email.value = "";
	Toast.fire({
		icon: "success",
		title: "لقد أرسلنا رابط إعادة تعيين كلمة المرور الخاصة بك عبر البريد الإلكتروني"
	});
}

async function resetPassword(token, redirect){
	let data = await fetch("/reset-password", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			token,
			password: reset_password.value,
			cpassword: reset_cpassword.value
		})
	}).then(r => r.json());
	if(data.error) return Toast.fire({
		icon: "error",
		title: data.error
	});
	Toast.fire({
		icon: "success",
		title: "تم تغيير كلمة المرور بنجاح"
	});
	location.href = redirect;
}