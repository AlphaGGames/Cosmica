<script>
	import Navbar from "$lib/Navbar.svelte";
</script>
<Navbar />
<div class="content">
	<slot></slot>
</div>


<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: sans-serif;
		background: #111;
		color: #f1f1f1;
	}
	.content {
		width: 100%;
		height: 100%;
		text-align: center;
	}
</style>