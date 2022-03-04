let tasks = {}

function getDate() {
    let wholeDate = moment().format("dddd, MMMM Do")
    $("#currentDay").text(wholeDate);
}
function loadSchedule() {
    tasks = JSON.parse(localStorage.getItem("tasks"))

    if (!tasks) {
        tasks = {
        }
        $(".time-block").each(function () {
            tasks[$(this).attr("id")] = "";
        })
        console.log(tasks);
    }
    $("textarea").each(function () {
        console.log(this);
        let currentTask = $(this)
            .closest(".time-block")
            .attr("id");
        console.log(currentTask)
        let taskP = $("<textarea>")
            .addClass("w-100 h-100")
            .text(tasks[currentTask]);

        $(this).replaceWith(taskP);
    })
    $(".row").each(function () {
        auditTime(this)
    })
}
function auditTime(taskEl) {
    let scheduleTime = $(taskEl).attr("id");
    let time = moment().hour();
    // console.log(scheduleTime);
    // console.log(time);
    $(taskEl).children($(".description")).removeClass("past present future");

    if (time < scheduleTime) {
        $(taskEl).children(".description").addClass("future")
    }
    else if (time == scheduleTime) {
        $(taskEl).children(".description").addClass("present")
    } else if (time > scheduleTime) {
        $(taskEl).children(".description").addClass("past")

    }
}

setInterval(function () {
    $(".row").each(function () {
        auditTime(this)
    })
}, 50000);

$(".description").on("blur", "textarea", function () {
    let textEl = $(this)
        .val()
        .trim();
    console.log(textEl);
    let index = $(this)
        .closest(".time-block")
        .attr("id")

    console.log(index);
    $(".row").each(function () {
        auditTime(this)
    })
    tasks[index] = textEl

    let taskP = $("<textarea>")
        .addClass("w-100 h-100")
        .text(textEl);

    $(this).replaceWith(taskP);
})

$(".saveBtn").on("click", function () {
    console.log(tasks);
    saveTasks();
})
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
loadSchedule();
getDate();