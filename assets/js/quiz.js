const continue_btn = document.querySelector("#start");
const quiz_box = document.querySelector("#quizWrap");
const result_box = document.querySelector("#resultModal");
const option_list = document.querySelector("#quizOpt");
const timeText = document.querySelector(".timer .title");
const timeCount = document.querySelector(".timer .sub-title");
const coinsScore = document.querySelector("#quizModal .coins");
let timeValue =  30;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let widthValue = 0;

const next_btn = document.querySelector(".quiz-buttons .next_btn");
const bottom_ques_counter = document.querySelector(".total_que");
continue_btn.onclick = ()=>{
    $('#myModal').modal('hide');
    showQuetions(0);
    queCounter(1); 
    startTimer(30); 
}
next_btn.onclick = ()=>{
    next_btn.classList.remove("hide");
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count);
        queCounter(que_numb);
        clearInterval(counter); 
        startTimer(timeValue);
        timeText.textContent = "Time Left: "; 
    }else{
        clearInterval(counter);
        showResult(); 
    }
    coinsScore.innerHTML = '<p class="score">'+userScore+'</p><img src="assets/img/coins.png" class="coin-img" height="20" alt="coin">';
}
function showQuetions(index){
    next_btn.classList.add("show");
    const que_text = document.querySelector(".quizQn");
    let que_tag = '<p>'+ questions[index].numb + ". " + questions[index].question +'</p>';
    let option_tag = '<button type="button" class="btn optionBtn" name="quiz" >'+ questions[index].options[0] +'</button>'
    + '<button type="button" class="btn optionBtn" name="quiz" >'+ questions[index].options[1] +'</button>'
    + '<button type="button" class="btn optionBtn" name="quiz" >'+ questions[index].options[2] +'</button>'
    + '<button type="button" class="btn optionBtn" name="quiz" >'+ questions[index].options[3] +'</button>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".optionBtn");
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
function optionSelected(answer){
    clearInterval(counter);
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length; 
    if(userAns == correcAns){
        userScore += 1000; 
        answer.classList.add("correct");
        console.log("Correct Answer");
    }else{
        console.log("Wrong Answer");
        answer.classList.add("incorrect");
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                console.log("Auto selected correct answer.");
                option_list.children[i].setAttribute("class", "option correct");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
}
function showResult(){
    $('#quizModal').modal('hide');
    $('#resultModal').modal('show');
    const message = result_box.querySelector(".message");
    const scoreText = result_box.querySelector(".scoreText");
    const correctAnswer = result_box.querySelector(".correctAnswer");
    const totalTime = result_box.querySelector(".totalTime");
    if (userScore > 0){ 
        message.innerHTML = 'Yay! You have completed the quiz!🎉';
        scoreText.innerHTML = 'Total Score: '+ userScore;
        correctAnswer.innerHTML = 'Correct Answer: ' + 'out of '+ questions.length;
        totalTime.innerHTML = 'Total time taken: ';
    }
    else{
        message.innerHTML = 'Sorry!!';
        scoreText.innerHTML = 'Total Score: '+ userScore;
        correctAnswer.innerHTML = 'Correct Answer: ' + 'out of '+ questions.length;
        totalTime.innerHTML = 'Total time taken: ';
    }
}
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = '00:00:'+ time; 
        time--;
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 
            const allOptions = option_list.children.length;
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "btn option correct"); 
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show"); 
        }
    }
}
function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}
var clicks = 3;
function flip(){
    clicks -= 1;
    document.getElementById('flip-sub-title').innerHTML = clicks + ' Attempts';
    if(clicks==0){
        document.getElementById('flip').disabled = true;
    }
}
