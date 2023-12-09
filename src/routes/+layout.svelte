<script lang="ts">
	import '@unocss/reset/tailwind.css';
	import '../styles/global.css';
	import '../styles/colors.css';
	import 'virtual:uno.css';

	import '@fontsource-variable/inter-tight';

	import '@fontsource/ibm-plex-mono/100.css';
	import '@fontsource/ibm-plex-mono/200.css';
	import '@fontsource/ibm-plex-mono/300.css';
	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/500.css';
	import '@fontsource/ibm-plex-mono/600.css';
	import '@fontsource/ibm-plex-mono/700.css';

	import '@fontsource/mountains-of-christmas/400.css';
	import '@fontsource/mountains-of-christmas/700.css';

	import MOC400 from '@fontsource/mountains-of-christmas/files/mountains-of-christmas-latin-400-normal.woff2';
	import MOC700 from '@fontsource/mountains-of-christmas/files/mountains-of-christmas-latin-700-normal.woff2';
</script>

<svelte:head>
	<title>Thomas's Advent of Svelte - 2023</title>

	<link rel="preload" as="font" href={MOC400} type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" as="font" href={MOC700} type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<main class="text-gray-0 bg-#0C1621 min-h-screen relative">
	<div class="overflow-hidden w-full pbe-4">
		<a
			class="text-4xl font-bold font-christmas flex w-[fit-content] justify-center
        mx-auto text-center mbs-32"
			href="/"
		>
			<h1 class="flex flex-col gap-20 w-[fit-content] relative">
				<span class="text-2.75rem text-green-3">Thomas's</span>
				<span class="capitalize text-5xl text-red-5">ADVENT OF SVELTE</span>
				<div
					class="i-uil-snowflake absolute top-1/2 -left-128 -translate-y-1/2 text-6xl text-white"
					aria-hidden="true"
				></div>

				<div
					class="i-uil-snowflake absolute top-1/2 -right-128 -translate-y-1/2 text-6xl text-white"
					aria-hidden="true"
				></div>
			</h1>
		</a>
	</div>
	<div class="p-32">
		<slot />
	</div>
</main>

<style>
	:global(*) {
		font-display: block;
	}
</style>
