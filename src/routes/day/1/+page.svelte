<script lang="ts">
	import { initialData } from './data';

	let data = $state(initialData);
</script>

<div class="grid w-[calc(100vw-1rem)] gap-16 max-w-600px mx-auto">
	<div class="grid sub border bc-red-7 bg-red-11 rounded-md pi-12 pk-6">
		<span class="font-medium font-sans">Name</span>
		<span class="font-medium font-sans">Tally</span>
		<span class="font-medium font-sans">Actions</span>
	</div>

	<div class="grid sub bg-red-12/25 border bc-red-5/25 rounded-md">
		{#each data as entry, i (entry.name + entry.tally)}
			{@const isNice = entry.tally >= 0}
			<div class="grid sub border-b bc-red-5/25 last:border-0 pi-12 pk-6">
				<span>{entry.name}</span>
				<span class="{isNice ? 'color-green-5' : 'color-red-5'} font-bold">{entry.tally}</span>
				<div class="flex gap-8">
					<button>Add</button>
					<button>Sub</button>
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
		grid-template-columns: repeat(3, 1fr);
	}

	.sub {
		grid-column: 1/4;
		grid-template-columns: subgrid;
	}
</style>
