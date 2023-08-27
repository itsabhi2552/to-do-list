var data = localStorage.getItem("data");
var task_arr = [];
var row_id = 1;
var edit_row_id;
var edit_flag = false;
var key = document.getElementById("input");

if(data) {
    task_arr = JSON.parse(data);
    for(var i = 0; i < task_arr.length; i++) {
        createTask(task_arr[i].task_data, task_arr[i].checked, false);
    }
}

function storeData() {
    var temp_arr = [];
    for(var i = 0; i < task_arr.length; i++) {
        if(task_arr[i]) {
            temp_arr.push(task_arr[i]);
        }
    }
    localStorage.setItem("data", JSON.stringify(temp_arr));
}

function checkSpace() {
    for(var i = 0; i < key.value.length; i++) {
        if(key.value[i] != " ") {
            return true;
        }
    }
    return false;
}

key.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (key.value !== "" && checkSpace()) {
            if (edit_flag) {
                edit_flag = false;
                var edit_row = document.getElementById("row-" + edit_row_id);
                edit_row.firstChild.innerText = key.value;
                task_arr[edit_row_id - 1].task_data = key.value;
                storeData();
            } else {
                createTask(key.value);
            }
            key.value = "";
        } else {
            key.value = "";
            alert("please enter a valid task!!!");
        }
    }
});

function check(id) {
    var row = document.getElementById("row-" + id);
    var col = row.lastChild.firstChild;
    if (col.firstChild.checked == true) {
        task_arr[id-1].checked = true;
        row.firstChild.style.textDecoration = "line-through";
    } else {
        task_arr[id-1].checked = false;
        row.firstChild.style.textDecoration = "none";
    }
    storeData();
}

function edit(id) {
    edit_flag = true;
    edit_row_id = id;
    var edit_row = document.getElementById("row-" + id);
    key.value = edit_row.firstChild.innerText;
}

function cross(id) {
    document.getElementById("row-" + id).remove();
    delete task_arr[id-1];
    storeData();
}

function createRow(cls = "row") {
    var row = document.createElement("div");
    row.setAttribute("class", cls);
    row.setAttribute("id", "row-" + row_id);
    row.style.borderBottom = "1px solid rgb(185, 185, 185)";
    row_id++;
    return row;
}

function createCol(cls = "col") {
    var col = document.createElement("div");
    col.setAttribute("class", cls);
    return col;
}

function createCheckbox() {
    var check_box = document.createElement("input");
    check_box.setAttribute("type", "checkbox");
    check_box.setAttribute("value", row_id - 1);
    check_box.setAttribute("onclick", "check(this.value)");
    return check_box;
}

function createPencil() {
    var pencil = document.createElement("li");
    pencil.setAttribute("value", row_id - 1);
    pencil.setAttribute("class", "fa fa-pencil");
    pencil.setAttribute("onclick", "edit(this.value)")
    return pencil;
}

function createCross() {
    var cross = document.createElement("li");
    cross.setAttribute("class", "fa fa-close");
    cross.setAttribute("value", row_id - 1);
    cross.setAttribute("onclick", "cross(this.value)");
    return cross;
}

function createIcon() {
    var icon = document.createElement("div");
    var check_box = createCheckbox("input");
    var pencil = createPencil();
    var cross = createCross();

    icon.setAttribute("class", "d-flex justify-content-around");

    icon.appendChild(check_box);
    icon.appendChild(pencil);
    icon.appendChild(cross);

    return icon;
}

function createTask(task, checked_flag = false, flag = true) {
    var task_container = document.getElementById("task-container");
    var new_task = document.createElement("div");
    var row = createRow();
    var col1 = createCol("col-9 p-3");
    var col2 = createCol("col-3 p-3");
    var icon = createIcon();

    new_task.style.overflowWrap = "break-word";
    new_task.innerText = task;

    col1.appendChild(new_task);
    col2.appendChild(icon);
    row.appendChild(col1);
    row.appendChild(col2);

    task_container.appendChild(row);

    if(flag) {
        task_arr.push({checked: false, task_data: task});
        storeData();
    } else {
        if(checked_flag) {
            icon.firstChild.checked = checked_flag;
            check(row_id-1);
        }
    }
}