let sign_up = document.querySelector(".sign-up");
let sign_up_form = document.querySelector(".sign-up form");
let name = document.querySelector(".sign-up input");
let reg = document.querySelector(".reg");
let reg_back = document.querySelector(".reg .back");
let reg_continue = document.querySelector(".reg .continue");
let quiz = document.querySelector(".quiz");
let quiz_back = document.querySelector(".quiz .back");
let quiz_next = document.querySelector(".quiz button.next_btn");
let time = document.querySelector(".quiz span.timmer");
let mid_text = document.querySelector(".question");
let results = document.querySelector(".result");
let results_retake = document.querySelector(".result .re-take");
let results_home = document.querySelector(".result .home");
let submit = document.querySelector(".submit");
let reest = document.querySelector(".reset");
let reg_img = document.querySelector(".result img");
let reg_p = document.querySelector(".result p");
let mid = document.querySelector(".question");

// Send Ajax Request
let ajax = new XMLHttpRequest();
ajax.onload = function() {
    localStorage.setItem("question", this.response);
};
ajax.open("GET", "../../question.json");
ajax.send();

// Display any Element
showel = (el) => {
    el.style.display = "block";
};

// Hisde Any Elements

hideel = (el) => {
    el.style.display = "none";
};

// Sign Up From

// reset.onclick = (e) => {
//     e.preventDefault();
//     // sign_up_form[0].reset();
//     localStorage.removeItem("name");
// };

sign_up_form.onsubmit = (e) => {
    e.preventDefault();
    let val = name.value;
    if (val == "") {
        alert("Field is required");
    } else {
        localStorage.setItem("name", JSON.stringify(val));
        hideel(sign_up);
        showel(reg);
    }
};

// Timer function
let ss;
let timer = (i) => {
    let mid_text_li = document.querySelectorAll(".ques-list li");
    ss = setInterval(() => {
        time.innerHTML = i;
        if (i == 0) {
            clearInterval(ss);
            quiz_next.removeAttribute("disabled");
            mid.classList.add("done");
            // for (let info = 0; info < mid_text_li.length; info++) {
            //     console.log(mid_text_li[info]);
            // }
        }
        i--;
    }, 1000);
};

// Registration bact btn click function

reg_back.onclick = (e) => {
    e.preventDefault();
    hideel(reg);
    showel(sign_up);
};

// Registration continue btn click function

reg_continue.onclick = (e) => {
    e.preventDefault();
    hideel(reg);
    showel(quiz);
    timer(10);
    loadquestion(0);
};

// Quiz show

let getquiz = () => {
    return localStorage.getItem("question");
};

let quizs = JSON.parse(getquiz());

let result = 0;

function loadquestion(i) {
    mid_text.innerHTML = `<h2 class="fw-bolder">1.${quizs[i].question}?</h2>
    <br />

    <ul class="ques-list">
    <li><span>A</span> ${quizs[i].answers[0]}</li>
    <li><span>B</span> ${quizs[i].answers[1]}</li>
    <li><span>C</span> ${quizs[i].answers[2]}</li>
    <li><span>D</span> ${quizs[i].answers[3]}</li>
    </ul>
    
    `;

    let mid_text_li = document.querySelectorAll(".ques-list li");

    for (let info = 0; info < mid_text_li.length; info++) {
        mid_text_li[info].setAttribute("onclick", "findans(this , " + i + " )");
    }
}

function findans(prop, index) {
    clearInterval(ss);
    quiz_next.removeAttribute("disabled");
    let mid_text_li = document.querySelectorAll(".ques-list li");

    for (let info = 0; info < mid_text_li.length; info++) {
        mid_text_li[info].classList.add("done");
    }
    let user_anser = prop.innerHTML;

    let user_answer = user_anser.substr(15);

    let correct_answers = quizs[index].correct_answer;

    if (user_answer != correct_answers) {
        let audio = new Audio("../../audio/fail-buzzer-01.mp3");
        audio.play();
        prop.classList.add("danger");

        let mid_text_li = document.querySelectorAll(".ques-list li");

        for (let info = 0; info < mid_text_li.length; info++) {
            let single_li = mid_text_li[info].textContent;

            let sinle_li_sub = single_li.substr(2);

            if (sinle_li_sub == correct_answers) {
                mid_text_li[info].classList.add("success");
            }
        }
    } else {
        let audio = new Audio("../../audio/Success-sound-effect.mp3");
        audio.play();
        prop.classList.add("success");
        result++;
    }
}

let question_index = 0;

quiz_next.onclick = (e) => {
    e.stopPropagation();
    if (question_index < quizs.length - 1) {
        question_index++;
        loadquestion(question_index);
        clearInterval(ss);
        time.innerHTML = 10;
        timer(10);
        quiz_next.setAttribute("disabled", "disabled");
    } else {
        quiz_next.style.display = "none";
        submit.style.display = "inline-block";
    }
};

submit.onclick = (e) => {
    e.preventDefault();
    hideel(quiz);
    showel(results);
    let name_user = JSON.parse(localStorage.getItem("name"));
    if (result > 3) {
        reg_img.setAttribute("src", "assests/media/congratulations-congrats.gif");
        reg_p.innerHTML = `${name_user} you got ${result} out of 5`;
        let audio = new Audio(
            "../../audio/456966__funwithsound__success-fanfare-trumpets.mp3"
        );
        audio.play();
    } else {
        let audio = new Audio("../../audio/fail-trombone-01.mp3");
        audio.play();
        reg_img.setAttribute("src", " assests/media/giphy.gif");
        reg_p.innerHTML = `${name_user} you got ${result} out of 5`;
    }
};

// SRe-take From

results_retake.onclick = (e) => {
    e.preventDefault();
    hideel(results);
    showel(quiz);
    timer(10);
    loadquestion(0);
    result = 0;
    question_index = 0;
    submit.style.display = "none";
    quiz_next.style.display = "inline-block";
};

results_home.onclick = (e) => {
    e.preventDefault();
    hideel(results);
    showel(sign_up);
    localStorage.removeItem("name");
    result = 0;
    question_index = 0;
    submit.style.display = "none";
    quiz_next.style.display = "inline-block";
};