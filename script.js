// ── Nutrition persistence ────────────────────────────────────────────────────
const NUTRITION_KEY = 'jjk_nutrition';
const nutritionDefaults = { kcal: '~1,500', protein: '120-130g' };

function loadNutrition() {
    try {
        const saved = JSON.parse(localStorage.getItem(NUTRITION_KEY));
        return saved || { ...nutritionDefaults };
    } catch (e) {
        return { ...nutritionDefaults };
    }
}

function saveNutrition(data) {
    localStorage.setItem(NUTRITION_KEY, JSON.stringify(data));
}

function refreshNutritionDisplay() {
    const data = loadNutrition();
    document.getElementById('stat-kcal').textContent = data.kcal;
    document.getElementById('stat-protein').textContent = data.protein;
}

function handleNutritionEdit() {
    const btn = document.getElementById('edit-nutrition-btn');
    const isEditing = btn.dataset.editing === 'true';

    if (isEditing) {
        const newKcal = document.getElementById('input-kcal').value.trim() || nutritionDefaults.kcal;
        const newProtein = document.getElementById('input-protein').value.trim() || nutritionDefaults.protein;
        saveNutrition({ kcal: newKcal, protein: newProtein });
        btn.dataset.editing = 'false';
        btn.textContent = '✎';
        btn.title = 'Customize nutrition targets';
        refreshNutritionDisplay();
    } else {
        const data = loadNutrition();
        btn.dataset.editing = 'true';
        btn.textContent = '✓';
        btn.title = 'Save changes';
        document.getElementById('stat-kcal').innerHTML =
            `<input class="stat-input" id="input-kcal" value="${data.kcal}" placeholder="~1,500">`;
        document.getElementById('stat-protein').innerHTML =
            `<input class="stat-input" id="input-protein" value="${data.protein}" placeholder="120-130g">`;
        document.getElementById('input-kcal').focus();
        document.getElementById('input-kcal').select();
    }
}

function initNutrition() {
    refreshNutritionDisplay();
    document.getElementById('edit-nutrition-btn').addEventListener('click', handleNutritionEdit);
}

