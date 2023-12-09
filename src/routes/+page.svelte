<script lang="ts">
	export let data;
</script>

<div class="grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-8 mbs-32 mx-auto max-w-600">
	<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
	{#each [...Array(25)] as _, i}
		{@const day = i + 1}
		{@const isEven = day % 2 === 0}
		{@const isActive = data.days.includes(day)}

		{@const classes = `grid place-items-center aspect-square 
    text-5xl font-christmas rounded-md p-8 
    ${!isActive ? 'opacity-25' : 'hover:opacity-75 cursor-pointer'} 
    ${isEven ? 'bg-green-7' : 'bg-red-6'}`}

		{#if isActive}
			<a class={classes} href={`/day/${day}`}>
				{day}
			</a>
		{:else}
			<div class={classes}>{day}</div>
		{/if}
	{/each}
</div>
