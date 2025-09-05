document.addEventListener("dragstart", (e) => e.preventDefault());
document.addEventListener("DOMContentLoaded", (event) => gsap.registerPlugin(Flip, ScrollTrigger));
window.addEventListener("load", () => {
	const loader = document.querySelector(".loader-wrapper");
	const content = document.querySelector(".content");
	
	if(loader) loader.style.display = "none";
	if(content) content.style.display = "block";
	
	loadSizing();
	
	Array.from(document.getElementsByClassName("dir-dynamic")).forEach(elm => {
		const arabicRegex = /[\u0600-\u06FF]/;
		elm.setAttribute("dir", arabicRegex.test(elm.innerText) ? "rtl" : "ltr");
	});
});
window.addEventListener("resize", loadSizing);
lazyload();

function phoneNav(){
	scrolltop();
	const navbar = document.querySelector('.navbar');
	const mobileNav = document.getElementById("mobileNav");
	if(mobileNav.classList.contains("show")){
		navbar.classList.add("border-bottom", "border-4","border-black");
	}else{
		navbar.classList.remove("border-bottom", "border-4","border-black");
	}
	setTimeout(() => {
		if(mobileNav.classList.contains("show")){
			navbar.classList.remove("border-bottom", "border-4","border-black");
		}else{
			try{
				if(checkNavbarBorder) return checkNavbarBorder();
			}catch(e){}
			navbar.classList.add("border-bottom", "border-4","border-black");
		}
	}, 400);
}

function loadSizing(){
	const navbar = document.querySelector('.navbar');
	const navbarHeight = navbar ? navbar.offsetHeight : 0;
	if(document.querySelector('.footer')){
		document.documentElement.style.setProperty('--navbar-height', `${navbarHeight + 150}px`);
		document.documentElement.style.setProperty('--navbar-height-container', `${navbarHeight + 210}px`);
	}else{
		document.documentElement.style.setProperty('--navbar-height', `${navbarHeight + 100}px`);
		document.documentElement.style.setProperty('--navbar-height-container', `${navbarHeight + 160}px`);
	}
}

function categoryDescription(name, description){
	confirmation({
		type: "blurple",
		icon: "fal fa-info text-blurple",
		title: name,
		content: description,
		hideCloseBtn: true
	});
}

function goBack(){
	history.back();
}

function fileSelector(files, elm){
	if(!files.length) return elm.innerHTML = '<i class="fal fa-upload"></i> رفع الصورة';
	return elm.innerText = 'تم تحديد الصورة:  ' + files[0].name;
}

function sendWhatsAppMessage(errorMessage){
	if(!contactmessage.value) return Toast.fire({
		icon: "error",
		title: errorMessage,
		position: "bottom-right"
	});
	window.open(`/whatsapp?message=${encodeURIComponent(contactmessage.value)}`, "_blank");
}

function popupwindow(url, title, w, h) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

function copy(arg, text){
	var copyinput = document.getElementById("copyinput");
	copyinput.value = arg;
	copyinput.removeAttribute("hidden");
	copyinput.select();
	copyinput.setSelectionRange(0, 999999999);
	document.execCommand('copy');
	copyinput.setAttribute("hidden", "");
	if(screen.width < 1000) return alert(text || "تم النسخ");
	Toast.fire({
		icon: "success",
		title: "تم النسخ"
	});
}

function downloadFile(text, fileName) {
	var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
	var link = document.createElement("a");
	link.href = window.URL.createObjectURL(blob);
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function scrolltop() {
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
}

function checkScrollBtn(){
	let scrollbtn = document.getElementById("scrollbtn");
	if(!scrollbtn) return;
	if (document.documentElement.scrollTop > 20 || document.body.scrollTop > 20) return scrollbtn.style.display = "block";
	scrollbtn.style.display = "none";
}

function checkLogoPosition(){
	let pclogo = document.getElementById("pclogo");
	if(!pclogo) return;
	pclogo.style.transition = "1s";
	if(document.documentElement.scrollTop > 600 || document.body.scrollTop > 600){
		pclogo.style.marginBottom = "-50%";
		return pclogo.style.width = "220px";
	}
	pclogo.style.marginBottom = "0%";
	pclogo.style.width = "180px";
}

window.onscroll = () => {
	checkScrollBtn();
	checkLogoPosition();
}

function iOS() {
	return ["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}