// ── Workout plan data ────────────────────────────────────────────────────────
const plan = [
    {
        name: "Mon",
        label: "Maki day",
        type: "maki",
        desc: "Functional upper body — build the strength Maki uses to swing cursed tools with zero cursed energy",
        groups: [
            { title: "Compound push", items: [
                ["Push-ups (or knee push-ups)", "3 × 12-15"],
                ["Diamond push-ups", "3 × 8-10"]
            ]},
            { title: "Dip progression", progression: true, items: [
                ["Bench dips", "3 × 10-12"],
                ["Parallel bar negatives (3s down)", "3 × 5"],
                ["Full parallel bar dips", "3 × max"]
            ]},
            { title: "Pull-up progression", progression: true, items: [
                ["Dead hangs", "3 × 20-30s"],
                ["Scapular pulls", "3 × 8-10"],
                ["Negative chin-ups (5s down)", "3 × 5"],
                ["Band-assisted pull-ups", "3 × 5-8"],
                ["Full pull-ups", "3 × max"]
            ]},
            { title: "Support", items: [
                ["Dumbbell curls", "3 × 12"],
                ["Band pull-aparts", "3 × 15"]
            ]},
            { title: "Core", items: [
                ["Dead bug", "3 × 10/side"],
                ["Plank hold", "3 × 30-45s"],
                ["Hanging leg raises (or lying)", "3 × 10"],
                ["Dragon flag negatives", "3 × 5"]
            ]}
        ]
    },
    {
        name: "Tue",
        label: "Yuki day",
        type: "yuki",
        desc: "Explosive lower body — Yuki's devastating kicks come from raw leg power and hip drive",
        groups: [
            { title: "Power", items: [
                ["Jump squats (bodyweight)", "3 × 8"],
                ["Box step-ups (explosive)", "3 × 10/leg"]
            ]},
            { title: "Pistol squat progression", progression: true, items: [
                ["Pistol squat — assisted (chair / band)", "3 × 5/leg"],
                ["Pistol squat — full", "3 × max/leg"]
            ]},
            { title: "Strength", items: [
                ["Romanian deadlift (dumbbell)", "3 × 10"],
                ["Walking lunges", "3 × 10/leg"]
            ]},
            { title: "Conditioning", items: [
                ["Mountain climbers", "3 × 30s"],
                ["Calf raises", "3 × 20"]
            ]}
        ]
    },
    {
        name: "Wed",
        label: "Maki day",
        type: "maki",
        desc: "Combat conditioning + skill — Maki's speed, reflexes, and aerial control",
        groups: [
            { title: "Circuit (2 rounds)", items: [
                ["Burpees", "10 reps"],
                ["High knees", "30s"],
                ["Shadow boxing", "60s"]
            ]},
            { title: "Skill work", items: [
                ["Wall handstand holds", "3 × 30s"],
                ["L-sit progression (tuck → full)", "3 × 15s"],
                ["Hollow body holds", "3 × 30s"]
            ]},
            { title: "Core & stability", items: [
                ["Russian twists", "3 × 15/side"],
                ["Bicycle crunches", "3 × 20"],
                ["Side plank", "3 × 20s/side"],
                ["Hanging leg raises (or lying)", "3 × 10"],
                ["Dragon flag negatives", "3 × 5"]
            ]}
        ]
    },
    {
        name: "Thu",
        label: "Yuki day",
        type: "yuki",
        desc: "Upper body power — Yuki's punches carry star-level mass behind them",
        groups: [
            { title: "Push power", items: [
                ["Explosive push-ups (clap or speed)", "3 × 6-8"],
                ["Archer push-ups", "3 × 6-8/side"],
                ["Pike push-ups", "3 × 8-10"]
            ]},
            { title: "Dip progression", progression: true, items: [
                ["Bench dips", "3 × 10-12"],
                ["Parallel bar negatives (3s down)", "3 × 5"],
                ["Full parallel bar dips", "3 × max"]
            ]},
            { title: "Horizontal pull", items: [
                ["Australian rows — feet elevated", "3 × 10-12"],
                ["Face pulls (band)", "3 × 15"]
            ]},
            { title: "Pull-up progression", progression: true, items: [
                ["Dead hangs", "3 × 20-30s"],
                ["Scapular pulls", "3 × 8-10"],
                ["Negative chin-ups (5s down)", "3 × 5"],
                ["Band-assisted pull-ups", "3 × 5-8"],
                ["Full pull-ups", "3 × max"]
            ]},
            { title: "Bicep & grip", items: [
                ["Chin-up holds / slow negatives", "3 × 5"]
            ]}
        ]
    },
    {
        name: "Fri",
        label: "Maki day",
        type: "maki",
        desc: "Lower body endurance — Maki's footwork and stamina in prolonged fights against special grade curses",
        groups: [
            { title: "Legs", items: [
                ["Bodyweight squats (slow tempo 3s down)", "3 × 15"],
                ["Single-leg glute bridge", "3 × 12/side"],
                ["Wall sit", "3 × 45s"]
            ]},
            { title: "Agility", items: [
                ["Lateral shuffles", "3 × 30s"],
                ["Tuck jumps", "3 × 8"]
            ]},
            { title: "Finisher", items: [
                ["Farmer's carry (heavy bags)", "3 × 30s"],
                ["Plank to push-up", "3 × 8"]
            ]}
        ]
    },
    {
        name: "Sat",
        label: "Yuki day",
        type: "yuki",
        desc: "Full body destruction — channel Yuki's overwhelming power into total-body compound movements",
        groups: [
            { title: "Power complex", items: [
                ["Dumbbell clean & press", "3 × 8"],
                ["Sumo deadlift (dumbbell)", "3 × 10"],
                ["Thruster (squat to press)", "3 × 10"]
            ]},
            { title: "Conditioning", items: [
                ["Kettlebell/dumbbell swings", "3 × 15"],
                ["Bear crawls", "3 × 20m"],
                ["Burpee to broad jump", "3 × 6"]
            ]}
        ]
    },
    {
        name: "Sun",
        label: "Rest",
        type: "rest",
        desc: "Recovery — even the strongest sorcerers need to heal. Light stretching, walking, foam rolling.",
        groups: [
            { title: "Active recovery", items: [
                ["Light walk", "20-30 min"],
                ["Full body stretching", "15 min"],
                ["Foam rolling (if available)", "10 min"]
            ]}
        ]
    }
];

