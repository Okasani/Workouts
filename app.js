const STORAGE_KEY = "workout_tracker_v1";

const els = {
    userName: document.getElementById("userName"),
    saveNameBtn: document.getElementById("saveNameBtn"),
    helloName: document.getElementById("helloName"),
    workoutInput: document.getElementById("workoutInput"),
    addBtn: document.getElementById("addBtn"),
    list: document.getElementById("list"),
    empty: document.getElementById("empty"),
    clearBtn: document.getElementById("clearBtn"),
};

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { name: "", workouts: [] };
        const parsed = JSON.parse(raw);
        return {
            name: typeof parsed.name === "string" ? parsed.name : "",
            workouts: Array.isArray(parsed.workouts) ? parsed.workouts : [],
        };
    } catch {
        return { name: "", workouts: [] };
    }
}

function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();

function uid() {
    return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function setHello() {
    els.helloName.textContent = state.name?.trim() ? state.name.trim() : "friend";
    els.userName.value = state.name || "";
}

function render() {
    els.list.innerHTML = "";
    els.empty.style.display = state.workouts.length ? "none" : "block";

    for (const w of state.workouts) {
        const li = document.createElement("li");
        li.className = "item" + (w.done ? " done" : "");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "check";
        checkbox.checked = !!w.done;
        checkbox.addEventListener("change", () => {
            w.done = checkbox.checked;
            saveState(state);
            render();
        });

        const textWrap = document.createElement("div");
        textWrap.className = "itemText";

        const nameSpan = document.createElement("span");
        nameSpan.className = "name";
        nameSpan.textContent = w.text;

        const editInput = document.createElement("input");
        editInput.className = "input";
        editInput.style.display = "none";
        editInput.value = w.text;

        textWrap.appendChild(nameSpan);
        textWrap.appendChild(editInput);

        const actions = document.createElement("div");
        actions.className = "actions";

        const editBtn = document.createElement("button");
        editBtn.className = "btn small";
        editBtn.textContent = "Edit";

        const saveBtn = document.createElement("button");
        saveBtn.className = "btn small primary";
        saveBtn.textContent = "Save";
        saveBtn.style.display = "none";

        const delBtn = document.createElement("button");
        delBtn.className = "btn small danger";
        delBtn.textContent = "Delete";

        editBtn.addEventListener("click", () => {
            nameSpan.style.display = "none";
            editInput.style.display = "block";
            editInput.focus();

            editBtn.style.display = "none";
            saveBtn.style.display = "inline-block";
        });

        function commitEdit() {
            const next = editInput.value.trim();
            if (!next) return;
            w.text = next;
            saveState(state);
            render();
        }

        saveBtn.addEventListener("click", commitEdit);
        editInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") commitEdit();
            if (e.key === "Escape") render();
        });

        delBtn.addEventListener("click", () => {
            state.workouts = state.workouts.filter(x => x.id !== w.id);
            saveState(state);
            render();
        });

        actions.appendChild(editBtn);
        actions.appendChild(saveBtn);
        actions.appendChild(delBtn);

        li.appendChild(checkbox);
        li.appendChild(textWrap);
        li.appendChild(actions);

        els.list.appendChild(li);
    }
}

function addWorkout() {
    const text = els.workoutInput.value.trim();
    if (!text) return;
    state.workouts.unshift({ id: uid(), text, done: false });
    els.workoutInput.value = "";
    saveState(state);
    render();
}

els.addBtn.addEventListener("click", addWorkout);
els.workoutInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addWorkout();
});

els.saveNameBtn.addEventListener("click", () => {
    state.name = els.userName.value.trim();
    saveState(state);
    setHello();
});

els.clearBtn.addEventListener("click", () => {
    if (!state.workouts.length) return;
    const ok = confirm("Clear ALL workouts?");
    if (!ok) return;
    state.workouts = [];
    saveState(state);
    render();
});

setHello();
render();
