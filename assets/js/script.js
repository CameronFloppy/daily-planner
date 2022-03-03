let task = $(".time-block");

function auditTime(taskEl) {
    let scheduleTime = $(taskEl).id
    let time = moment().hour();
    
    $(taskEl).removeClass("past present future");

    if (time < scheduleTime){
        $(taskEl).addClass("future")
    }
    else if(time == scheduleTime) {
        $(taskEl).addClass("present")
    } else if (time > scheduleTime) {
        $(taskEl).addClass("past")
    
    }
}

auditTime(task);