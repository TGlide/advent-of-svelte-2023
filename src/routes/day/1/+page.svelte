<script lang="ts">
	import { initialData } from './data';

	let data = $state(initialData);
	let adding = $state(false);

	const onsubmit = (e: Event) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const name = formData.get('name') as string;
		const tally = Number(formData.get('tally'));

		data.push({ name, tally });
		adding = false;
	};
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
			class="i-solar-add-circle-bold text-24
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
					<button onclick={() => entry.tally++}>Add</button>
					<button onclick={() => entry.tally--}>Sub</button>
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
