export async function load() {
	const paths = await import.meta.glob('./day/**');
	const days = Object.keys(paths)
		.map((path) => {
			const day = path.match(/\/day\/(\d+)/)?.[1] ?? null;
			return Number(day);
		})
		.filter((n) => !Number.isNaN(n));

	return {
		days
	};
}
