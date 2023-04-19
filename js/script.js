let list = [];
let idx = -1;
const auto_wrap = document.querySelector(".autocomplete>ul");
const result_wrap = document.querySelector(".result");
const search_btn = document.querySelector(".search_btn");
const listarr = stationList.data
const input = document.querySelector(".search_input")
search_btn.addEventListener("click",() =>{
	const value = input.value
	actionEnter(value)
})
input.addEventListener( "input",(s) =>{
	idx = -1;
	auto_wrap.innerHTML =""
	const newlist=listarr.filter( v=> v.station_nm.includes(s.target.value.trim()))
	newlist.forEach((e) =>{
		let includes_nm = e.station_nm
		const li = document.createElement("li");
		li.className="resultlist"
		auto_wrap.append(li)
		const newin = includes_nm.replace(s.target.value.trim(),`<span class="active-text">${s.target.value}</span>`)
			li.innerHTML=`
			<span>${newin}</span>
		`
	})
})
input.addEventListener("keyup",(e)=>{
	if(e.target.value.trim() ==""){
		auto_wrap.innerHTML=""
		return
	}else if(e.keyCode ==13){
		actionEnter(e.target.value.trim())
		return
	}else if(e.keyCode ==38){
		actionUp(e.target.value.trim())
		return
	}else if(e.keyCode==40){
		actionDown(e.target.value.trim())
		return
	}
})
function actionEnter(e){
	result_wrap.innerHTML=""
	let inout
	let first_time
	let last_time
	auto_wrap.innerHTML =""
	const newlist=listarr.filter( v=> v.station_nm == e)
	newlist.forEach(e =>{
		const div =document.createElement("div")
		const p =document.createElement("p")
		const ul =document.createElement("ul")
		const li =document.createElement("ul")
		console.log(result_wrap)
		result_wrap.append(div)
		div.append(p,ul,li)
		if(e.line_num =="a" || e.line_num =="k"){
			p.innerText=`${e.station_nm} 공항철도`
		}else if(e.line_num =="b"){
			p.innerText=`${e.station_nm} 분당선`
		}else if(e.line_num =="g"){
			p.innerText=`${e.station_nm} 경춘선`
		}else if(e.line_num =="s"){
			p.innerText=`${e.station_nm} 신분당선`
		}else if(e.line_num =="su"){
			p.innerText=`${e.station_nm} 수인선`
		}else if(e.line_num =="i"){
			p.innerText=`${e.station_nm} 인천 1호선`
		}else if(e.line_num =="e"){
			p.innerText=`${e.station_nm} 용인경전철`
		}else if(e.line_num =="u"){
			p.innerText=`${e.station_nm} 의정부경전철`
		}else{
		p.innerText=`${e.station_nm} ${e.line_num}호선`
		}
		const timearr = timeList.data
		const timearrlist =timearr.filter(s => s.station_cd == e.station_cd && s.fr_code == e.fr_code)
		console.log(timearrlist)
		timearrlist.forEach(a =>{
			console.log(a.inout_tag)
			if(a.inout_tag ==1){
			
				inout= "상행선"
			}else{
				inout= "하행선"
			}
			first_time = a.first_time
			last_time = a.last_time
		})
		console.log(first_time)
		ul.innerText =inout
		li.innerText= `첫차-${first_time} ~ 막차-${last_time}`
	})
}
function actionUp(e){
	const li = [...document.querySelectorAll(".resultlist")];
	idx -= 1;
	if(idx < 0){
		idx = li.length-1;
	}
	console.log(idx,li[idx])
	li.forEach(e =>{
	e.classList.remove("activelist")
	})
	li[idx].classList.add("activelist")
	input.value = li[idx].innerText
}
function actionDown(e){
	const li = [...document.querySelectorAll(".resultlist")];
	idx += 1;
	if(idx >= li.length){
		idx = 0;
	}
	console.log(idx,li[idx])
	li.forEach(e =>{
	e.classList.remove("activelist")
	})
	li[idx].classList.add("activelist")
	input.value = li[idx].innerText
}