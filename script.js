const input = document.getElementById("search-input");
const btn = document.getElementById("search-button");

const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById("height");
const creatureHp = document.getElementById("hp");
const creatureAttack = document.getElementById("attack");
const creatureDefense = document.getElementById("defense");
const creatureSpecialAttack = document.getElementById("special-attack");
const creatureSpecialDefense = document.getElementById("special-defense");
const creatureSpeed = document.getElementById("speed");
const creatureTypes = document.getElementById("types");
const creatureSpecialName = document.getElementById("special-name");
const creatureSpecialDescription = document.getElementById(
	"special-description"
);

btn.addEventListener("click", async () => {
	const userInput = input.value.trim().toLowerCase() || input.value.trime();
	try {
		const data = await fetchCreature(userInput);
		setText(data);
	} catch {
		alert("Creature not found");
	}
});

async function fetchCreature(crt) {
	try {
		const res = await fetch(
			`https://rpg-creature-api.freecodecamp.rocks/api/creature/${crt}`
		);
		const creature = await res.json();
		return creature;
	} catch {
		alert("Creature not found");
	}
}

async function setText(crt) {
	const { name, id, weight, height, special, stats, types } = crt;
	creatureName.textContent = name.toUpperCase();
	creatureId.textContent = `#${id}`;
	creatureWeight.textContent = `Weight: ${weight}`;
	creatureHeight.textContent = `Height: ${height}`;
	let typeCard = types.map((item) => item.name.toUpperCase());
	console.log(typeCard);
	creatureTypes.innerHTML = "";
	typeCard.forEach(
		(card) => (creatureTypes.innerHTML += `<span class="card">${card}</span>`)
	);
	creatureSpecialName.textContent = special.name;
	creatureSpecialDescription.textContent = special.description;
	creatureHp.textContent = stats.find((item) => item.name === "hp")[
		"base_stat"
	];
	creatureAttack.textContent = stats.find((item) => item.name === "attack")[
		"base_stat"
	];
	creatureDefense.textContent = stats.find((item) => item.name === "defense")[
		"base_stat"
	];
	creatureSpecialAttack.textContent = stats.find(
		(item) => item.name === "special-attack"
	)["base_stat"];
	creatureSpecialDefense.textContent = stats.find(
		(item) => item.name === "special-defense"
	)["base_stat"];
	creatureSpeed.textContent = stats.find((item) => item.name === "speed")[
		"base_stat"
	];
}
