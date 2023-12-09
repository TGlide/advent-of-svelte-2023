<script lang="ts">
	import { initialData, type Entry } from './data';

	// State
	let data = $state(initialData);
	let adding = $state(false);

	// Event Handlers
	const onsubmit = (e: Event) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const name = formData.get('name') as string;
		const tally = Number(formData.get('tally'));

		data.unshift({ name, tally });
		adding = false;
	};

	// Helpers
	function randomPick<T>(arr: T[]) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	function fireDeed(node: HTMLElement, deed: string) {
		// Fires off a text from the node to a random direction. Shouldn't move too far, and should fade out.
		const { x, y } = node.getBoundingClientRect();
		const { width, height } = node.getBoundingClientRect();

		const deedNode = document.createElement('div');
		console.log(deedNode);
		deedNode.classList.add(
			...'absolute text-12 text-center max-w-20ch font-bold font-sans color-yellow-5'.split(' ')
		);
		deedNode.textContent = deed;

		deedNode.style.left = `${x + width / 2}px`;
		deedNode.style.top = `${y + height / 2}px`;

		document.body.appendChild(deedNode);

		const direction = Math.random() * 360;
		const distance = Math.random() * 100 + 50;

		const x2 = Math.cos(direction) * distance;
		const y2 = Math.sin(direction) * distance;

		const anim = deedNode.animate(
			[
				{
					transform: `translate(${x2}px, ${y2}px)`,
					opacity: 1,
					offset: 0
				},

				{
					transform: `translate(${x2}px, ${y2}px)`,
					opacity: 1,
					offset: 0.75
				},

				{
					transform: `translate(${x2}px, ${y2}px)`,
					opacity: 0
				}
			],
			{
				duration: 1000,
				easing: 'ease-in-out',
				fill: 'forwards'
			}
		);

		anim.onfinish = () => {
			deedNode.remove();
		};
	}

	// Constants
	const deeds = {
		good: [
			'Helped a grandma cross the street',
			'Baked delicious cookies for the neighbors',
			'Passed NNN',
			'Helped a friend with their homework'
		],
		bad: [
			"Slept with their friend's mom",
			'Convinced someone to learn React',
			'Called a basic opinion a hot take',
			'Paid for Twitter Blue'
		]
	};

	// Actions

	type DeedArgs = {
		type: 'good' | 'bad';
		entry: Entry;
	};

	function deed(node: HTMLElement, { type, entry }: DeedArgs) {
		const onclick = () => {
			fireDeed(node, randomPick(deeds[type]));
			if (type === 'good') entry.tally++;
			else entry.tally--;
		};

		node.addEventListener('click', onclick);

		return {
			destroy() {
				node.removeEventListener('click', onclick);
			}
		};
	}
</script>

<div class="grid w-[calc(100vw-1rem)] max-w-600px mx-auto">
	<div class="grid sub border bc-red-7 bg-red-11 rounded-md pi-12 pk-6 relative">
		<span class="font-medium font-sans">Name</span>
		<span class="font-medium font-sans">Tally</span>
		<span class="font-medium font-sans">Actions</span>
		<button
			on:click={() => {
				adding = !adding;
			}}
			class="{adding ? 'i-solar-minus-circle-bold' : 'i-solar-add-circle-bold'} text-24
			hover:opacity-75 active:opacity-50 mis-auto"
		/>
	</div>

	{#if adding}
		<form
			class="grid sub border bc-red-5/25 bg-red-12/25 rounded-md pi-12 pk-6 relative mbs-8"
			{onsubmit}
		>
			<input
				class="w-full bg-transparent border-b bc-red-5/25 focus:bc-red-5 !focus:outline-none"
				name="name"
				type="text"
				placeholder="McCreebus"
				required
			/>

			<input
				class="w-full bg-transparent border-b bc-red-5/25 focus:bc-red-5 !focus:outline-none"
				name="tally"
				type="number"
				placeholder="42"
				required
			/>

			<span></span>
			<button
				type="submit"
				class="bg-white text-red-11 font-medium font-sans
				hover:opacity-75 active:opacity-50 mis-auto self-end pi-12 pk-4 rounded-md">Save</button
			>
		</form>
	{/if}

	<div class="grid sub bg-red-12/25 border bc-red-5/25 rounded-md mbs-16">
		{#each data as entry, i (entry.name + entry.tally)}
			{@const isNice = entry.tally >= 0}
			<div class="grid sub border-b bc-red-5/25 last:border-0 pi-12 pk-6">
				<span>{entry.name}</span>
				<span class="{isNice ? 'color-green-5' : 'color-red-5'} font-bold">{entry.tally}</span>
				<div class="flex gap-8">
					<button use:deed={{ entry, type: 'good' }}>Add</button>
					<button use:deed={{ entry, type: 'bad' }}>Sub</button>
					<button
						on:click={() => {
							data = data.filter((_, j) => i !== j);
						}}
					>
						Del
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.grid {
		grid-template-columns: repeat(3, 1fr) 80px;
	}

	.sub {
		gap: 1rem;
		grid-column: 1/5;
		grid-template-columns: subgrid;
	}
</style>