// ── Rendering ────────────────────────────────────────────────────────────────
const tabsEl = document.getElementById('tabs');
const daysEl = document.getElementById('days');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';

function renderApp() {
    tabsEl.innerHTML = '';
    daysEl.innerHTML = '';

    const filteredPlan = plan.map((d, index) => ({ ...d, originalIndex: index }))
                             .filter(d => currentFilter === 'all' || d.type === currentFilter || d.type === 'rest');

    if (filteredPlan.length === 0) return;

    filteredPlan.forEach((d, i) => {
        const btn = document.createElement('button');
        btn.className = 'tab' + (i === 0 ? ' active' : '');
        btn.textContent = d.name;

        if (currentFilter === 'all' && d.type !== 'rest') {
            const dot = document.createElement('span');
            dot.style.display = 'inline-block';
            dot.style.width = '6px';
            dot.style.height = '6px';
            dot.style.borderRadius = '50%';
            dot.style.marginLeft = '6px';
            dot.style.backgroundColor = d.type === 'maki' ? 'var(--accent-maki)' : 'var(--accent-yuki)';
            btn.appendChild(dot);
        }

        btn.onclick = () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.day').forEach(el => el.classList.remove('show'));
            document.getElementById('d' + d.originalIndex).classList.add('show');
        };
        tabsEl.appendChild(btn);

        let html = '<div class="day' + (i === 0 ? ' show' : '') + '" id="d' + d.originalIndex + '">';
        const bc = d.type === 'maki' ? 'badge-maki' : d.type === 'yuki' ? 'badge-yuki' : 'badge-rest';

        html += '<span class="badge ' + bc + '">' + d.label + '</span>';
        html += '<div class="theme">' + d.desc + '</div>';

        d.groups.forEach(g => {
            const progClass = g.progression ? ' exgroup--progression' : '';
            html += '<div class="exgroup' + progClass + '">';
            html += '<div class="exgroup-title">' + g.title + '</div>';
            if (g.progression) {
                html += '<div class="progression-hint">Pick your current level — advance when you hit 3 clean sets</div>';
            }
            g.items.forEach((ex, idx) => {
                if (g.progression) {
                    html += '<div class="ex progression-step">';
                    html += '<span class="step-num">Lv.' + (idx + 1) + '</span>';
                    html += '<span class="ex-name">' + ex[0] + '</span>';
                    html += '<span class="ex-detail">' + ex[1] + '</span>';
                    html += '</div>';
                } else {
                    html += '<div class="ex"><span class="ex-name">' + ex[0] + '</span><span class="ex-detail">' + ex[1] + '</span></div>';
                }
            });
            html += '</div>';
        });

        if (d.type === 'maki') html += '<div class="note">Maki focus: controlled tempo, full range of motion, minimal rest (45-60s). Build the engine.</div>';
        if (d.type === 'yuki') html += '<div class="note">Yuki focus: explosive reps, maximum effort, 60-90s rest. Power output over volume.</div>';
        if (d.type === 'rest') html += '<div class="note">Don\'t skip this. Sleep 7-8 hours. Hydrate. Your muscles grow during rest, not during training.</div>';

        html += '</div>';
        daysEl.innerHTML += html;
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderApp();
    });
});

initNutrition();
renderApp();
